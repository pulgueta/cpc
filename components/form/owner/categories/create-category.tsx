"use client";

import { useActionState, useEffect, useId } from "react";

import Form from "next/form";

import { AlertCircle, Plus } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createCategoryAction } from "@/actions/category/create-category";
import { useSession } from "@/lib/auth.client";

export const CreateCategory = () => {
  const [categoryName, categoryDescription] = [useId(), useId()];

  const [state, action] = useActionState(createCategoryAction, undefined);

  const sessionData = useSession();

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message, { id: crypto.randomUUID() });
    }
  }, [state]);

  return (
    <div>
      <Form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={categoryName}>Nombre de la categoría</Label>
          <Input autoFocus placeholder="Celulares" name="categoryName" id={categoryName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={categoryDescription}>Descripción de la categoría</Label>
          <Textarea
            placeholder="Productos sobre teléfonos"
            className="min-h-32"
            name="categoryDescription"
            id={categoryDescription}
          />
        </div>

        <Input
          className="hidden"
          name="storeOwnerId"
          defaultValue={sessionData.data?.user.id}
          hidden
        />

        <Button leftIcon={<Plus size={16} />}>Crear categoría</Button>
      </Form>

      {Array.isArray(state?.error)
        ? state.error.map((err, idx) => (
            <Alert variant="destructive" className="my-4" key={idx}>
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{err || "Error desconocido"}</AlertDescription>
            </Alert>
          ))
        : state?.error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error ?? "Error desconocido"}</AlertDescription>
            </Alert>
          )}
    </div>
  );
};
