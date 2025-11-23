import { ChatAvatar } from "@/components/ChatAvatar";
import { cn } from "@/lib/utils";

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
    {senderName && <ChatAvatar className="size-8" name={senderName} />}
    <div
      className={cn(
        "max-w-[70%] rounded-lg px-3",
        !senderName
          ? "bg-primary text-primary-foreground rounded-br-none py-3"
          : "rounded-bl-none"
      )}
    >
      <div>
        <span className="text-sm text-foreground/30">{senderName}</span>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

export { MessageBubble };
