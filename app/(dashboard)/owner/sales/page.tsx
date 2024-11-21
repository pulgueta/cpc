import { Heading, Paragraph } from "@/components/ui/typography";
import { SalesChart } from "@/components/owner/sales/sales-chart";
import { OwnerHeader } from "@/components/owner-header";
import { SalesLines } from "@/components/owner/sales/sales-lines";
import { SalesGoal } from "@/components/owner/sales/sales-goal";

const Sales = async () => {
  return (
    <>
      <OwnerHeader
        title="Ventas"
        description="Aquí podrás visualizar y administrar las ventas de tu tienda."
      />

      <section className="grid w-full grid-cols-1 place-items-end gap-4 md:grid-cols-2 lg:grid-cols-2">
        <article className="w-full rounded border p-4 shadow">
          <Heading as="h2">Gráfico</Heading>
          <Paragraph muted>Aquí podrás ver todas las ventas realizadas en tu tienda.</Paragraph>
          <SalesChart />
        </article>
        <article className="w-full rounded border p-4 shadow">
          <Heading as="h2">Meta de ventas</Heading>
          <Paragraph muted>Visualiza el progreso de tus ventas en tiempo real.</Paragraph>
          <SalesGoal />
        </article>
        <article className="h-full w-full rounded border p-4 shadow md:col-span-3 lg:col-span-3">
          <Heading as="h2">Ingresos</Heading>
          <Paragraph muted>Mira el comportamiento de tus ventas en el tiempo.</Paragraph>
          <SalesLines />
        </article>
      </section>
    </>
  );
};
export default Sales;
