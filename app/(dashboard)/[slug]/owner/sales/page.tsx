import { Suspense } from "react";

import type { NextPage } from "next";
import { notFound } from "next/navigation";

import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

import { OwnerHeader } from "@/components/owner-header";
import { getStoreSales } from "@/lib/database/sale";
import { getStoreBySlug } from "@/lib/database/store";
import { SalesTable } from "@/components/owner/sales/sales-table";

interface Params {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page: string;
  }>;
}

const salesParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
});

const Sales: NextPage<Params> = async (props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { page } = salesParamsCache.parse(searchParams);

  const store = await getStoreBySlug(params.slug);

  if (!store) notFound();

  const sales = await getStoreSales(store.id, page);

  return (
    <>
      <OwnerHeader
        title="Ventas"
        description="Aquí podrás visualizar y administrar las ventas de tu tienda."
      />

      <article className="w-full md:mx-auto md:max-w-[480px] lg:max-w-full">
        <Suspense fallback={<></>}>
          <SalesTable data={sales} />
        </Suspense>
      </article>
    </>
  );
};
export default Sales;
