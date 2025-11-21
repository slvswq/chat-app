import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MessageBubbleSkeletonProps {
  className?: string;
  isUserMessage: boolean;
}

const MessageBubbleSkeleton: React.FC<MessageBubbleSkeletonProps> = ({
  className,
  isUserMessage,
}) => (
  <div
    className={cn("flex items-start gap-3", isUserMessage ? "justify-end" : "")}
  >
    {!isUserMessage && <Skeleton className="size-8 rounded-full" />}
    <Skeleton
      className={cn(
        "max-w-[70%] rounded-lg h-12",
        isUserMessage ? "rounded-br-none" : "rounded-bl-none",
        className
      )}
    />
  </div>
);

export { MessageBubbleSkeleton };
