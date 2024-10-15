import { LogoutButton } from "@/components/auth/logout-button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { db } from "@/db/config";
import { getCurrentSession } from "@/lib/auth/session";

const Home = async () => {
  const { user, session } = await getCurrentSession();

  const users = await db.query.users.findMany();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white p-4 dark:bg-neutral-900">
      {user ? (
        <Heading>Hello, {user.name}</Heading>
      ) : (
        <Paragraph>Not logged in</Paragraph>
      )}

      {!!session && <LogoutButton />}

      {users.map((user) => (
        <div key={user.id} className="border p-4 rounded">
          <ul>
            <li>
              <Paragraph muted className="mb-2">
                {user.id}
              </Paragraph>
            </li>
            <li className="list-item">
              <Paragraph>{user.name}</Paragraph>
            </li>
            <li>
              <Paragraph>{user.email}</Paragraph>
            </li>
          </ul>
        </div>
      ))}
    </main>
  );
};
export default Home;
