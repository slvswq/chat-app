import React from "react";

import { MessageList } from "./components/MessageList";
import { ChannelMessageList } from "./components/ChannelMessageList";
import { MessageInput } from "./components/MessageInput";
import { useChatStore } from "@/store/useChatStore";

const ChatContainer: React.FC = () => {
  const { currentTab } = useChatStore();

  return (
    <>
      {currentTab === "personal" ? <MessageList /> : <ChannelMessageList />}
      <MessageInput />
    </>
  );
};

export { ChatContainer };
