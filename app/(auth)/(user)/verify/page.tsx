import { Suspense } from "react";

import { VerifyOTP } from "@/components/form/auth/verify-otp";
import { Heading, Paragraph } from "@/components/ui/typography";

const Verify = () => {
  return (
    <>
      <header className="mb-4">
        <Heading center>Validar código</Heading>

        <Paragraph center muted weight="normal" className="mt-2">
          Hemos enviado un código de verificación a su correo electrónico. Por favor, ingréselo a
          continuación.
        </Paragraph>
      </header>

      <Suspense fallback={<></>}>
        <VerifyOTP />
      </Suspense>
    </>
  );
};

export default Verify;
