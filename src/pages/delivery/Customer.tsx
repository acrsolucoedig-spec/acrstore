import { useState } from "react";
import { NeonBackground } from "@/components/Delivery/NeonBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, ShoppingBag, MapPin, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Capinha iPhone 14", price: 89.90, category: "Acessórios", image: "📱" },
    { id: 2, name: "Carregador Tipo-C", price: 45.00, category: "Carregadores", image: "🔌" },
    { id: 3, name: "Fone Bluetooth", price: 159.90, category: "Áudio", image: "🎧" },
    { id: 4, name: "Película Xiaomi", price: 35.00, category: "Películas", image: "🛡️" },
  ];

  const myOrders = [
    { id: "#1234", status: "in_transit", items: "3 produtos", total: 234.80, eta: "15 min" },
    { id: "#1233", status: "delivered", items: "1 produto", total: 89.90, eta: "Entregue" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_transit":
        return <Badge className="bg-neon-blue">Em Trânsito</Badge>;
      case "delivered":
        return <Badge className="bg-success">Entregue</Badge>;
      default:
        return <Badge>Pendente</Badge>;
    }
  };

  const handleOrder = (product: any) => {
    toast.success(`${product.name} adicionado ao carrinho!`);
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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Olá, Cliente! 👋
          </h1>
          <p className="text-muted-foreground">Faça seu pedido e receba em casa</p>
        </div>

        {/* Meus Pedidos */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-neon-blue/30">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-neon-blue" />
            <h2 className="text-xl font-bold text-foreground">Meus Pedidos</h2>
          </div>
          
          <div className="space-y-3">
            {myOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-foreground">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">R$ {order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {order.eta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Buscar Produtos */}
        <Card className="p-4 mb-6 bg-card/80 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Produtos Disponíveis */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-neon-purple" />
            Produtos Disponíveis
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="p-6 hover:scale-105 transition-all bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-neon-purple/20 hover:border-neon-purple/50"
              >
                <div className="text-5xl mb-4 text-center">{product.image}</div>
                <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => handleOrder(product)}
                    className="bg-gradient-to-r from-neon-blue to-neon-purple"
                  >
                    Pedir
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Endereço de Entrega */}
        <Card className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 backdrop-blur-sm border-neon-green/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <MapPin className="w-6 h-6 text-neon-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Entregar em:</h3>
              <p className="text-muted-foreground">Rua das Flores, 123 - Centro</p>
              <Button variant="link" className="p-0 h-auto text-neon-green">
                Alterar endereço
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
