import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-white p-4 dark:bg-neutral-900">
      <Loader2 className="animate-spin" />
    </main>
  );
};
export default Loading;
