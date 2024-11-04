import type { FC } from "react";
import { useActionState, useEffect, useId } from "react";

import Form from "next/form";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Category } from "@/db/schemas/category";
import { updateCategoryAction } from "@/actions/category/update-category";

interface ActionsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category;
}

export const Actions: FC<ActionsProps> = ({ open = false, setOpen, category }) => {
  const [categoryName, categoryDescription] = [useId(), useId()];

  const [state, action, isPending] = useActionState(updateCategoryAction, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message, { id: crypto.randomUUID() });
      setOpen(false);
    }

    if (state?.error) {
      toast.error(state.error, { id: crypto.randomUUID() });
    }
  }, [state]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar categoría</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={categoryName}>Nombre de la categoría</Label>
              <Input
                placeholder="Celulares"
                name="categoryName"
                id={categoryName}
                defaultValue={category.categoryName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={categoryDescription}>Descripción de la categoría</Label>
              <Textarea
                placeholder="Productos sobre teléfonos"
                className="min-h-32"
                name="categoryDescription"
                id={categoryDescription}
                defaultValue={category.categoryDescription ?? ""}
              />
            </div>

            <Input className="hidden" name="id" defaultValue={category.id} hidden />

            <Button loading={isPending} className="w-full">
              Actualizar categoría
            </Button>
          </Form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
