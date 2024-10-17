import { Client } from "@/components/auth/client";
import { LogoutButton } from "@/components/auth/logout-button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";

const Home = async () => {
  const auth = await getCurrentSession();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white p-4 dark:bg-neutral-900">
      {auth?.user ? (
        <Heading>Hello, {auth?.user.name}</Heading>
      ) : (
        <Paragraph>Not logged in</Paragraph>
      )}

      {auth?.session && <LogoutButton />}

      <Client />
    </main>
  );
};
export default Home;
