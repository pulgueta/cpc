import type { Metadata } from "next";

import { LoginForm } from "@/components/form/auth/login-form";
import { Heading, Paragraph } from "@/components/ui/typography";

export const metadata = {
  title: "Iniciar sesión (Portal empresas)",
  description: "Ingresa tus credenciales para acceder a tu cuenta",
} satisfies Metadata;

const Login = () => {
  return (
    <>
      <header className="mb-4">
        <Heading center>Portal de empresas</Heading>

        <Paragraph center muted weight="normal" className="mt-2">
          Ingresa tus credenciales para acceder a tu cuenta
        </Paragraph>
      </header>

      <LoginForm />
    </>
  );
};

export default Login;
