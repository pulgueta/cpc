import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import type { NewUser, User } from "@/db/schemas/user";
import { user } from "@/db/schemas/user";
import { stores } from "@/db/schemas/store";
import { member } from "@/db/schemas/member";
import { auth } from "@/lib/auth";
import { cache } from "@/lib/cache";
import { getCurrentSession } from "@/lib/auth/session";
import type { ConvertToSellerSchema } from "@/schemas/user";

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
    where: (t, { eq }) => eq(t.id, sessionUser?.user.id ?? ""),
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

  const store = await db.transaction(async ({ insert, update }) => {
    const [store] = await insert(stores)
      .values({
        name: data.storeName,
        ownerId: data.ownerId,
        mainContactPhone: data.mainContactPhone,
        image: data.logo,
        salesGoal: data.salesGoal,
      })
      .returning();

    // I update the member email manually as on the first insert is set as null, although I'm logged in.
    await update(member)
      .set({
        email: data.email,
      })
      .where(eq(member.email, data.email));

    await update(user)
      .set({
        document: data.document,
        documentType: data.documentType,
        role: "storeOwner",
      })
      .where(eq(user.id, data.ownerId))
      .returning();

    return store;
  });

  return {
    message: "Tu tienda se ha creado con éxito. ¡A vender!",
    organization: createdOrg,
    store,
  };
};
