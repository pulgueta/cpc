import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { UploadCloud } from "lucide-react";

const Settings = async () => {
  const session = await getCurrentSession();

  return (
    <main className="min-h-dvh min-w-full p-4">
      <header className="mx-auto max-w-screen-xl">
        <Heading>Ajustes</Heading>
        <Paragraph muted>Aquí puedes modificar los detalles de tu cuenta.</Paragraph>
      </header>

      <Separator className="mx-auto my-4 max-w-screen-xl" />

      <section className="mx-auto max-w-screen-xl">
        <Heading as="h2" className="mb-2">
          Información de la cuenta
        </Heading>
        <Paragraph muted>
          <strong>Nombre:</strong> {session?.user.name}
        </Paragraph>
        <Paragraph muted>
          <strong>Email:</strong> {session?.user.email}
        </Paragraph>
        <Paragraph muted>
          <strong>Número de teléfono:</strong>{" "}
          {session?.user.phone ?? "No se ha agregado un número de teléfono"}
        </Paragraph>

        <Heading as="h2" className="mt-2">
          Imagen de perfil
        </Heading>
        <div className="relative">
          <Avatar className="mx-auto my-2 size-48 cursor-pointer">
            <AvatarImage src={session?.user.image} alt={session?.user.name} />
            <AvatarFallback className="text-3xl">
              {session?.user.name.charAt(0).toUpperCase()}
              {session?.user.name.charAt(1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button className="-translate-x-1/2 absolute bottom-0 left-1/3 rounded-full" size="icon">
            <UploadCloud size={16} />
          </Button>
        </div>
      </section>
    </main>
  );
};
export default Settings;
