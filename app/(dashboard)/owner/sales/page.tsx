import { Heading, Paragraph } from "@/components/ui/typography";
import { SalesChart } from "@/components/owner/sales/sales-chart";
import { OwnerHeader } from "@/components/owner-header";
import { SalesLines } from "@/components/owner/sales/sales-lines";

const Sales = () => {
  return (
    <>
      <OwnerHeader
        title="Ventas"
        description="Aquí podrás visualizar y administrar las ventas de tu tienda."
      />

      <section className="w-full">
        <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <article className="w-full rounded border p-4 shadow">
            <Heading as="h2">Gráfico</Heading>
            <Paragraph muted>Aquí podrás ver todas las ventas realizadas en tu tienda.</Paragraph>
            <SalesChart />
          </article>
          <article className="w-full rounded border p-4 shadow">
            <Heading as="h2">Gráfico</Heading>
            <Paragraph muted>Aquí podrás ver todas las ventas realizadas en tu tienda.</Paragraph>
            <SalesChart />
          </article>
          <article className="w-full rounded border p-4 shadow">
            <Heading as="h2">Gráfico</Heading>
            <Paragraph muted>Aquí podrás ver todas las ventas realizadas en tu tienda.</Paragraph>
            <SalesChart />
          </article>
          <article className="w-full rounded border p-4 shadow">
            <Heading as="h2">Gráfico</Heading>
            <Paragraph muted className="mb-4">
              Aquí podrás ver todas las ventas realizadas en tu tienda.
            </Paragraph>
            <SalesLines />
          </article>
        </section>
      </section>
    </>
  );
};
export default Sales;
