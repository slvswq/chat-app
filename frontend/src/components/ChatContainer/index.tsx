import React from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";

const messages = [
  {
    id: "m1",
    sender: "other",
    content:
      "I think you should go for it. You're more than capable and it sounds like a great opportunity for growth.",
  },
  {
    id: "m2",
    sender: "user",
    content:
      "It's a bigger company and a more challenging role. I'm worried it might be too much to handle.",
  },
  {
    id: "m3",
    sender: "user",
    content:
      "Thanks, Mark. I needed that encouragement. I'll start working on my application tonight.",
  },
  {
    id: "m4",
    sender: "other",
    content:
      "Anytime! Let me know if you need any help with your resume or cover letter.",
  },
  {
    id: "m5",
    sender: "user",
    content: "Will do. Appreciate it!",
  },
];

const ChatContainer: React.FC = () => {
  return (
    <>
      <div className="flex-1 space-y-4 overflow-y-auto p-6 flex flex-col justify-end">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.content}
            isUserMessage={msg.sender === "user"}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 border-t p-4">
        <Input
          placeholder="Enter a message here"
          className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" className="rounded-full cursor-pointer">
          <ArrowRight />
        </Button>
      </div>
    </>
  );
};

export { ChatContainer };
