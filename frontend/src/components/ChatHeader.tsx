import React from "react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/stringUtils";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { SidebarTrigger } from "./ui/sidebar";

const ChatHeader: React.FC = () => {
  const { currentTab, selectedUser, selectedChannel } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center justify-start gap-5 border-b p-4 h-17">
      <SidebarTrigger className="md:hidden" />
      {currentTab === "personal" && selectedUser && (
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>
              {getInitials(selectedUser.fullName || "")}
            </AvatarFallback>
          </Avatar>
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
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>
              {getInitials(selectedChannel.name || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedChannel?.name}</h2>
            <p className={cn("text-muted-foreground text-sm")}>
              {selectedChannel.members.length}{" "}
              {selectedChannel.members.length > 1 ? "members" : "member"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { ChatHeader };
