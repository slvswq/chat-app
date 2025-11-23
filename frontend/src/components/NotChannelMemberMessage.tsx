import React from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Frown } from "lucide-react";

const NotChannelMemberMessage: React.FC = () => {
  return (
    <Empty className="h-full bg-muted rounded-none">
      <EmptyHeader>
        <EmptyMedia className="mb-6" variant="icon">
          <Frown className="size-12" />
        </EmptyMedia>
        <EmptyTitle className="text-2xl">Access Restricted</EmptyTitle>
        <EmptyDescription>
          You’re not a member of this channel. Contact the channel’s creator if
          you need access.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
};

export { NotChannelMemberMessage };
