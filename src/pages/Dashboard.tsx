import { MetricCard } from "@/components/Dashboard/MetricCard";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Vendas Hoje"
          value="R$ 5.430"
          change="+12% vs ontem"
          changeType="positive"
          icon={DollarSign}
          gradient
        />
        <MetricCard
          title="Pedidos Pendentes"
          value="18"
          change="3 para entrega"
          changeType="neutral"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Produtos em Estoque"
          value="234"
          change="12 abaixo do mínimo"
          changeType="negative"
          icon={Package}
        />
        <MetricCard
          title="Ticket Médio"
          value="R$ 285"
          change="+8% este mês"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Grid de cards secundários */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ordens de Serviço */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Assistência Técnica
            </h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Em Aguardo</p>
                <p className="text-sm text-muted-foreground">Aguardando peças</p>
              </div>
              <span className="text-2xl font-bold text-warning">5</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Em Reparo</p>
                <p className="text-sm text-muted-foreground">Sendo consertados</p>
              </div>
              <span className="text-2xl font-bold text-info">8</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">Concluídos</p>
                <p className="text-sm text-muted-foreground">Prontos para retirada</p>
              </div>
              <span className="text-2xl font-bold text-success">12</span>
            </div>
          </div>
        </Card>

        {/* Vendas Recentes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Últimas Vendas
            </h3>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          
          <div className="space-y-3">
            {[
              { id: "#1234", product: "Capinha iPhone 14", value: "R$ 89,90", status: "Entrega" },
              { id: "#1233", product: "Carregador Tipo-C", value: "R$ 45,00", status: "Retirada" },
              { id: "#1232", product: "Película Xiaomi", value: "R$ 35,00", status: "Entrega" },
              { id: "#1231", product: "Fone Bluetooth", value: "R$ 159,90", status: "Retirada" },
            ].map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{sale.product}</p>
                  <p className="text-xs text-muted-foreground">{sale.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{sale.value}</p>
                  <p className="text-xs text-muted-foreground">{sale.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
