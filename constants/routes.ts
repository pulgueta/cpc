import type { User } from "@/db/schemas/user";

export const authRoutes = [
  { href: "/contact", label: "Contacto" },
  { href: "/stores", label: "Tiendas" },
] as const;

export const noAuthRoutes = [
  { href: "/stores", label: "Tiendas" },
  { href: "/sell", label: "Quiero vender" },
  { href: "/contact", label: "Contacto" },
] as const;

export const settingsRoutes = [{}] as const;

export type Role = User["role"];

export const urlToRedirect = (role: string, url?: string | undefined) => {
  const parsedRole = role as Role;

  if (url && url.length > 0)
    switch (parsedRole) {
      case "admin":
        return `${url}/admin`;
      case "storeOwner":
        return `${url}/owner`;
      case "user":
        return `${url}/dashboard`;
    }

  switch (parsedRole) {
    case "admin":
      return "/admin";
    case "storeOwner":
      return "/owner";
    case "user":
      return "/dashboard";
    default:
      return "/login";
  }
};
