"use client";

import { useActionState, useId } from "react";

import Form from "next/form";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createCategoryAction } from "@/actions/create-action";
import { useSession } from "@/lib/auth.client";

export const CreateCategory = () => {
  const categoryName = useId();
  const categoryDescription = useId();

  const [state, action, isPending] = useActionState(createCategoryAction, undefined);

  const sessionData = useSession();

  return (
    <div>
      <Form action={action} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={categoryName}>Nombre de la categoría</Label>
          <Input placeholder="Celulares" name="categoryName" id={categoryName} />
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

        <Input className="hidden" name="storeOwnerId" value={sessionData.data?.user.id} />

        <Button loading={isPending}>Crear categoría</Button>
      </Form>

      {Array.isArray(state?.error) &&
        state.error.map((err, idx) => (
          <Alert variant="destructive" className="my-4" key={idx}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{err || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
    </div>
  );
};
