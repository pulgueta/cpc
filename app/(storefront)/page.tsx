import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentSession } from "@/lib/auth/session";

const Home = async () => {
  const user = await getCurrentSession();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white p-4 dark:bg-neutral-900">
      <LogoutButton />

      <pre>{JSON.stringify(user?.user, null, 4)}</pre>
    </main>
  );
};
export default Home;
