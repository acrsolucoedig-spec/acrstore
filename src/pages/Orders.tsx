import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, Store, MapPin } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "#1234",
      customer: "João Silva",
      items: "3 produtos",
      total: 234.80,
      type: "delivery",
      status: "pending",
      address: "Rua das Flores, 123 - Centro",
      date: "10/11/2025 14:30"
    },
    {
      id: "#1233",
      customer: "Maria Santos",
      items: "1 produto",
      total: 89.90,
      type: "pickup",
      status: "ready",
      address: "Retirada na loja",
      date: "10/11/2025 13:15"
    },
    {
      id: "#1232",
      customer: "Pedro Costa",
      items: "2 produtos",
      total: 125.00,
      type: "delivery",
      status: "in_transit",
      address: "Av. Principal, 456 - Bairro Alto",
      date: "10/11/2025 11:20"
    },
    {
      id: "#1231",
      customer: "Ana Oliveira",
      items: "4 produtos",
      total: 320.50,
      type: "pickup",
      status: "completed",
      address: "Retirada na loja",
      date: "10/11/2025 10:00"
    },
  ];

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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Para Entrega
              </p>
              <p className="text-3xl font-bold text-foreground">8</p>
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
              <p className="text-3xl font-bold text-foreground">5</p>
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
              <p className="text-3xl font-bold text-foreground">23</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <MapPin className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const TypeIcon = order.type === "delivery" ? Truck : Store;
          
          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    order.type === "delivery" ? "bg-primary/10" : "bg-info/10"
                  }`}>
                    <TypeIcon className={`w-6 h-6 ${
                      order.type === "delivery" ? "text-primary" : "text-info"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <Badge className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
