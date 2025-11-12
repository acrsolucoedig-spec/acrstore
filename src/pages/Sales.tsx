import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Sales = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchProduct, setSearchProduct] = useState("");

  const products = [
    { id: 1, name: "Capinha iPhone 14", price: 89.90, category: "Acessórios" },
    { id: 2, name: "Carregador Tipo-C 20W", price: 45.00, category: "Carregadores" },
    { id: 3, name: "Película Xiaomi", price: 35.00, category: "Películas" },
    { id: 4, name: "Fone Bluetooth TWS", price: 159.90, category: "Áudio" },
    { id: 5, name: "Cabo USB-C 2m", price: 29.90, category: "Cabos" },
    { id: 6, name: "Suporte Veicular", price: 39.90, category: "Acessórios" },
  ];

  const addToCart = (product: any) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success("Produto adicionado ao carrinho");
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.info("Produto removido");
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const finalizeSale = () => {
    if (cartItems.length === 0) {
      toast.error("Adicione produtos ao carrinho");
      return;
    }
    toast.success("Venda finalizada com sucesso!");
    setCartItems([]);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">PDV - Ponto de Venda</h1>
        <p className="text-muted-foreground">Sistema de vendas rápido e eficiente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className="p-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Carrinho */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Carrinho</h3>
            
            {cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Carrinho vazio
              </p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={finalizeSale}
                disabled={cartItems.length === 0}
              >
                Finalizar Venda
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sales;
