import { Spinner } from "@/components/ui/spinner";

const LoadingPage: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <Spinner className="size-10" />
  </div>
);

export default LoadingPage;
