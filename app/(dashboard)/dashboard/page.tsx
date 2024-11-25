import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { Building } from "lucide-react";

const Dashboard = async () => {
  const sessionData = await getCurrentSession();

  return (
    <>
      <Heading as="h2">¡Hola otra vez, {sessionData?.user.name}!</Heading>
      <Paragraph muted>
        Aquí encontrarás toda la información relevante de tu cuenta y compras.
      </Paragraph>

      <Heading className="mt-4" as="h3">
        <Building size={32} />
        En construcción
      </Heading>
      <Paragraph muted>Esta sección aún no está disponible</Paragraph>
    </>
  );
};
export default Dashboard;
