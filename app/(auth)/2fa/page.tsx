import Link from "next/link";

import { TwoFAForm } from "@/components/form/auth/2fa-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";

const TwoFA = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doble factor de autenticación (2FA)</CardTitle>
        <CardDescription>
          Ingresa el código que se generó en tu aplicación de autenticación.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TwoFAForm />
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <Paragraph>
          ¿Necesitas ayuda?{" "}
          <Link href="/support" className="text-muted-foreground">
            Contactar soporte
          </Link>
        </Paragraph>
      </CardFooter>
    </Card>
  );
};
export default TwoFA;
