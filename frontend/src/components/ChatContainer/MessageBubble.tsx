import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isUserMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUserMessage,
}) => (
  <div
    className={cn("flex items-start gap-3", isUserMessage ? "justify-end" : "")}
  >
    {!isUserMessage && (
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )}
    <div
      className={cn(
        "max-w-[70%] rounded-lg p-3",
        isUserMessage
          ? "bg-primary text-primary-foreground rounded-br-none"
          : "rounded-bl-none"
      )}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export { MessageBubble };
