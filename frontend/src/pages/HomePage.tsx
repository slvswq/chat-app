import React from "react";
import { NoChatSelected } from "@/components/NoChatSelected";
import { useChatStore } from "@/store/useChatStore";
import { ChatContainer } from "@/components/ChatContainer";
import { useAuthStore } from "@/store/useAuthStore";
import { NotChannelMemberMessage } from "@/components/NotChannelMemberMessage";

const HomePage: React.FC = () => {
  const { authUser } = useAuthStore();
  const { currentTab, selectedUser, selectedChannel } = useChatStore();

  const isChatOpened =
    (currentTab === "personal" && selectedUser) ||
    (currentTab === "channels" && selectedChannel);

  // Check if authUser is a member of selected channel
  let isChannelMember: boolean;
  const channelMemberIds = selectedChannel?.members.map((member) => member._id);
  isChannelMember = channelMemberIds?.includes(authUser?._id || "") ?? false;

  return (
    <>
      {isChatOpened ? (
        currentTab === "personal" ? (
          <ChatContainer />
        ) : isChannelMember ? (
          <ChatContainer />
        ) : (
          <NotChannelMemberMessage />
        )
      ) : (
        <NoChatSelected />
      )}
    </>
  );
};

export default HomePage;
