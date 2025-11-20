import React from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessagesSquare } from "lucide-react";

const NoChatSelected: React.FC = () => {
  return (
    <Empty className="h-full bg-muted">
      <EmptyHeader>
        <EmptyMedia className="mb-6" variant="icon">
          <MessagesSquare className="size-12" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl">Select a chat</EmptyTitle>
        <EmptyDescription>
          Select a conversation from the sidebar to start chatting
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
};

export { NoChatSelected };
