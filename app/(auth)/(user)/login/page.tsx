import type { Metadata } from "next";

import { LoginForm } from "@/components/form/auth/login-form";
import { Heading, Paragraph } from "@/components/ui/typography";

export const metadata = {
  title: "Iniciar sesión",
  description: "Ingresa tus credenciales para acceder a tu cuenta",
} satisfies Metadata;

const Login = () => {
  return (
    <>
      <header className="mb-4">
        <Heading center>¡Bienvenido de vuelta!</Heading>

        <Paragraph center muted weight="normal" className="mt-2">
          Ingresa tus credenciales para acceder a tu cuenta y disfrutar de todos
          los beneficios que tenemos para ti.
        </Paragraph>
      </header>

      <LoginForm />
    </>
  );
};

export default Login;
