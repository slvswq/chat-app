import React from "react";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/stringUtils";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { SidebarTrigger } from "./ui/sidebar";

const ChatHeader: React.FC = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex items-center justify-start gap-5 border-b p-4 h-17">
      <SidebarTrigger className="md:hidden" />
      {selectedUser && (
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
    </div>
  );
};

export { ChatHeader };
