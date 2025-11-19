import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useCreateProduct } from "@/hooks/use-create-product";
import type { CreateProductInput } from "@/lib/erp";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading, isError, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput>({
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stock: 0,
      category: "",
      status: "active",
      description: "",
    },
  });

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

  const filteredProducts = useMemo(() => {
    const items = products ?? [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return items;
    }

    return items.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      product.sku.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const handleCreateProduct = handleSubmit(async (values) => {
    try {
      await createProductMutation.mutateAsync(values);
      reset();
      setIsCreateFormOpen(false);
    } catch {
      // Error already handled by toast in mutation
    }
  });

  const isCreating = createProductMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seu estoque de produtos</p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setIsCreateFormOpen((prev) => !prev)}
          variant={isCreateFormOpen ? "secondary" : "default"}
        >
          <Plus className="w-4 h-4" />
          {isCreateFormOpen ? "Fechar formulário" : "Novo Produto"}
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

      {isCreateFormOpen && (
        <Card className="p-6 bg-card/80 border-border/60 backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Novo Produto</h2>
            <p className="text-sm text-muted-foreground">
              Utilize o formulário abaixo para cadastrar itens no ERP.
            </p>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="product-name">Nome</Label>
                <Input
                  id="product-name"
                  {...register("name", { required: "Nome obrigatório" })}
                  placeholder="Ex: Capinha iPhone 14"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="product-sku">SKU</Label>
                <Input
                  id="product-sku"
                  {...register("sku", { required: "SKU obrigatório" })}
                  placeholder="Ex: CAP-IP14-001"
                />
                {errors.sku && (
                  <p className="text-xs text-destructive">{errors.sku.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="product-category">Categoria</Label>
                <Input
                  id="product-category"
                  {...register("category", { required: "Categoria obrigatória" })}
                  placeholder="Acessórios"
                />
                {errors.category && (
                  <p className="text-xs text-destructive">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="product-price">Preço (R$)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("price", {
                    required: "Preço necessário",
                    valueAsNumber: true,
                    min: { value: 0, message: "Valor deve ser positivo" },
                  })}
                />
                {errors.price && (
                  <p className="text-xs text-destructive">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="product-stock">Estoque</Label>
                <Input
                  id="product-stock"
                  type="number"
                  min={0}
                  {...register("stock", {
                    required: "Informe quantidade",
                    valueAsNumber: true,
                    min: { value: 0, message: "Estoque não pode ser negativo" },
                  })}
                />
                {errors.stock && (
                  <p className="text-xs text-destructive">{errors.stock.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="product-status">Status</Label>
                <select
                  id="product-status"
                  className="w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  {...register("status")}
                >
                  <option value="active">Ativo</option>
                  <option value="low">Estoque baixo</option>
                  <option value="critical">Crítico</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="product-description">Descrição (opcional)</Label>
              <Textarea
                id="product-description"
                {...register("description")}
                rows={3}
                placeholder="Detalhes técnicos e observações"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Salvando..." : "Criar produto"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCreateFormOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {isLoading && (
          <Card className="p-6 italic text-muted-foreground">Carregando produtos...</Card>
        )}

        {isError && (
          <Card className="p-6 text-destructive">
            Erro ao buscar produtos: {error?.message ?? "Erro desconhecido"}
          </Card>
        )}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <Card className="p-6 text-muted-foreground">
            Nenhum produto encontrado. Utilize o botão "Novo Produto" para cadastrar o primeiro item.
          </Card>
        )}

        {!isLoading && !isError && filteredProducts.map((product) => (
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
