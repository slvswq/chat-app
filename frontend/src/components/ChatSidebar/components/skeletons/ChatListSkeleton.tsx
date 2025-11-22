import React from "react";
import { ChatElementSkeleton } from "./ChatElementSkeleton";

const ChatListSkeleton: React.FC = () => {
  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {Array(8)
        .fill(0)
        .map((_, idx) => (
          <ChatElementSkeleton key={idx} />
        ))}
    </div>
  );
};

export { ChatListSkeleton };
