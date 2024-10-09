import { Request } from "@/components/request";

const Home = () => {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary p-4">
      <h1 className="text-xl">Hello</h1>

      <Request />
    </main>
  );
};
export default Home;
