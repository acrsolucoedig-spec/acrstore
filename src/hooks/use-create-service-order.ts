import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { createServiceOrder, type CreateServiceOrderInput, type ServiceOrder } from "@/lib/erp";

export const useCreateServiceOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<ServiceOrder, Error, CreateServiceOrderInput>({
    mutationFn: createServiceOrder,
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      toast({
        title: "Ordem criada",
        description: `${order.id} registrada com prioridade ${order.priority}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar ordem",
        description: error.message ?? "Falha na criação da ordem.",
        variant: "destructive",
      });
    },
  });
};
