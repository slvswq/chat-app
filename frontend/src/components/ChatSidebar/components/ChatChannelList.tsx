import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useChatStore } from "@/store/useChatStore";
import { ChatListSkeleton } from "./skeletons/ChatListSkeleton";
import { ChatChannel } from "./ChatChannel";

const ChatChannelList: React.FC = () => {
  const navigate = useNavigate();

  const {
    getChannels,
    channels,
    isChannelsLoading,
    selectedChannel,
    setSelectedChannel,
  } = useChatStore();

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  if (isChannelsLoading) return <ChatListSkeleton />;

  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {channels.map((channel) => (
        <ChatChannel
          key={channel._id}
          {...channel}
          isActive={channel._id === selectedChannel?._id}
          amountOfMembers={channel.members.length}
          onClick={() => {
            navigate("/");
            setSelectedChannel(channel);
          }}
        />
      ))}
    </div>
  );
};

export { ChatChannelList };
