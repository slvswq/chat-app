import React from "react";
import { Search } from "lucide-react";

import { NavUser } from "./components/NavUser";
import { ChatSidebarTabs } from "./components/ChatSidebarTabs";
import { ChatContactList } from "./components/ChatContactList";

const ChatSidebar: React.FC = () => {
  return (
    <aside className="flex w-80 flex-col border border-r p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <Search className="text-muted-foreground h-5 w-5 cursor-pointer" />
      </div>

      <ChatSidebarTabs className="mb-6" />

      <ChatContactList />

      <NavUser className="mt-6" />
    </aside>
  );
};

export { ChatSidebar };
