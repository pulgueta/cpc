import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heading, Paragraph } from "@/components/ui/typography";
import { RequestToSell } from "@/components/form/user/request-to-sell";

const Seller = () => {
  return (
    <section className="flex min-h-dvh w-full items-center justify-center p-4">
      <article className="w-full max-w-screen-sm">
        <header className="mb-4 border-b pb-4">
          <Heading>Empezar a vender</Heading>
          <Paragraph muted className="mb-4">
            Llena el siguiente formulario para comenzar a vender tus productos.
          </Paragraph>

          <Alert variant="info">
            <AlertOctagon size={16} />
            <AlertTitle>¡Atento!</AlertTitle>
            <AlertDescription>
              Estás a punto de vender tus productos en nuestra plataforma y este flujo está en
              construcción. Pronto puede cambiar.
            </AlertDescription>
          </Alert>
        </header>

        <RequestToSell />
      </article>
    </section>
  );
};
export default Seller;
