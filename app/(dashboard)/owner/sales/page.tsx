import { Heading, Paragraph } from "@/components/ui/typography";
import { SalesChart } from "@/components/owner/sales/sales-chart";
import { SalesTable } from "@/components/owner/sales/sales-table";

const Sales = () => {
  return (
    <>
      <header className="my-3.5">
        <Heading>Ventas</Heading>
      </header>
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
        </section>
        <SalesTable />
      </section>
    </>
  );
};
export default Sales;
