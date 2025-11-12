import { NeonBackground } from "@/components/Delivery/NeonBackground";
import { DeliveryCard } from "@/components/Delivery/DeliveryCard";
import { User, Store, Bike, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DeliveryHub = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <NeonBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao ERP
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-fade-in">
            CellParts Delivery
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Sistema de Delivery Completo - Escolha seu perfil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <DeliveryCard
            title="Cliente"
            description="Faça seus pedidos e acompanhe suas entregas em tempo real"
            icon={User}
            href="/delivery/customer"
            gradient="from-neon-blue to-neon-purple"
          />
          
          <DeliveryCard
            title="Lojista"
            description="Gerencie pedidos, produtos e acompanhe suas vendas"
            icon={Store}
            href="/delivery/store"
            gradient="from-neon-purple to-neon-pink"
          />
          
          <DeliveryCard
            title="Motoboy"
            description="Visualize entregas disponíveis e gerencie suas rotas"
            icon={Bike}
            href="/delivery/driver"
            gradient="from-neon-pink to-neon-green"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Sistema PWA
            </h3>
            <p className="text-muted-foreground">
              Instale como aplicativo e use offline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHub;
