import React from "react";
import { NoChatSelected } from "@/components/NoChatSelected";
import { useChatStore } from "@/store/useChatStore";
import { ChatContainer } from "@/components/ChatContainer";

const HomePage: React.FC = () => {
  const { selectedUser } = useChatStore();

  return <>{!selectedUser ? <NoChatSelected /> : <ChatContainer />}</>;
};

export default HomePage;
