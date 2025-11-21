import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchUsersFieldProps {
  className?: string;
}

const SearchUsersField: React.FC<SearchUsersFieldProps> = ({ className }) => {
  const { getUsers } = useChatStore();

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    getUsers(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Input
      className={cn(
        "focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none",
        className
      )}
      type="text"
      placeholder="Search users..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export { SearchUsersField };
