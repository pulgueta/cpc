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

export const urlToRedirect = (role: User["role"]) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "storeOwner":
      return "/owner";
    case "user":
    default:
      return "/dashboard";
  }
};
