import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { updateOrderStatus, type Order, type UpdateOrderStatusInput } from "@/lib/erp";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Order, Error, UpdateOrderStatusInput>({
    mutationFn: updateOrderStatus,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Pedido atualizado",
        description: `${order.id} agora está ${order.status}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Falha ao atualizar",
        description: error.message ?? "Não foi possível atualizar o pedido.",
        variant: "destructive",
      });
    },
  });
};
