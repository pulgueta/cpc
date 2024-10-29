import { getCurrentSession } from "./session";

type Role = "admin" | "user" | "storeOwner";

export const getUserRole = async () => {
  const sessionData = await getCurrentSession();

  return sessionData?.user.role as Role;
};
