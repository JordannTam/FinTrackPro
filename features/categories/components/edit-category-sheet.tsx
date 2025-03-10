import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CategoryForm } from "./category-form"
import { z } from "zod"
import { insertCategorySchema } from "@/db/schema"
import { useOpenCategory } from "../hooks/use-open-category"
import { useGetCategory } from "../api/use-get-category"
import { Loader2 } from "lucide-react"
import { useEditCategory } from "../api/use-edit-category"
import { useDeleteCategory } from "../api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({
  name:true,
})

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
  const {isOpen, onClose, id} = useOpenCategory()

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    `You are about to delete category - ${categoryQuery.data?.name}`
  )


  const isLoading = categoryQuery.isLoading
  const isPending = editMutation.isPending || deleteMutation.isPending

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const onDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : {
    name: ""
  }


  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>
            <SheetDescription>
              Edit an existing category to track your transactions.
            </SheetDescription>
          </SheetHeader>
          {
            isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            ) :
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          }
        </SheetContent>
      </Sheet>
    </>

  )
}