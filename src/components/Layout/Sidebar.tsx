import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Wrench, 
  ClipboardList,
  Users,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Vendas", path: "/sales" },
  { icon: Package, label: "Produtos", path: "/products" },
  { icon: Wrench, label: "Assistência Técnica", path: "/service-orders" },
  { icon: ClipboardList, label: "Pedidos", path: "/orders" },
  { icon: Users, label: "Clientes", path: "/customers" },
  { icon: BarChart3, label: "Relatórios", path: "/reports" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">
            Tech<span className="text-primary">ERP</span>
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">Sistema de Gestão</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
              activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/50 text-center">
            TechERP v1.0
          </div>
        </div>
      </div>
    </aside>
  );
};
