import { unstable_cache as cache } from "next/cache";

import { db } from "@/db/config";
import type { Organization } from "@/db/schemas/organization";
import type { Store } from "@/db/schemas/store";

export const getStoreBySlug = cache(
  async (slug: Store["slug"]) => {
    const store = await db.query.stores.findFirst({
      where: (t, { eq }) => eq(t.slug, slug),
    });

    return store;
  },
  ["stores"],
  { revalidate: 14400, tags: ["stores"] },
);

export const getStoreByOrgId = cache(
  async (orgId: Organization["id"]) => {
    const store = await db.query.stores.findFirst({
      where: (t, { eq }) => eq(t.orgId, orgId),
    });

    return store;
  },
  ["stores"],
  { revalidate: 14400, tags: ["stores"] },
);
