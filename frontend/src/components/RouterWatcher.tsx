import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useChatStore } from "@/store/useChatStore";

/**
 * Watches the current route and performs side effects when the route changes.
 * Specifically, it clears the selected user from the chat store
 * whenever the user navigates away from the home page (`/`).
 */
const RouteWatcher: React.FC = () => {
  const { pathname } = useLocation();
  const { setSelectedUser } = useChatStore();

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedUser(null);
    }
  }, [pathname, setSelectedUser]);

  return null; // This component doesn't render anything
};

export { RouteWatcher };
