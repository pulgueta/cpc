import type { FC } from "react";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormErrosProps {
  error: string | string[] | undefined;
}

export const FormErros: FC<FormErrosProps> = ({ error }) => {
  return Array.isArray(error)
    ? error.map((err) => (
        <Alert variant="destructive" className="my-4" key={err}>
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{err || "Error desconocido"}</AlertDescription>
        </Alert>
      ))
    : error && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error ?? "Error desconocido"}</AlertDescription>
        </Alert>
      );
};
