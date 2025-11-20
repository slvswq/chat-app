import React, { useState } from "react";
import { ChatContact } from "./ChatContact";

const chatContacts = [
  {
    id: "1",
    name: "Shannon Baker",
  },
  {
    id: "2",
    name: "Jessica Wells",
  },
];

export const ChatContactList: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string>("1"); // Default active chat

  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {chatContacts.map((contact) => (
        <ChatContact
          key={contact.id}
          {...contact}
          isActive={contact.id === activeChatId}
          onClick={setActiveChatId}
        />
      ))}
    </div>
  );
};
