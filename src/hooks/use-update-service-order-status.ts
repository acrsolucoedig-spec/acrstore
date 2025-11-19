import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { updateServiceOrderStatus, type ServiceOrder, type UpdateServiceOrderStatusInput } from "@/lib/erp";

export const useUpdateServiceOrderStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ServiceOrder, Error, UpdateServiceOrderStatusInput>({
    mutationFn: updateServiceOrderStatus,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      toast({
        title: "Ordem atualizada",
        description: `${order.id} agora está ${order.status}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Falha ao atualizar",
        description: error.message ?? "Não foi possível atualizar a ordem.",
        variant: "destructive",
      });
    },
  });
};
