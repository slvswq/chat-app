import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    label: "Personal",
    value: "personal",
    icon: User,
  },
  {
    label: "Channels",
    value: "channels",
    icon: Users,
  },
];

/**
 * `ChatSidebarTabs` renders a tab switcher for the chat sidebar.
 * It allows users to toggle between "Personal" and "Channels" tabs.
 *
 * @param {string} [props.className] - Optional CSS classes to style the root container.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.rest] - Any additional props applied to the root div.
 *
 * @example
 * // Basic usage
 * <ChatSidebarTabs />
 *
 * @example
 * // With custom styling
 * <ChatSidebarTabs className="my-custom-class" />
 */
export const ChatSidebarTabs: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState<string>("personal");

  return (
    <div className={cn("flex rounded-lg border p-1", className)} {...rest}>
      {tabs.map((tab) => {
        const { label, value, icon: Icon } = tab;
        return (
          <Button
            key={value}
            variant="ghost"
            className={cn(
              "h-9 flex-1 rounded-md text-sm font-medium",
              activeTab === value
                ? "shadow-sm"
                : "text-muted-foreground hover:bg-transparent"
            )}
            onClick={() => setActiveTab(value)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        );
      })}
    </div>
  );
};
