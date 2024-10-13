import type { Metadata } from "next";

import { RegisterForm } from "@/components/form/auth/register-form";
import { Heading, Paragraph } from "@/components/ui/typography";

export const metadata = {
  title: "Crear cuenta (Portal empresas)",
  description: "Crear una cuenta para obtener acceso a todas las funciones de la aplicación.",
} satisfies Metadata;

const Register = () => {
  return (
    <>
      <header className="mb-4">
        <Heading center>Crear una cuenta</Heading>

        <Paragraph center muted weight="normal" className="mt-2">
          Crear una cuenta para obtener acceso a todas las funciones de la aplicación.
        </Paragraph>
      </header>

      <RegisterForm />
    </>
  );
};

export default Register;
