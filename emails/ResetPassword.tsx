import type { FC } from "react";

import {
  Container,
  Button,
  Tailwind,
  Html,
  Heading,
  Text,
  Img,
  Head,
  Preview,
  Link,
} from "@react-email/components";

import tailwindConfig from "@/tailwind.config";
import { EmailWrapper } from "@/components/email/email-wrapper";

interface ResetPasswordProps {
  name: string;
  url: string;
}

const ResetPassword: FC<Readonly<ResetPasswordProps>> = ({
  name = "John Doe",
  url = "https://example.com",
}) => {
  return (
    <EmailWrapper title="Centro Popular Comercial" preview="Reestablecer mi contraseña">
      <Text className="text-pretty text-black dark:text-white">Estimado {name}:</Text>
      <Text className="text-pretty text-black dark:text-white">
        Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar.
      </Text>
      <Container className="flex items-center justify-center py-4">
        <Link
          href={url}
          className="mx-auto w-max rounded bg-neutral-900 p-4 text-center font-medium text-white"
        >
          Cambiar mi contraseña
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

export default ResetPassword;
