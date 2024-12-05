import type { AnyZodObject, TypeOf } from "zod";

import { getCurrentSession } from "@/lib/auth/session";

type ActionSuccess<T extends AnyZodObject> = TypeOf<T>;

type ActionError<T extends AnyZodObject> = {
  error: string | string[];
  defaultValues: Partial<TypeOf<T>>;
};

type Action<T extends AnyZodObject> = ActionSuccess<T> | ActionError<T>;

export const handleAction = async <T extends AnyZodObject>(
  schema: T,
  formData: FormData,
  needsAuth = true,
): Promise<Action<T>> => {
  const sessionData = await getCurrentSession();

  if (!sessionData?.session && needsAuth) {
    return {
      error: "No tienes permisos para realizar esta acción, inicia sesión primero.",
      defaultValues: {},
    };
  }

  const formDataObject = Object.fromEntries(formData.entries());

  const schemaShape = schema.shape;

  const defaultValues = Object.keys(schemaShape).reduce<Partial<TypeOf<T>>>((acc, key) => {
    if (key in formDataObject) {
      acc[key as keyof TypeOf<T>] = formDataObject[key] as unknown as TypeOf<T>[keyof TypeOf<T>];
    }

    return acc;
  }, {});

  const parsedData = schema.safeParse(formDataObject);

  if (!parsedData.success) {
    const errors = Object.values(parsedData.error.flatten().fieldErrors)
      .flat()
      .filter((error): error is string => typeof error === "string");

    return {
      error: errors.length === 1 ? errors[0] : errors,
      defaultValues,
    };
  }

  return parsedData.data;
};
