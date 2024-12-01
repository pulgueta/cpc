import { db } from "@/db/config";
import type { Organization } from "@/db/schemas/organization";
import type { Store } from "@/db/schemas/store";

export const getStoreBySlug = async (slug: Store["slug"]) => {
  const store = await db.query.stores.findFirst({
    where: (t, { eq }) => eq(t.slug, slug),
  });

  return store;
};

export const getStoreByOrgId = async (orgId: Organization["id"]) => {
  const store = await db.query.stores.findFirst({
    where: (t, { eq }) => eq(t.orgId, orgId),
  });

  return store;
};
