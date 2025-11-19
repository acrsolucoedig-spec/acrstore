import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product } from "@/lib/erp";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });
};
