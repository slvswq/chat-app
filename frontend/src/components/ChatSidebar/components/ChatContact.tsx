import type React from "react";

import { cn } from "@/lib/utils";
import { ChatAvatar } from "@/components/ChatAvatar";

interface ChatContactProps {
  fullName: string;
  isActive: boolean;
  isOnline?: boolean;
  onClick: () => void;
}

/**
 * `ChatContact` represents a single contact in a chat list.
 * It displays the user's avatar, name, and highlights if the contact is active.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the contact
 * @param {boolean} props.isActive - Whether the contact is currently active/selected
 * @param {boolean} props.isActive - Whether the contact is online/offline
 * @param {() => void} props.onClick - Callback fired when the contact is clicked
 *
 * @example
 * // Basic usage
 * <ChatContact
 *   id="123"
 *   name="John Doe"
 *   isActive={false}
 *   onClick={() => console.log("Contact is clicked!")}
 * />
 *
 */
const ChatContact: React.FC<ChatContactProps> = ({
  fullName,
  isActive,
  isOnline,
  onClick,
}) => (
  <div
    className={cn(
      "hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors",
      isActive && "bg-muted"
    )}
    onClick={() => onClick()}
  >
    <ChatAvatar className="size-10" name={fullName} />

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="truncate font-medium max-w-45">{fullName}</span>
      </div>
      <p
        className={cn(
          "truncate text-muted-foreground text-sm",
          isOnline && "text-green-600"
        )}
      >
        {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  </div>
);

export { ChatContact };
