import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingPage from "@/pages/LoadingPage";

/**
 * Protects routes that require authentication.
 * Redirects to /login if the user is not authenticated.
 */
export const ProtectedRoute: React.FC = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
