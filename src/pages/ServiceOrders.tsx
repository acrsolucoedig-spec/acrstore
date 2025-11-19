import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Wrench, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useServiceOrders } from "@/hooks/use-service-orders";
import { useUpdateServiceOrderStatus } from "@/hooks/use-update-service-order-status";
import { useCreateServiceOrder } from "@/hooks/use-create-service-order";
import type { ServiceOrder } from "@/lib/erp";

const ServiceOrders = () => {
  const { data: orders, isLoading, isError, error } = useServiceOrders();
  const orderList = orders ?? [];
  const [statusSelections, setStatusSelections] = useState<Record<string, ServiceOrder["status"]>>({});
  const [prioritySelections, setPrioritySelections] = useState<Record<string, ServiceOrder["priority"]>>({});
  const updateMutation = useUpdateServiceOrderStatus();
  const createServiceOrderMutation = useCreateServiceOrder();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceOrder>({
    defaultValues: {
      id: "",
      customer: "",
      device: "",
      issue: "",
      status: "waiting",
      priority: "medium",
      date: "",
    },
  });

  useEffect(() => {
    if (!orders) {
      return;
    }

    setStatusSelections((prev) => {
      const next = { ...prev };
      orders.forEach((order) => {
        if (!(order.id in next)) {
          next[order.id] = order.status;
        }
      });
      return next;
    });

    setPrioritySelections((prev) => {
      const next = { ...prev };
      orders.forEach((order) => {
        if (!(order.id in next)) {
          next[order.id] = order.priority;
        }
      });
      return next;
    });
  }, [orders]);

  const isCreating = createServiceOrderMutation.isPending;

  const handleCreateOrderForm = handleSubmit(async (values) => {
    try {
      await createServiceOrderMutation.mutateAsync(values);
      reset();
      setIsCreateFormOpen(false);
    } catch {
      // toast handles errors
    }
  });

  const handleStatusChange = (orderId: string, value: ServiceOrder["status"]) => {
    setStatusSelections((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handlePriorityChange = (orderId: string, value: ServiceOrder["priority"]) => {
    setPrioritySelections((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "in_progress":
        return { 
          label: "Em Reparo", 
          icon: Wrench,
          className: "bg-info text-info-foreground"
        };
      case "waiting":
        return { 
          label: "Aguardando", 
          icon: Clock,
          className: "bg-warning text-warning-foreground"
        };
      case "completed":
        return { 
          label: "Concluído", 
          icon: CheckCircle2,
          className: "bg-success text-success-foreground"
        };
      default:
        return { 
          label: "Pendente", 
          icon: AlertCircle,
          className: "bg-muted text-muted-foreground"
        };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>;
      case "medium":
        return <Badge className="bg-warning">Média</Badge>;
      case "low":
        return <Badge variant="secondary">Baixa</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Assistência Técnica</h1>
          <p className="text-muted-foreground">Gerencie as ordens de serviço</p>
        </div>
        <Button onClick={() => setIsCreateFormOpen((prev) => !prev)} className="gap-2">
          <Plus className="w-4 h-4" />
          {isCreateFormOpen ? "Fechar formulário" : "Nova OS"}
        </Button>
      </div>

      {isCreateFormOpen && (
        <Card className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Nova ordem</h2>
              <p className="text-sm text-muted-foreground">Cadastre um aparelho para atendimento técnico.</p>
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {isCreating ? "Registrando..." : "Registrando"}
            </span>
          </div>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateOrderForm}>
            <div className="space-y-1">
              <Label htmlFor="os-id">ID</Label>
              <Input id="os-id" {...register("id", { required: "ID obrigatório" })} placeholder="OS-1001" />
              {errors.id && <p className="text-xs text-destructive">{errors.id.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-customer">Cliente</Label>
              <Input id="os-customer" {...register("customer", { required: "Cliente obrigatório" })} placeholder="Maria Santos" />
              {errors.customer && <p className="text-xs text-destructive">{errors.customer.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-device">Aparelho</Label>
              <Input id="os-device" {...register("device", { required: "Informe o aparelho" })} placeholder="iPhone 13" />
              {errors.device && <p className="text-xs text-destructive">{errors.device.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-issue">Problema</Label>
              <Input id="os-issue" {...register("issue", { required: "Descreva o problema" })} placeholder="Câmera não funciona" />
              {errors.issue && <p className="text-xs text-destructive">{errors.issue.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-status">Status</Label>
              <select id="os-status" {...register("status")} className="w-full rounded-lg border border-border px-3 py-2 text-sm">
                <option value="waiting">Aguardando</option>
                <option value="in_progress">Em reparo</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-priority">Prioridade</Label>
              <select id="os-priority" {...register("priority")} className="w-full rounded-lg border border-border px-3 py-2 text-sm">
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="os-date">Data</Label>
              <Input id="os-date" {...register("date", { required: "Informe a data" })} placeholder="10/11/2025" />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? "Registrando..." : "Cadastrar OS"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Em Reparo</p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.status === "in_progress").length}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <Wrench className="w-6 h-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Aguardando</p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.status === "waiting").length}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Concluídos Hoje</p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.status === "completed").length}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {isLoading && (
          <Card className="p-6 italic text-muted-foreground">Carregando ordens de serviço...</Card>
        )}

        {isError && (
          <Card className="p-6 text-destructive">
            Erro ao buscar ordens de serviço: {error?.message ?? "Erro desconhecido"}
          </Card>
        )}

        {!isLoading && !isError && orderList.length === 0 && (
          <Card className="p-6 text-muted-foreground">
            Nenhuma ordem de serviço registrada. Use o botão "Nova OS" para cadastrar uma nova solicitação.
          </Card>
        )}

        {!isLoading && !isError && orderList.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusConfig.className}`}>
                    <StatusIcon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                      {getPriorityBadge(order.priority)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Cliente:</span> {order.customer}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Aparelho:</span> {order.device}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Problema:</span> {order.issue}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <p className="text-sm text-muted-foreground mb-1">Data</p>
                      <p className="font-medium text-foreground">{order.date}</p>
                    </div>
                    <Button variant="outline">Ver Detalhes</Button>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <select
                      value={statusSelections[order.id]}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as ServiceOrder["status"])}
                      className="min-w-[140px] rounded-lg border border-border bg-background/80 px-3 py-1 text-xs text-foreground"
                      aria-label="Selecionar status da ordem"
                    >
                      <option value="in_progress">Em Reparo</option>
                      <option value="waiting">Aguardando</option>
                      <option value="completed">Concluído</option>
                    </select>
                    <select
                      value={prioritySelections[order.id]}
                      onChange={(e) => handlePriorityChange(order.id, e.target.value as ServiceOrder["priority"])}
                      className="min-w-[140px] rounded-lg border border-border bg-background/80 px-3 py-1 text-xs text-foreground"
                      aria-label="Selecionar prioridade"
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={updateMutation.isPending}
                      onClick={() =>
                        updateMutation.mutate({
                          id: order.id,
                          status: statusSelections[order.id],
                          priority: prioritySelections[order.id],
                        })
                      }
                    >
                      {updateMutation.isPending ? "Atualizando..." : "Atualizar"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceOrders;
