import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", {id}],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({
        param: {id}
      });

      if (!res.ok) {
        throw new Error("Fail to fetch transactions")
      }

      const { data } = await res.json()
      return data
    }
  })
  return query
}
