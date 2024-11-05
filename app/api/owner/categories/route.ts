import { getCurrentSession } from "@/lib/auth/session";
import { getCategories } from "@/lib/database/category";

export const GET = async () => {
  const sessionData = await getCurrentSession();

  if (!sessionData) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const categories = await getCategories(sessionData.user.id);

  return Response.json(categories);
};
