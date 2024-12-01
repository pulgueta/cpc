import type { NextPage } from "next";
import { notFound } from "next/navigation";

import { OwnerHeader } from "@/components/owner-header";
import { getStoreSales } from "@/lib/database/sale";
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

  return (
    <>
      <OwnerHeader
        title="Ventas"
        description="Aquí podrás visualizar y administrar las ventas de tu tienda."
      />

      <section className="w-full">
        <SalesTable data={sales} />
      </section>
    </>
  );
};
export default Sales;
