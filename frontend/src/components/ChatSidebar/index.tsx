import React from "react";

import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

import { NavUser } from "./components/NavUser";
import { ChatSidebarTabs } from "./components/ChatSidebarTabs";
import { ChatContactList } from "./components/ChatContactList";
import { ChatChannelList } from "./components/ChatChannelList";
import { SearchUsersField } from "../SearchUsersField";
import { SearchChannelsField } from "../SearchChannelsField";
import { useChatStore } from "@/store/useChatStore";

const ChatSidebar: React.FC = () => {
  const { currentTab } = useChatStore();

  return (
    <Sidebar>
      <SidebarHeader className="mb-2 flex flex-col items-left p-4">
        <h1 className="text-2xl font-bold">Chat App</h1>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <ChatSidebarTabs className="mb-2" />
        {currentTab === "personal" ? (
          <SearchUsersField className="mb-2" />
        ) : (
          <SearchChannelsField className="mb-2" />
        )}
        {currentTab === "personal" ? <ChatContactList /> : <ChatChannelList />}
      </SidebarContent>
      <SidebarFooter className="p-4">
        {currentTab === "channels" && (
          <Button asChild>
            <Link to="/create-channel">Create new channel</Link>
          </Button>
        )}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export { ChatSidebar };
