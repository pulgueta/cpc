import { db } from "@/db/config";

export const GET = async () => {
  const users = await db.query.users.findMany();

  return Response.json(users);
};
