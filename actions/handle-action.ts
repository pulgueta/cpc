import type { AnyZodObject, TypeOf } from "zod";

import { getCurrentSession } from "@/lib/auth/session";

type ActionSuccess<T extends AnyZodObject> = TypeOf<T>;

type ActionError = {
  error: string | string[];
};

type Action<T extends AnyZodObject> = ActionSuccess<T> | ActionError;

export const handleAction = async <T extends AnyZodObject>(
  schema: T,
  formData: FormData
): Promise<Action<T>> => {
  const sessionData = await getCurrentSession();

  if (!sessionData?.session) {
    return {
      error: "No tienes permisos para realizar esta acción",
    };
  }

  const parsedData = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedData.success) {
    const errors = Object.values(parsedData.error.flatten().fieldErrors)
      .flat()
      .filter((error): error is string => typeof error === "string");

    return {
      error: errors.length === 1 ? errors[0] : errors,
    };
  }

  return parsedData.data;
};
