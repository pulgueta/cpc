import type { FC } from "react";
import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category } from "@/constants/db-types";

interface EditCategoryProps {
  category: Category;
}

export const EditCategory: FC<EditCategoryProps> = ({ category }) => {
  const [categoryName, categoryDescription] = [useId(), useId()];

  return (
    <>
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

      <Button className="w-full">Actualizar categoría</Button>
    </>
  );
};
