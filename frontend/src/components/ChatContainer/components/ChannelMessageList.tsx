import React, { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

import { MessageListSkeleton } from "./skeletons/MessageListSkeleton";
import { MessageBubble } from "./MessageBubble";
import { useAuthStore } from "@/store/useAuthStore";

const ChannelMessageList: React.FC = () => {
  const { authUser } = useAuthStore();
  const {
    channelMessages,
    getChannelMessages,
    isChannelMessagesLoading,
    selectedChannel,
  } = useChatStore();

  useEffect(() => {
    if (selectedChannel?._id) getChannelMessages(selectedChannel?._id);
  }, [selectedChannel?._id, getChannelMessages]);

  if (isChannelMessagesLoading) return <MessageListSkeleton />;

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse">
      <div className="flex-1 flex flex-col justify-end space-y-4">
        {channelMessages.map((msg) => (
          <MessageBubble
            key={msg._id}
            senderName={
              authUser?._id !== msg.sender._id ? msg.sender.fullName : ""
            }
            message={msg.text}
          />
        ))}
      </div>
    </div>
  );
};

export { ChannelMessageList };
