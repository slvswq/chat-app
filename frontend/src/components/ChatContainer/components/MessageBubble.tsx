import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/stringUtils";

interface MessageBubbleProps {
  senderName?: string;
  message: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  senderName,
  message,
}) => (
  <div
    className={cn("flex items-start gap-3", !senderName ? "justify-end" : "")}
  >
    {senderName && (
      <Avatar className="h-8 w-8">
        <AvatarFallback>{getInitials(senderName)}</AvatarFallback>
      </Avatar>
    )}
    <div
      className={cn(
        "max-w-[70%] rounded-lg p-3",
        !senderName
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "rounded-bl-none"
      )}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export { MessageBubble };
