"use server";

import { redirect } from "next/navigation";

import { converToSellerSchema } from "@/schemas/user";
import { handleAction } from "../handle-action";
import { convertToSeller } from "@/lib/database/user";

export const convertToSellerAction = async (_prev: unknown, e: FormData) => {
  debugger;
  const user = await handleAction(converToSellerSchema, e);

  if ("error" in user) {
    console.log({ error: user.error });

    return {
      error: user.error,
      defaultValues: user.defaultValues,
    };
  }

  const seller = await convertToSeller({
    email: user.email,
    mainContactPhone: user.mainContactPhone,
    ownerId: user.ownerId,
    storeName: user.storeName,
    document: user.document,
    documentType: user.documentType,
    salesGoal: user.salesGoal,
  });

  if (seller?.error) {
    return {
      error: seller.error,
    };
  }

  return redirect(`/${seller.store?.slug}/owner/sales`);
};
