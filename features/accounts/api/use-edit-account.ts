import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";


type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
      mutationFn: async(json) => {
        const response = await client.api.accounts[":id"]["$patch"]({
          json,
          param: { id },
        });
        return await response.json();
      },
      onSuccess: () => {
        toast.success("Account updated")
        queryClient.invalidateQueries({ queryKey: ["accounts"] })
        queryClient.invalidateQueries({ queryKey: ["account", {id}] })
        queryClient.invalidateQueries({ queryKey: ["transactions"] })
      },
      onError: (error) => {
        console.error("Error editing account:", error);
        toast.error("Failed to edit account")
      }
    })
  return mutation
}