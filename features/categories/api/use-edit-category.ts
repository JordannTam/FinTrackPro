import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async(json) => {
        const response = await client.api.categories[":id"]["$patch"]({
          json,
          param: { id },
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Category updated")
        queryClient.invalidateQueries({ queryKey: ["categories"] })
      },
      onError: (error) => {
        console.error("Error editing category:", error);
        toast.error("Failed to edit category")
      }
    })
  return mutation
}