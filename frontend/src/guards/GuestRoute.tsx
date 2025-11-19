import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingPage from "@/pages/LoadingPage";

/**
 * Protects routes for unauthenticated users (guest pages).
 * Redirects authenticated users to the home page.
 */
export const GuestRoute: React.FC = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
