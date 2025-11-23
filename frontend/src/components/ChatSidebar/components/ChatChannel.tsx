import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/stringUtils";

interface ChatChannelProps {
  name: string;
  isActive: boolean;
  amountOfMembers: number;
  onClick: () => void;
}

/**
 * `ChatChannel` represents a single channel in a chat list.
 * It displays the channel's avatar, name, and the amount of members.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the channel
 * @param {boolean} props.isActive - Whether the channel is currently active/selected
 * @param {number} props.amountOfMembers - the amount of channel's members
 * @param {() => void} props.onClick - Callback fired when the channel is clicked
 *
 * @example
 * // Basic usage
 * <ChatChannel
 *   name="Friends"
 *   isActive={false}
 *   amountOfMembers={10}
 *   onClick={() => console.log("Channel is clicked!")}
 * />
 *
 */
const ChatChannel: React.FC<ChatChannelProps> = ({
  name,
  isActive,
  amountOfMembers,
  onClick,
}) => (
  <div
    className={cn(
      "hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors",
      isActive && "bg-muted"
    )}
    onClick={() => onClick()}
  >
    <Avatar className="size-10">
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="truncate font-medium max-w-45">{name}</span>
      </div>
      <p className="truncate text-muted-foreground text-sm">
        {amountOfMembers} {amountOfMembers > 1 ? "members" : "member"}
      </p>
    </div>
  </div>
);

export { ChatChannel };
