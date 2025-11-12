import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface DeliveryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
}

export const DeliveryCard = ({ title, description, icon: Icon, href, gradient }: DeliveryCardProps) => {
  return (
    <Link to={href}>
      <Card className={`p-8 h-full hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${gradient} border-2 group relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="mb-6 inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
            {title}
          </h3>
          
          <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
            {description}
          </p>
        </div>
        
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
      </Card>
    </Link>
  );
};
