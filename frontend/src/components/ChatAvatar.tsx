import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/stringUtils";

interface ChatAvatarProps {
  className?: string;
  name?: string;
  color?: string;
}

const ChatAvatar: React.FC<ChatAvatarProps> = ({ className, name, color }) => {
  return (
    <Avatar className={className}>
      <AvatarFallback className={color}>
        {getInitials(name || "")}
      </AvatarFallback>
    </Avatar>
  );
};

export { ChatAvatar };
