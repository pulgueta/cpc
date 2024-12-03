import { Suspense } from "react";

import type { NextPage } from "next";
import { notFound } from "next/navigation";

import { OwnerHeader } from "@/components/owner-header";
import { getSalesWithItems, getStoreSales } from "@/lib/database/sale";
import { getStoreBySlug } from "@/lib/database/store";
import { SalesTable } from "@/components/owner/sales/sales-table";

interface Params {
  params: Promise<{ slug: string }>;
}

const Sales: NextPage<Params> = async (props) => {
  const params = await props.params;

  const store = await getStoreBySlug(params.slug);

  if (!store) notFound();

  const sales = await getStoreSales(store.id);
  const salesWithItems = await getSalesWithItems(sales);

  return (
    <>
      <OwnerHeader
        title="Ventas"
        description="Aquí podrás visualizar y administrar las ventas de tu tienda."
      />

      <article className="w-full md:mx-auto md:max-w-[480px] lg:max-w-full">
        <Suspense fallback={<></>}>
          <SalesTable data={salesWithItems} />
        </Suspense>
      </article>
    </>
  );
};
export default Sales;
