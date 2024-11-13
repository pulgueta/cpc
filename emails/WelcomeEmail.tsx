import type { FC } from "react";

import { Container, Text, Link } from "@react-email/components";

import { EmailWrapper } from "@/components/email/email-wrapper";

interface WelcomeEmailProps {
  name: string;
  url: string;
}

const WelcomeEmail: FC<Readonly<WelcomeEmailProps>> = ({
  name = "John Doe",
  url = "https://example.com",
}) => {
  return (
    <EmailWrapper title="¡Bienvenido al Centro Popular Comercial!">
      <Text className="text-pretty text-black dark:text-white">Estimado {name}:</Text>
      <Text className="text-pretty text-black dark:text-white">
        Estamos muy felices de que hagas parte de nuestra nueva plataforma. Mediante este email, haz
        clic en el siguiente botón para verificar tu correo electrónico.
      </Text>
      <Container className="flex items-center justify-center py-4">
        <Link
          href={url}
          className="mx-auto w-max rounded bg-neutral-900 p-4 text-center font-medium text-white"
        >
          Verificar mi correo
        </Link>
      </Container>

      <Container>
        <Text className="text-pretty text-gray-600 text-sm">
          Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador:
        </Text>
        <Text className="text-pretty text-center text-black text-sm dark:text-white">{url}</Text>
        <Text className="text-pretty text-gray-600 text-sm">
          Si no has solicitado este correo, por favor ignóralo.
        </Text>
      </Container>
    </EmailWrapper>
  );
};

export default WelcomeEmail;
