import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRoundPen, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";

/**
 * `NavUser` is a navigation component for user-related actions.
 * It provides buttons for creating a new chat, logging out, and editing the user's profile.
 *
 * @param {string} [props.className] - Optional CSS classes to style the root container.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props.rest] - Any additional props applied to the root div.
 *
 * @example
 * // Basic usage
 * <NavUser />
 *
 * @example
 * // With custom styling
 * <NavUser className="my-custom-class" />
 *
 * @remarks
 * - Uses `useAuthStore` for handling logout functionality.
 * - Uses `react-router-dom`'s `Link` for navigating to the profile page.
 */
export const NavUser: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...rest
}) => {
  const { logout } = useAuthStore();

  return (
    <div className={cn("space-y-3", className)} {...rest}>
      <div className="w-full border-t"></div>
      <div className="flex-1 w-full flex gap-2">
        <Button
          variant="link"
          className="text-left justify-start cursor-pointer"
          onClick={logout}
        >
          <LogOut />
          <span className="sr-only">Logout</span>
        </Button>
        <Button
          variant="link"
          className="flex-1 text-left justify-start cursor-pointer"
          asChild
        >
          <Link to="/profile">
            <UserRoundPen />
            Edit Profile
          </Link>
        </Button>
      </div>
    </div>
  );
};
