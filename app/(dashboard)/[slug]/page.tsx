import type { NextPage } from "next";
import { notFound, redirect } from "next/navigation";

import { getStoreBySlug } from "@/lib/database/store";

interface Params {
  params: Promise<{ slug: string }>;
}

const SlugRedirect: NextPage<Params> = async (props) => {
  const params = await props.params;

  const store = await getStoreBySlug(params.slug);

  if (!store) {
    return notFound();
  }

  return redirect(`/${params.slug}/owner/sales`);
};

export default SlugRedirect;
