import { Loader2 } from "lucide-react";

interface LoadingOrErrorProps {
  isLoading: boolean;
  isError?: boolean;
}

export function LoadingOrError({
  isLoading,
  isError,
}: LoadingOrErrorProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="size-14 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>An error occurred</p>
      </div>
    );
  }

  return null;
}
