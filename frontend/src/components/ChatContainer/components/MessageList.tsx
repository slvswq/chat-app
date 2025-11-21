import React, { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

import { MessageListSkeleton } from "./skeletons/MessageListSkeleton";
import { MessageBubble } from "./MessageBubble";

const MessageList: React.FC = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) return <MessageListSkeleton />;

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse">
      <div className="flex-1 flex flex-col justify-end space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            senderName={
              msg.senderId === selectedUser?._id ? selectedUser?.fullName : ""
            }
            message={msg.text}
          />
        ))}
      </div>
    </div>
  );
};

export { MessageList };
