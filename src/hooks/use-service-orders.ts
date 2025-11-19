import { useQuery } from "@tanstack/react-query";
import { fetchServiceOrders, type ServiceOrder } from "@/lib/erp";

export const useServiceOrders = () => {
  return useQuery<ServiceOrder[], Error>({
    queryKey: ["service-orders"],
    queryFn: fetchServiceOrders,
    staleTime: 60_000,
  });
};
