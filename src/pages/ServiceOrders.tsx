import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wrench, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const ServiceOrders = () => {
  const orders = [
    { 
      id: "OS-001", 
      customer: "João Silva", 
      device: "iPhone 12 Pro", 
      issue: "Troca de tela",
      status: "in_progress",
      priority: "high",
      date: "10/11/2025"
    },
    { 
      id: "OS-002", 
      customer: "Maria Santos", 
      device: "Samsung Galaxy S21", 
      issue: "Bateria não carrega",
      status: "waiting",
      priority: "medium",
      date: "10/11/2025"
    },
    { 
      id: "OS-003", 
      customer: "Pedro Costa", 
      device: "Xiaomi Redmi Note 10", 
      issue: "Problema no botão power",
      status: "completed",
      priority: "low",
      date: "09/11/2025"
    },
    { 
      id: "OS-004", 
      customer: "Ana Oliveira", 
      device: "iPhone 13", 
      issue: "Câmera não funciona",
      status: "in_progress",
      priority: "high",
      date: "10/11/2025"
    },
    { 
      id: "OS-005", 
      customer: "Carlos Ferreira", 
      device: "Motorola Edge 30", 
      issue: "Sistema travando",
      status: "waiting",
      priority: "medium",
      date: "10/11/2025"
    },
  ];

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
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova OS
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-info/10 to-info/5 border-info/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Em Reparo</p>
              <p className="text-3xl font-bold text-foreground">8</p>
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
              <p className="text-3xl font-bold text-foreground">5</p>
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
              <p className="text-3xl font-bold text-foreground">12</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => {
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

                <div className="flex items-center gap-4">
                  <div className="text-right mr-4">
                    <p className="text-sm text-muted-foreground mb-1">Data</p>
                    <p className="font-medium text-foreground">{order.date}</p>
                  </div>
                  <Button variant="outline">Ver Detalhes</Button>
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
