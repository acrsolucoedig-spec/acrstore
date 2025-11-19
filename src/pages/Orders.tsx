import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Store, MapPin } from "lucide-react";
import { useOrders } from "@/hooks/use-orders";
import { useUpdateOrderStatus } from "@/hooks/use-update-order-status";
import { useCreateOrder } from "@/hooks/use-create-order";
import type { CreateOrderInput, OrderStatus } from "@/lib/erp";

const Orders = () => {
  const { data: orders, isLoading, isError, error } = useOrders();
  const orderList = orders ?? [];
  const [statusSelections, setStatusSelections] = useState<Record<string, OrderStatus>>({});
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const createOrderMutation = useCreateOrder();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const isCreatingOrder = createOrderMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderInput>({
    defaultValues: {
      id: "",
      customer: "",
      items: "",
      total: 0,
      type: "delivery",
      status: "pending",
      address: "",
      date: "",
    },
  });

  const handleStatusChange = (orderId: string, value: OrderStatus) => {
    setStatusSelections((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleCreateOrder = handleSubmit(async (values) => {
    try {
      await createOrderMutation.mutateAsync(values);
      reset();
      setIsCreateFormOpen(false);
    } catch {
      // failure notifications handled in mutation
    }
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
  }, [orders]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Pendente", className: "bg-warning" };
      case "ready":
        return { label: "Pronto", className: "bg-info" };
      case "in_transit":
        return { label: "Em Trânsito", className: "bg-primary" };
      case "completed":
        return { label: "Concluído", className: "bg-success" };
      default:
        return { label: "Desconhecido", className: "bg-muted" };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie entregas e retiradas</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setIsCreateFormOpen((prev) => !prev)}>
          {isCreateFormOpen ? "Fechar formulário" : "Criar pedido"}
        </Button>
      </div>

      {isCreateFormOpen && (
        <Card className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Novo pedido</h2>
              <p className="text-sm text-muted-foreground">Envie novos pedidos para o delivery ou retirada.</p>
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {isCreatingOrder ? "Salvando..." : "Criando"}
            </span>
          </div>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateOrder}>
            <div className="space-y-1">
              <Label htmlFor="order-id">ID</Label>
              <Input id="order-id" {...register("id", { required: "ID obrigatório" })} placeholder="ORD-1001" />
              {errors.id && <p className="text-xs text-destructive">{errors.id.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-customer">Cliente</Label>
              <Input
                id="order-customer"
                {...register("customer", { required: "Informe o cliente" })}
                placeholder="João Silva"
              />
              {errors.customer && <p className="text-xs text-destructive">{errors.customer.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-items">Itens</Label>
              <Input id="order-items" {...register("items", { required: "Descreva os itens" })} placeholder="3 produtos" />
              {errors.items && <p className="text-xs text-destructive">{errors.items.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-total">Total (R$)</Label>
              <Input
                id="order-total"
                type="number"
                step="0.01"
                min={0}
                {...register("total", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Valor maior que zero" },
                  required: "Informe o valor total",
                })}
                placeholder="234.8"
              />
              {errors.total && <p className="text-xs text-destructive">{errors.total.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-type">Tipo</Label>
              <select
                id="order-type"
                className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-sm"
                {...register("type")}
              >
                <option value="delivery">Delivery</option>
                <option value="pickup">Retirada</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-status">Status</Label>
              <select id="order-status" className="rounded-lg border border-border px-3 py-2" {...register("status")}>
                <option value="pending">Pendente</option>
                <option value="ready">Pronto</option>
                <option value="in_transit">Em trânsito</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-address">Endereço</Label>
              <Input id="order-address" {...register("address", { required: "Informe o endereço" })} placeholder="Rua das Flores, 123" />
              {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order-date">Data</Label>
              <Input id="order-date" {...register("date", { required: "Informe a data" })} placeholder="10/11/2025 14:30" />
              {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={isCreatingOrder} className="w-full">
                {isCreatingOrder ? "Criando pedido..." : "Cadastrar pedido"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Para Entrega
              </p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.type === "delivery").length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Truck className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Para Retirada
              </p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.type === "pickup").length}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <Store className="w-6 h-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Concluídos Hoje
              </p>
              <p className="text-3xl font-bold text-foreground">{orderList.filter((order) => order.status === "completed").length}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <MapPin className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {isLoading && (
          <Card className="p-6 italic text-muted-foreground">Carregando pedidos...</Card>
        )}

        {isError && (
          <Card className="p-6 text-destructive">
            Erro ao carregar pedidos: {error?.message ?? "Erro desconhecido"}
          </Card>
        )}

        {!isLoading && !isError && orderList.length === 0 && (
          <Card className="p-6 text-muted-foreground">
            Nenhum pedido cadastrado. Cadastre uma venda para ver pedidos nesta tela.
          </Card>
        )}

        {!isLoading && !isError && orderList.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const TypeIcon = order.type === "delivery" ? Truck : Store;
          const selectedStatus = statusSelections[order.id] ?? order.status;

          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      order.type === "delivery" ? "bg-primary/10" : "bg-info/10"
                    }`}
                  >
                    <TypeIcon
                      className={`w-6 h-6 ${
                        order.type === "delivery" ? "text-primary" : "text-info"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                      <Badge variant="outline">
                        {order.type === "delivery" ? "Entrega" : "Retirada"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Cliente:</span> {order.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {order.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items} • {order.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-xl font-bold text-primary">
                      R$ {order.total.toFixed(2)}
                    </p>
                  </div>
                  <Button variant="outline">Ver Detalhes</Button>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4 text-sm text-muted-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Atualizar status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(event) =>
                      setStatusSelections((prev) => ({
                        ...prev,
                        [order.id]: event.target.value as OrderStatus,
                      }))
                    }
                    className="min-w-[140px] rounded-lg border border-border bg-background/80 px-3 py-1 text-xs text-foreground"
                    aria-label="Selecionar status do pedido"
                  >
                    <option value="pending">Pendente</option>
                    <option value="ready">Pronto</option>
                    <option value="in_transit">Em trânsito</option>
                    <option value="completed">Concluído</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updateOrderStatusMutation.isPending}
                    onClick={() =>
                      updateOrderStatusMutation.mutate({
                        id: order.id,
                        status: selectedStatus,
                      })
                    }
                  >
                    {updateOrderStatusMutation.isPending ? "Atualizando..." : "Atualizar"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
