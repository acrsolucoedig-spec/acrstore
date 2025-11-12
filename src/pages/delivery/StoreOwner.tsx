import { NeonBackground } from "@/components/Delivery/NeonBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Clock, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const StoreOwner = () => {
  const pendingOrders = [
    { id: "#1234", customer: "João Silva", items: "3 produtos", total: 234.80, time: "5 min atrás" },
    { id: "#1235", customer: "Maria Santos", items: "2 produtos", total: 125.00, time: "12 min atrás" },
    { id: "#1236", customer: "Pedro Costa", items: "1 produto", total: 89.90, time: "18 min atrás" },
  ];

  const metrics = [
    { label: "Pedidos Hoje", value: "28", change: "+12%", icon: Package, color: "neon-blue" },
    { label: "Em Preparo", value: "5", change: "3 novos", icon: Clock, color: "neon-purple" },
    { label: "Entregues", value: "23", change: "+8%", icon: CheckCircle2, color: "neon-green" },
    { label: "Faturamento", value: "R$ 2.4k", change: "+15%", icon: TrendingUp, color: "neon-pink" },
  ];

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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Painel do Lojista 🏪
          </h1>
          <p className="text-muted-foreground">Gerencie seus pedidos e vendas</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className={`p-6 bg-gradient-to-br from-${metric.color}/10 to-${metric.color}/5 backdrop-blur-sm border-${metric.color}/30 hover:scale-105 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <metric.icon className={`w-8 h-8 text-${metric.color}`} />
                <span className={`text-sm font-medium text-${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </Card>
          ))}
        </div>

        {/* Pedidos Pendentes */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <h2 className="text-xl font-bold text-foreground">Pedidos Pendentes</h2>
              <Badge className="bg-warning">3 novos</Badge>
            </div>
            <Button className="bg-gradient-to-r from-neon-purple to-neon-pink">
              Ver Todos
            </Button>
          </div>

          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <Card 
                key={order.id}
                className="p-6 bg-gradient-to-r from-muted/50 to-muted/30 border-2 border-neon-purple/20 hover:border-neon-purple/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-foreground">{order.id}</span>
                      <Badge className="bg-warning">Aguardando</Badge>
                    </div>
                    <p className="text-foreground font-medium mb-1">Cliente: {order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.time}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary mb-4">
                      R$ {order.total.toFixed(2)}
                    </p>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-neon-green to-neon-blue">
                        Aceitar
                      </Button>
                      <Button variant="outline" className="w-full">
                        Recusar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Status da Loja */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 backdrop-blur-sm border-success/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/20 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Loja Aberta</h3>
                <p className="text-sm text-muted-foreground">Recebendo pedidos normalmente</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 backdrop-blur-sm border-neon-blue/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-blue/20 rounded-full">
                <Package className="w-8 h-8 text-neon-blue" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Tempo Médio</h3>
                <p className="text-2xl font-bold text-neon-blue">25 min</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreOwner;
