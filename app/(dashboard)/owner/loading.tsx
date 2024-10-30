import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh w-full">
      <Loader className="animate-spin" />
    </div>
  );
};
export default Loading;
