import React from "react";

import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";

const ChatContainer: React.FC = () => {
  return (
    <>
      <MessageList />
      <MessageInput />
    </>
  );
};

export { ChatContainer };
