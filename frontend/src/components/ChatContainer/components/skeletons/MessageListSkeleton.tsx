import React from "react";
import { MessageBubbleSkeleton } from "./MessageBubbleSkeleton";

const MessageListSkeleton: React.FC = () => {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-6 flex flex-col justify-end">
      <MessageBubbleSkeleton className="w-[50%] h-12" isUserMessage={true} />
      <MessageBubbleSkeleton className="w-[70%] h-30" isUserMessage={false} />
      <MessageBubbleSkeleton className="w-[30%] h-12" isUserMessage={false} />
      <MessageBubbleSkeleton className="w-[20%] h-12" isUserMessage={true} />
      <MessageBubbleSkeleton className="w-[70%] h-40" isUserMessage={true} />
      <MessageBubbleSkeleton className="w-[50%] h-12" isUserMessage={false} />
      <MessageBubbleSkeleton className="w-[70%] h-25" isUserMessage={true} />
    </div>
  );
};

export { MessageListSkeleton };
