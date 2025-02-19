import type { Metadata } from "next";

import { RegisterForm } from "@/components/form/auth/register-form";
import { Heading, Paragraph } from "@/components/ui/typography";

export const metadata = {
  title: "Crear cuenta",
  description: "Crear una cuenta para obtener acceso a todas las funciones de la aplicación.",
} satisfies Metadata;

const Register = () => {
  return (
    <>
      <header className="mb-4">
        <Heading center>Crear una cuenta</Heading>

        <Paragraph muted weight="normal" className="mt-1">
          Crea una cuenta ahora para poder obtener los beneficios, descuentos, eventos y mucho más
          que hay para ti en el Centro Popular Comercial.
        </Paragraph>
      </header>

      <RegisterForm />
    </>
  );
};

export default Register;
