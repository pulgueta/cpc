import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};
export default Loading;
