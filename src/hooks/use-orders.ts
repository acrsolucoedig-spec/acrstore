import { useQuery } from "@tanstack/react-query";
import { fetchOrders, type Order } from "@/lib/erp";

export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 60_000,
  });
};
