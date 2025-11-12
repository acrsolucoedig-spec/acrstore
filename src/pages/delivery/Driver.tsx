import { useState } from "react";
import { NeonBackground } from "@/components/Delivery/NeonBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Navigation, DollarSign, Clock, Package, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Driver = () => {
  const [activeTab, setActiveTab] = useState<"available" | "active">("available");

  const availableDeliveries = [
    { 
      id: "#1234", 
      store: "TechCell Centro", 
      customer: "João Silva",
      address: "Rua das Flores, 123",
      distance: "2.5 km",
      payment: 12.50,
      items: "3 produtos"
    },
    { 
      id: "#1235", 
      store: "TechCell Shopping", 
      customer: "Maria Santos",
      address: "Av. Principal, 456",
      distance: "1.8 km",
      payment: 9.00,
      items: "2 produtos"
    },
  ];

  const activeDelivery = {
    id: "#1233",
    store: "TechCell Centro",
    customer: "Pedro Costa",
    address: "Rua Esperança, 789 - Apto 301",
    phone: "(11) 98765-4321",
    distance: "3.2 km",
    payment: 15.00,
    items: "1 produto"
  };

  const stats = [
    { label: "Entregas Hoje", value: "12", icon: Package, color: "neon-green" },
    { label: "Ganhos Hoje", value: "R$ 156", icon: DollarSign, color: "neon-pink" },
    { label: "Tempo Online", value: "4h 30m", icon: Clock, color: "neon-blue" },
  ];

  const acceptDelivery = (delivery: any) => {
    toast.success(`Entrega ${delivery.id} aceita!`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NeonBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link to="/delivery">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-green bg-clip-text text-transparent">
            Painel do Motoboy 🛵
          </h1>
          <p className="text-muted-foreground">Suas entregas e ganhos do dia</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`p-6 bg-gradient-to-br from-${stat.color}/10 to-${stat.color}/5 backdrop-blur-sm border-${stat.color}/30`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${stat.color}/20 rounded-full`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "available" ? "default" : "outline"}
            onClick={() => setActiveTab("available")}
            className={activeTab === "available" ? "bg-gradient-to-r from-neon-pink to-neon-green" : ""}
          >
            Disponíveis ({availableDeliveries.length})
          </Button>
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            onClick={() => setActiveTab("active")}
            className={activeTab === "active" ? "bg-gradient-to-r from-neon-pink to-neon-green" : ""}
          >
            Em Andamento (1)
          </Button>
        </div>

        {/* Entregas Disponíveis */}
        {activeTab === "available" && (
          <div className="space-y-4">
            {availableDeliveries.map((delivery) => (
              <Card 
                key={delivery.id}
                className="p-6 bg-card/80 backdrop-blur-sm border-2 border-neon-pink/20 hover:border-neon-pink/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-foreground">{delivery.id}</span>
                      <Badge className="bg-neon-pink">Nova</Badge>
                    </div>
                    <p className="text-foreground font-medium mb-1">📍 {delivery.store}</p>
                    <p className="text-sm text-muted-foreground mb-3">{delivery.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">
                      R$ {delivery.payment.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{delivery.distance}</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">{delivery.customer}</p>
                      <p className="text-sm text-muted-foreground">{delivery.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-neon-green to-neon-blue"
                    onClick={() => acceptDelivery(delivery)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Aceitar Entrega
                  </Button>
                  <Button variant="outline" size="icon">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Entrega Ativa */}
        {activeTab === "active" && (
          <Card className="p-6 bg-gradient-to-br from-neon-green/10 to-neon-blue/10 backdrop-blur-sm border-2 border-neon-green/50">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
              <h3 className="text-lg font-bold text-foreground">Entrega em Andamento</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Retirar em:</p>
                <p className="font-bold text-foreground">📍 {activeDelivery.store}</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Entregar para:</p>
                <p className="font-bold text-foreground">{activeDelivery.customer}</p>
                <p className="text-sm text-muted-foreground">{activeDelivery.address}</p>
                <p className="text-sm text-primary mt-1">{activeDelivery.phone}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/30">
                <span className="text-foreground">Pagamento:</span>
                <span className="text-2xl font-bold text-success">R$ {activeDelivery.payment.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-gradient-to-r from-neon-blue to-neon-purple">
                <Navigation className="w-4 h-4 mr-2" />
                Abrir Rota
              </Button>
              <Button className="bg-gradient-to-r from-neon-green to-success">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Driver;
