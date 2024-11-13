import type { FC } from "react";

import { Container, Text, Link } from "@react-email/components";

import { EmailWrapper } from "@/components/email/email-wrapper";

interface OTPEmailProps {
  name: string;
  otp: string;
}

const OTPEmail: FC<Readonly<OTPEmailProps>> = ({ name = "John Doe", otp = "123456" }) => {
  return (
    <EmailWrapper
      title="Centro Popular Comercial"
      preview="Activar doble factor de autenticación (2FA)"
    >
      <Text className="text-pretty text-black dark:text-white">Estimado {name}:</Text>
      <Text className="text-pretty text-black dark:text-white">
        Se ha solicitado un código de verificación para tu correo. Introduce el código a
        continuación para activar el dobble factor de autenticación. No compartas este código con
        nadie.
      </Text>
      <Container className="flex items-center justify-center bg-neutral-50 py-4">
        <Text className="text-pretty font-semibold text-black text-xl dark:text-white">{otp}</Text>
      </Container>

      <Container>
        <Text className="text-pretty text-gray-600 text-sm">
          Si no has solicitado este correo, por favor verifica tu cuenta de inmediato.
        </Text>
      </Container>
    </EmailWrapper>
  );
};

export default OTPEmail;
