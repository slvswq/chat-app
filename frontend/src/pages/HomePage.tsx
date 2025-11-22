import React from "react";
import { NoChatSelected } from "@/components/NoChatSelected";
import { useChatStore } from "@/store/useChatStore";
import { ChatContainer } from "@/components/ChatContainer";

const HomePage: React.FC = () => {
  const { currentTab, selectedUser, selectedChannel } = useChatStore();

  const isChatOpened =
    (currentTab === "personal" && selectedUser) ||
    (currentTab === "channels" && selectedChannel);

  return <>{isChatOpened ? <ChatContainer /> : <NoChatSelected />}</>;
};

export default HomePage;
