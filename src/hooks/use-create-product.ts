import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { createProduct, type CreateProductInput, type Product } from "@/lib/erp";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Product, Error, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produto cadastrado",
        description: `${product.name} foi adicionado ao estoque.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message ?? "Não foi possível salvar o produto.",
        variant: "destructive",
      });
    },
  });
};
