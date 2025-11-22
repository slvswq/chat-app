import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchChannelsFieldProps {
  className?: string;
}

const SearchChannelsField: React.FC<SearchChannelsFieldProps> = ({
  className,
}) => {
  const { getChannels } = useChatStore();

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    getChannels(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Input
      className={cn(
        "focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none",
        className
      )}
      type="text"
      placeholder="Search channels..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export { SearchChannelsField };
