import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";

import { NavUser } from "./components/NavUser";
import { ChatSidebarTabs } from "./components/ChatSidebarTabs";
import { ChatContactList } from "./components/ChatContactList";

const ChatSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className="mb-2 flex flex-row items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <Search className="text-muted-foreground h-5 w-5 cursor-pointer" />
      </SidebarHeader>
      <SidebarContent className="px-4">
        <ChatSidebarTabs className="mb-6" />

        <ChatContactList />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export { ChatSidebar };
