"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

import type { RegisterSchema } from "@/schemas/user";
import { registerSchema } from "@/schemas/user";
import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/user/useCreateUser";

export const RegisterForm = () => {
  const [show, setShow] = useState<boolean>(false);

  const isStorePath = usePathname().includes("stores");
  const router = useRouter();

  const loginHref = isStorePath ? "/stores/login" : "/login";

  const roleToCreate = isStorePath ? "storeOwner" : "user";

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: register, isPending } = useCreateUser(roleToCreate);

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await register(data);

    if ("message" in res) {
      return toast.error(res.message);
    }

    if (form.formState.isSubmitted) {
      toast.success("Cuenta creada exitosamente");

      const encodedEmail = btoa(data.email);

      return router.push(`/verify?email=${encodedEmail}`);
    }
  });

  return (
    <>
      <Form {...form}>
        <section className="space-y-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormComponent
              name="name"
              label="Nombre completo"
              render={({ field }) => (
                <Input
                  autoComplete="given-name"
                  autoFocus
                  aria-disabled={form.formState.isSubmitting && isPending}
                  placeholder="Sebastian Rojas"
                  className="shadow"
                  {...field}
                />
              )}
            />

            <FormComponent
              name="email"
              label="Correo"
              render={({ field }) => (
                <Input
                  type="email"
                  autoComplete="email"
                  aria-disabled={form.formState.isSubmitting && isPending}
                  placeholder="correo@miempresa.com"
                  className="shadow"
                  {...field}
                />
              )}
            />

            <FormComponent
              name="password"
              label="Contraseña"
              render={({ field }) => (
                <div className="relative w-full">
                  <Input
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    aria-disabled={form.formState.isSubmitting && isPending}
                    placeholder="********"
                    className="shadow"
                    {...field}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    className="absolute top-0 right-0"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </Button>
                </div>
              )}
            />

            <Button className="w-full" loading={form.formState.isSubmitting && isPending}>
              Crear cuenta
            </Button>
          </form>
        </section>
      </Form>

      <p className="mt-4 text-center text-muted-foreground text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link
          href={loginHref}
          className="mt-2 font-medium text-black text-sm underline-offset-4 hover:underline dark:text-white"
        >
          Ingresa aquí
        </Link>
      </p>
    </>
  );
};
