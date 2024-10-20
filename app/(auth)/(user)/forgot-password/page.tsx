import Link from "next/link";

import { ForgotPasswordForm } from "@/components/form/auth/forgot-password-form";
import { Heading, Paragraph } from "@/components/ui/typography";

const ForgotPassword = () => (
  <>
    <header className="mb-4">
      <Heading center>Recuperar mi contraseña</Heading>
      <Paragraph muted center className="mt-4">
        Ingresa tu correo electrónico para enviarte un enlace de recuperación de
        contraseña.
      </Paragraph>
    </header>

    <ForgotPasswordForm />

    <Paragraph center muted className="mt-4" weight="normal">
      ¿No tienes cuenta?{" "}
      <Link
        href="/register"
        className="mt-2 font-medium text-black text-sm underline-offset-4 hover:underline dark:text-white"
      >
        Regístrate
      </Link>
    </Paragraph>
  </>
);
export default ForgotPassword;
