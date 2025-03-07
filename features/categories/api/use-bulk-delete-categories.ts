import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async(json) => {
        const response = await client.api.categories["bulk-delete"].$post({json});
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Category deleted")
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        // Todo: also invalidate summary
      },
      onError: () => {
        toast.error("Failed to delete category")
      }
    })
  return mutation
}