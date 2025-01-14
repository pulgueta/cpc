import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { urlToRedirect } from "@/constants/routes";
import { db } from "@/db/config";
import { member } from "@/db/schemas/member";
import { stores } from "@/db/schemas/store";
import type { NewUser, User } from "@/db/schemas/user";
import { user } from "@/db/schemas/user";
import { auth } from "@/lib/auth";
import { getCurrentSession } from "@/lib/auth/session";
import { cache } from "@/lib/cache";
import type {
  ConvertToSellerSchema,
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/schemas/user";

export const registerUser = async (data: RegisterSchema) => {
  const created = await auth.api.signUpEmail({
    headers: await headers(),
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
    },
  });

  if (!created) {
    return {
      error: "Ha ocurrido un error. Por favor, intenta nuevamente más tarde.",
      defaultValues: data,
    };
  }

  return {
    message: "Usuario registrado con éxito",
  };
};

export const signInUser = async (data: LoginSchema) => {
  const user = await getUserByEmail(data.email, true);

  const session = await auth.api.signInEmail({
    headers: await headers(),
    body: {
      email: data.email,
      password: data.password!,
      rememberMe: data.remember === "on",
      callbackURL: urlToRedirect(user?.role ?? "/"),
    },
    asResponse: true,
  });

  switch (session.status) {
    case 404:
      return {
        error: "No se encontró una cuenta con ese correo electrónico",
        defaultValues: data,
      };

    case 403:
      return {
        error: "Debes verificar tu correo electrónico para poder iniciar sesión",
        defaultValues: data,
      };

    case 401:
      return {
        error: "Credenciales incorrectas",
        defaultValues: data,
      };

    case 500:
      return {
        error: "Ha ocurrido un error. Por favor, intenta nuevamente más tarde.",
        defaultValues: data,
      };
  }
};

export const forgotPassword = async ({ email }: ForgotPasswordSchema) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "No se encontró una cuenta con ese correo electrónico",
    };
  }

  const sent = await auth.api.forgetPassword({
    headers: await headers(),
    body: {
      email,
    },
  });

  if (!sent.status) {
    return {
      error: "Ha ocurrido un error. Por favor, intenta nuevamente más tarde.",
    };
  }

  return {
    message: "Correo de recuperación enviado",
  };
};

export const resetPassword = async (data: ResetPasswordSchema) => {
  const updated = await auth.api.resetPassword({
    headers: await headers(),
    body: {
      newPassword: data.password,
      token: data.token,
    },
  });

  if (!updated.status) {
    return {
      error: "Ha ocurrido un error. Por favor, intenta nuevamente más tarde.",
    };
  }

  return {
    message: "Contraseña actualizada",
  };
};

export const getUserByEmail = async (email: NewUser["email"], getCached: boolean = false) => {
  const cached = await cache.get<User>(email);

  if (cached && getCached) {
    return cached;
  }

  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });

  if (user) {
    await cache.set<User>(email, user);
  }

  return user;
};

export const getUserById = async (id: User["id"], getCached: boolean = false) => {
  const cached = await cache.get<User>(id);

  if (cached && getCached) {
    return cached;
  }

  const user = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  if (user) {
    await cache.set<User>(id, user);
  }

  return user;
};

export const generateQrCode = async (pwd: string) => {
  const verification = await auth.api.enableTwoFactor({
    headers: await headers(),
    body: {
      password: pwd,
    },
  });

  return {
    message: "Código QR generado",
    verification,
  };
};

export const isUserSignedWithSocial = async () => {
  const sessionUser = await getCurrentSession();

  const user = await db.query.account.findFirst({
    where: (t, { eq }) => eq(t.userId, sessionUser?.user.id ?? ""),
  });

  return user?.providerId !== "credential";
};

export const convertToSeller = async (data: ConvertToSellerSchema) => {
  const slug = data.storeName.toLowerCase().replace(/\s/g, "-");

  const createdOrg = await auth.api.createOrganization({
    headers: await headers(),
    body: {
      slug,
      name: data.storeName,
      userId: data.ownerId,
      logo: data.logo,
    },
  });

  if (!createdOrg) {
    return {
      error: "Hubo un error al crear la organización, intenta de nuevo.",
      defaultValues: data,
    };
  }

  if (!data.ownerId) {
    return {
      error: "No se pudo encontrar el usuario, intenta de nuevo.",
      defaultValues: data,
    };
  }

  const [[store]] = await db.batch([
    db
      .insert(stores)
      .values({
        name: data.storeName,
        ownerId: data.ownerId,
        mainContactPhone: data.mainContactPhone,
        image: data.logo,
        salesGoal: data.salesGoal,
        orgId: createdOrg.id,
        slug,
      })
      .returning(),
    db
      .update(member)
      .set({
        email: data.email,
      })
      .where(eq(member.userId, data.ownerId)),
    db
      .update(user)
      .set({
        document: data.document,
        documentType: data.documentType,
        role: "storeOwner",
      })
      .where(eq(user.id, data.ownerId)),
  ]);

  return {
    message: "Tu tienda se ha creado con éxito. ¡A vender!",
    organization: createdOrg,
    store,
  };
};
