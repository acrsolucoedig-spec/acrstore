import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Capinha iPhone 14", sku: "CAP-IP14-001", price: 89.90, stock: 45, category: "Acessórios", status: "active" },
    { id: 2, name: "Carregador Tipo-C 20W", sku: "CAR-TC-020", price: 45.00, stock: 28, category: "Carregadores", status: "active" },
    { id: 3, name: "Película Xiaomi Redmi", sku: "PEL-XIA-001", price: 35.00, stock: 8, category: "Películas", status: "low" },
    { id: 4, name: "Fone Bluetooth TWS", sku: "FON-BT-001", price: 159.90, stock: 15, category: "Áudio", status: "active" },
    { id: 5, name: "Cabo USB-C 2m", sku: "CAB-USB-002", price: 29.90, stock: 52, category: "Cabos", status: "active" },
    { id: 6, name: "Suporte Veicular", sku: "SUP-VEI-001", price: 39.90, stock: 3, category: "Acessórios", status: "critical" },
  ];

  const getStockBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success">Em Estoque</Badge>;
      case "low":
        return <Badge className="bg-warning">Estoque Baixo</Badge>;
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>;
      default:
        return null;
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seu estoque de produtos</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Produto
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    {getStockBadge(product.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>SKU: {product.sku}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                    <span>•</span>
                    <span className={product.stock < 10 ? "text-destructive font-medium" : ""}>
                      Estoque: {product.stock} un.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
