import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/stringUtils";
import { FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { SearchUsersField } from "./SearchUsersField";
import { Spinner } from "./ui/spinner";

interface UserSelectionListProps {
  className?: string;
  selectedMembers: string[];
  setSelectedMembers: (members: string[]) => void;
}

/**
 * Renders a multi-select list of users with checkboxes.
 * Integrates with `react-hook-form`.
 *
 * Selected user IDs are added to `members: string[]`.
 */
export function UserSelectionList({
  className,
  selectedMembers,
  setSelectedMembers,
}: UserSelectionListProps) {
  const { users, getUsers, isUsersLoading } = useChatStore();

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const toggleMember = (id: string) => {
    if (!selectedMembers) return;

    const updated = selectedMembers.includes(id)
      ? selectedMembers.filter((m) => m !== id)
      : [...selectedMembers, id];

    setSelectedMembers(updated);
  };

  return (
    <div className={className}>
      <FieldLabel className="font-medium mb-3">Select Members</FieldLabel>
      <SearchUsersField className="rounded-b-none" />

      <div className="flex flex-col border border-t-0 rounded-b-md p-4 h-40 overflow-y-auto">
        {isUsersLoading ? (
          <Spinner className="m-auto size-7" />
        ) : (
          users.map((user) => (
            <FieldLabel
              key={user._id}
              className="flex items-center gap-3 w-full py-3 cursor-pointer"
            >
              <Input
                type="checkbox"
                className="size-4"
                checked={selectedMembers?.includes(user._id)}
                onChange={() => toggleMember(user._id)}
              />

              <Avatar className="size-8">
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>

              <span>{user.fullName}</span>
            </FieldLabel>
          ))
        )}
      </div>
    </div>
  );
}
