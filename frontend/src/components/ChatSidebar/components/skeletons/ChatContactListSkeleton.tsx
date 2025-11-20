import React from "react";
import { ChatContactSkeleton } from "./ChatContactSkeleton";

const ChatContactListSkeleton: React.FC = () => {
  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {Array(8)
        .fill(0)
        .map((_, idx) => (
          <ChatContactSkeleton key={idx} />
        ))}
    </div>
  );
};

export { ChatContactListSkeleton };
