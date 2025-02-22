import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
    >({
      mutationFn: async() => {
        const response = await client.api.categories[":id"]["$delete"]({
          param: { id }
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Category deleted")
        queryClient.invalidateQueries({ queryKey: ["categories"] })
      },
      onError: (error) => {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category")
      }
    })
  return mutation
}