export const authRoutes = [
  { href: "/contact", label: "Contacto" },
  { href: "/stores", label: "Tiendas" },
] as const;

export const noAuthRoutes = [
  { href: "/stores", label: "Tiendas" },
  { href: "/sell", label: "Quiero vender" },
  { href: "/contact", label: "Contacto" },
] as const;
