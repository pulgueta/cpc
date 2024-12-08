import type { FC, ReactNode } from "react";
import { useActionState, useEffect, useId } from "react";

import Form from "next/form";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ActionsProps<T extends ServerAction> {
  title?: string;
  description?: string;
  name: string;
  value: string;
  serverAction: (state: unknown, payload: FormData) => Promise<unknown>;
  initialState?: T;
  open: boolean;
  setOpen: (open: boolean) => void;
  permalink?: string | undefined;
}

type ServerAction = { message: string } | { error: string };

export const DeleteActions: FC<ActionsProps<ServerAction>> = ({
  title = "Eliminar",
  description = "¿Estás seguro? Esta acción no se podrá revertir",
  name,
  value,
  serverAction,
  initialState,
  open,
  setOpen,
  permalink,
}) => {
  const inputId = useId();
  const [state, action, isPending] = useActionState(serverAction, initialState, permalink);

  useEffect(() => {
    if (state && typeof state === "object" && "message" in state) {
      toast.success(state.message as ReactNode, { id: crypto.randomUUID() });
      setOpen(false);
    }

    if (state && typeof state === "object" && "error" in state) {
      if (Array.isArray(state.error)) {
        state.error.forEach((error) => toast.error(error, { id: crypto.randomUUID() }));
      } else {
        toast.error(state.error as ReactNode, { id: crypto.randomUUID() });
      }
    }
  }, [state, setOpen]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Form action={action} className="space-y-4">
            <Input id={inputId} name={name} hidden className="hidden" defaultValue={value} />
            <Button className="w-full" variant="destructive">
              Sí, eliminar
            </Button>
          </Form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full" disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
