import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTransactions = (from: string, to: string, accountId: string) => {

  const query = useQuery({
    queryKey: ["transactions", {from, to, accountId}],
    queryFn: async () => {
      const res = await client.api.transactions.$get(
        {
          query: {
            from, 
            to, 
            accountId
          }
        }
      );

      if (!res.ok) {
        throw new Error("Fail to fetch transactions")
      }

      const { data } = await res.json()
      return data.map((transaction) => ({
        ...transaction,
        amount: transaction.amount
      }))
    }
  })
  return query
}
