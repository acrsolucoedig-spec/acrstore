import { useState } from "react";
import { NeonBackground } from "@/components/Delivery/NeonBackground";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, ShoppingBag, MapPin, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type OrderEntry = {
  id: string;
  status: "in_transit" | "delivered" | string;
  items: string;
  total: number;
  eta: string;
};

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customerProfile = {
    name: "Camila Andrade",
    loyalty: "Cliente Gold",
    since: "2019",
    favoriteStore: "TechCell Centro",
  };

  const addresses = [
    { label: "Casa", line: "Rua das Flores, 123 - Centro", city: "São Paulo" },
    { label: "Escritório", line: "Av. Paulista, 2222 - Bela Vista", city: "São Paulo" },
  ];

  const paymentMethods = [
    { label: "Visa ****1234", expires: "08/27" },
    { label: "Pix - celula@techcell.com", expires: "ativo" },
  ];

  const products: ProductItem[] = [
    { id: 1, name: "Capinha iPhone 14", price: 89.9, category: "Acessórios", image: "📱" },
    { id: 2, name: "Carregador Tipo-C", price: 45.0, category: "Carregadores", image: "🔌" },
    { id: 3, name: "Fone Bluetooth", price: 159.9, category: "Áudio", image: "🎧" },
    { id: 4, name: "Película Xiaomi", price: 35.0, category: "Películas", image: "🛡️" },
  ];

  const trackingTimeline = [
    { label: "Pagamento aprovado", time: "14:32", meta: "Cartão ou Pix" },
    { label: "Pedido preparado", time: "14:40", meta: "Na cozinha" },
    { label: "Motoboy a caminho", time: "14:48", meta: "TechCell Delivery" },
  ];

  const myOrders: OrderEntry[] = [
    { id: "#1234", status: "in_transit", items: "3 produtos", total: 234.8, eta: "15 min" },
    { id: "#1233", status: "delivered", items: "1 produto", total: 89.9, eta: "Entregue" },
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

  const handleOrder = (product: ProductItem) => {
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

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Olá, Cliente! 👋
            </h1>
            <p className="text-muted-foreground">Faça seu pedido e receba em casa com o Delivery CellParts.</p>
          </div>
          <Card className="p-4 bg-card/80 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Perfil</p>
            <h2 className="text-xl font-semibold text-foreground">{customerProfile.name}</h2>
            <p className="text-xs text-muted-foreground">{customerProfile.loyalty} · Desde {customerProfile.since}</p>
            <p className="text-xs text-muted-foreground mt-2">Loja favorita: {customerProfile.favoriteStore}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-card/80 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Endereços salvos</p>
            <div className="mt-3 space-y-3">
              {addresses.map((address) => (
                <div key={address.label} className="rounded-lg border border-border/40 p-3 bg-muted/40">
                  <p className="text-sm font-semibold text-foreground">{address.label}</p>
                  <p className="text-xs text-muted-foreground">{address.line}</p>
                  <p className="text-xs text-muted-foreground">{address.city}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4 bg-card/80 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Métodos de pagamento</p>
            <div className="mt-3 space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.label} className="flex items-center justify-between rounded-lg border border-border/40 p-3 bg-muted/40">
                  <div>
                    <p className="text-sm text-foreground">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.expires}</p>
                  </div>
                  <Button size="icon" variant="ghost">✏️</Button>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4 bg-card/80 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Timeline da entrega</p>
            <div className="mt-3 space-y-3">
              {trackingTimeline.map((event) => (
                <div
                  key={event.label}
                  className="flex items-center justify-between rounded-lg border border-border/40 p-3 bg-muted/40"
                >
                  <div>
                    <p className="text-sm text-foreground">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.meta}</p>
                  </div>
                  <p className="text-xs font-semibold text-primary">{event.time}</p>
                </div>
              ))}
            </div>
          </Card>
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
