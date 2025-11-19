import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { createOrder, type CreateOrderInput, type Order } from "@/lib/erp";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Order, Error, CreateOrderInput>({
    mutationFn: createOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Pedido criado",
        description: `${order.id} cadastrado com tipo ${order.type}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar pedido",
        description: error.message ?? "Falha na criação do pedido.",
        variant: "destructive",
      });
    },
  });
};
