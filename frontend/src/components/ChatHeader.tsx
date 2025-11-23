import React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { SidebarTrigger } from "./ui/sidebar";
import { DropdownChannelMenu } from "./DropdownChannelMenu";
import { ChatAvatar } from "./ChatAvatar";

const ChatHeader: React.FC = () => {
  const { currentTab, selectedUser, selectedChannel } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center justify-start gap-5 border-b p-4 h-17">
      <SidebarTrigger className="md:hidden" />
      {currentTab === "personal" && selectedUser && (
        <div className="flex items-center gap-3">
          <ChatAvatar className="size-10" name={selectedUser?.fullName} />
          <div>
            <h2 className="font-semibold">{selectedUser?.fullName}</h2>
            <p
              className={cn(
                "text-muted-foreground text-sm",
                onlineUsers?.includes(selectedUser._id) && "text-green-600"
              )}
            >
              {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      )}
      {currentTab === "channels" && selectedChannel && (
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center gap-3">
            <ChatAvatar
              className="size-10 hidden sm:block"
              name={selectedChannel.name}
            />
            <div>
              <h2 className="font-semibold truncate max-w-35 sm:max-w-60 md:max-w-100">
                {selectedChannel?.name}
              </h2>
              <p className={cn("text-muted-foreground text-sm")}>
                {selectedChannel.members.length}{" "}
                {selectedChannel.members.length > 1 ? "members" : "member"}
              </p>
            </div>
          </Link>
          {selectedChannel.creator === authUser?._id && <DropdownChannelMenu />}
        </div>
      )}
    </div>
  );
};

export { ChatHeader };
