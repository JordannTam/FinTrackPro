import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async(json) => {
        const response = await client.api.transactions[":id"]["$patch"]({
          json,
          param: { id },
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Transaction updated")
        queryClient.invalidateQueries({ queryKey: ["transaction", {id}]})
        queryClient.invalidateQueries({ queryKey: ["transactions"] })
      },
      onError: (error) => {
        console.error("Error editing transaction:", error);
        toast.error("Failed to edit transaction")
      }
    })
  return mutation
}