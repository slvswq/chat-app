import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { NavUser } from "./components/NavUser";
import { ChatSidebarTabs } from "./components/ChatSidebarTabs";
import { ChatContactList } from "./components/ChatContactList";
import { SearchUsersField } from "../SearchUsersField";

const ChatSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className="mb-2 flex flex-col items-left p-4">
        <h1 className="text-2xl font-bold">Chat App</h1>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <ChatSidebarTabs className="mb-2" />
        <SearchUsersField className="mb-6" />
        <ChatContactList />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export { ChatSidebar };
