import Link from "next/link";

import { LoginForm } from "@/components/form/auth/login-form";

const Login = () => {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-3xl tracking-tighter text-balance font-bold text-center">
          Portal de empresas
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-pretty text-sm">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </header>

      <LoginForm />

      <p className="text-center text-muted-foreground text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <Link
          href="/register"
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Regístrate
        </Link>
      </p>

      <p className="text-center text-muted-foreground text-sm mt-2">
        <Link
          href="/forgot-password"
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Olvidé mi contraseña
        </Link>
      </p>
    </>
  );
};

export default Login;
