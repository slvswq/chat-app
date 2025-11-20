import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatContactProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

/**
 * `ChatContact` represents a single contact in a chat list.
 * It displays the user's avatar, name, and highlights if the contact is active.
 * Clicking the contact triggers a callback with the user's ID.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique ID of the contact
 * @param {string} props.name - Name of the contact
 * @param {boolean} props.isActive - Whether the contact is currently active/selected
 * @param {(id: string) => void} props.onClick - Callback fired when the contact is clicked, receives the contact's ID
 *
 * @example
 * // Basic usage
 * <ChatContact
 *   id="123"
 *   name="John Doe"
 *   isActive={false}
 *   onClick={(id) => console.log("Clicked contact ID:", id)}
 * />
 *
 */
const ChatContact: React.FC<ChatContactProps> = ({
  id,
  name,
  isActive,
  onClick,
}) => (
  <div
    className={cn(
      "hover:bg-muted flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors",
      isActive && "bg-muted"
    )}
    onClick={() => onClick(id)}
  >
    <Avatar>
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
      </div>
    </div>
  </div>
);

export { ChatContact };
