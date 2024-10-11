import Link from "next/link";

import { RegisterForm } from "@/components/form/auth/register-form";

const Register = () => {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-3xl tracking-tighter text-balance font-bold text-center">
          Crear una cuenta
        </h1>
        <p className="text-center text-muted-foreground mt-2 text-pretty text-sm">
          Crear una cuenta para obtener acceso a todas las funciones de la
          aplicación.
        </p>
      </header>

      <RegisterForm />

      <p className="text-center text-muted-foreground text-sm mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="mt-2 font-medium text-black dark:text-white text-sm underline-offset-4 hover:underline"
        >
          Ingresa aquí
        </Link>
      </p>
    </>
  );
};

export default Register;
