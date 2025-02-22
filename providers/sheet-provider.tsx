"use client"

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { useEffect, useState } from "react";

export const SheetProvider = () => {
  const [isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <NewAccountSheet />
      <NewCategorySheet />
      <EditAccountSheet />
      <EditCategorySheet />
    </>
  )
}