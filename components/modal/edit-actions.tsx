import type { FC, ReactNode } from "react";
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
import { ScrollArea } from "../ui/scroll-area";

interface ActionsProps {
  isServerAction?: boolean;
  title?: string;
  serverAction: (state: unknown, payload: FormData) => Promise<unknown>;
  initialState?: ServerAction;
  open: boolean;
  setOpen: (open: boolean) => void;
  permalink?: string | undefined;
  children: (isPending: boolean) => ReactNode;
}

type ServerAction =
  | {
      error: string;
      message?: undefined;
    }
  | {
      error: string[][];
      message?: undefined;
    }
  | {
      message: string | undefined;
      error?: undefined;
    };

export const EditActions: FC<ActionsProps> = ({
  isServerAction = true,
  title = "Editar",
  serverAction,
  initialState,
  open,
  setOpen,
  children,
  permalink,
}) => {
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
        </AlertDialogHeader>
        <ScrollArea className="max-h-[640px] min-h-full w-full">
          {isServerAction ? (
            <Form action={action} className="space-y-4">
              {children(isPending)}
            </Form>
          ) : (
            children(isPending)
          )}
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
