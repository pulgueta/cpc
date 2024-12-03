import type { NextPage } from "next";

import { Heading, Paragraph } from "@/components/ui/typography";
import { SalesChart } from "@/components/owner/sales/sales-chart";
import { OwnerHeader } from "@/components/owner-header";
import { SalesLines } from "@/components/owner/sales/sales-lines";
import { SalesGoal } from "@/components/owner/sales/sales-goal";
import { getStoreSales, getStoreSalesGoal } from "@/lib/database/sale";
import { getStoreBySlug } from "@/lib/database/store";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ slug: string }>;
}

const Income: NextPage<Params> = async (props) => {
  const _params = await props.params;

  // const _salesGoal = await getStoreSalesGoal(params.slug);
  //   const store = await getStoreBySlug(params.slug);

  //   if (!store) notFound();

  //   const { sales, totalIncome } = await getStoreSales(store.id);

  return (
    <>
      <OwnerHeader
        title="Ingresos"
        description="Mira el comportamiento de tus ventas en el tiempo."
      />

      <section className="grid w-full grid-cols-1 place-items-end gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* <article className="w-full rounded border p-4 shadow">
          <Heading as="h2">Meta de ventas</Heading>
          <Paragraph muted>
            Visualiza el progreso de tus ventas en tiempo real.
          </Paragraph>
          <SalesGoal salesGoal={salesGoal!} />
        </article> */}
        <article className="w-full rounded border p-4 shadow md:col-span-3 lg:col-span-3">
          {/* <SalesLines sales={sales} /> */}
          <Heading>En construcción 🚧</Heading>
        </article>
      </section>
    </>
  );
};
export default Income;
