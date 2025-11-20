import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatContactSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

export { ChatContactSkeleton };
