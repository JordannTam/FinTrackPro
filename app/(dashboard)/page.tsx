"use client"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    redirect("/transactions")
  }, [])

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  )
}
