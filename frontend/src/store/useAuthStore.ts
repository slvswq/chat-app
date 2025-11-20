import axios from "axios";
import { create } from "zustand";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/user";
import {
  type baseUserSchemaValues,
  type createUserSchemaValues,
  type updateUserSchemaValues,
} from "@backend-schemas/user.schema";

interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLogingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
  signup: (data: createUserSchemaValues) => void;
  login: (data: baseUserSchemaValues) => void;
  logout: () => void;
  updateProfile: (data: updateUserSchemaValues) => void;
}

/**
 * Global authentication store powered by Zustand.
 *
 * This store centralizes all authentication-related state and actions
 * used across the application.
 *
 * ## State
 * - `authUser`: The currently authenticated user or `null` if no session exists.
 * - `isSigningUp`: Indicates whether a signup request is in progress.
 * - `isLogingIn`: Indicates whether a login request is in progress.
 * - `isUpdatingProfile`: Indicates whether the profile update is in progress.
 * - `isCheckingAuth`: Indicates whether the initial session validation is running.
 *
 * ## Actions
 *
 * ### checkAuth()
 * Sends a request to `/users/me` to determine whether the user
 * is already authenticated. Updates `authUser` accordingly and
 * disables the `isCheckingAuth` flag when finished.
 *
 * ### signup(data)
 * Registers a new user using the provided form data.
 * On success, updates `authUser` and shows a success toast.
 * On failure, displays an appropriate error toast.
 *
 * **Parameters:**
 * - `data` — User registration data validated by `createUserSchema`.
 *
 * ### login(data)
 * Logs in a new user using the provided form data.
 * On success, updates `authUser` and shows a success toast.
 * On failure, displays an appropriate error toast.
 *
 * **Parameters:**
 * - `data` — User login data validated by `baseUserSchema`.
 *
 * ### updateProfile(data)
 * Updates user's data in the DB using the provided form data.
 * On success, updates `authUser` and shows a success toast.
 * On failure, displays an appropriate error toast.
 *
 * **Parameters:**
 * - `data` — User login data validated by `baseUserSchema`.
 *
 * ### logout()
 * Calls the backend logout endpoint and clears the authenticated user.
 * Shows a toast indicating success or error.
 *
 * ## Usage
 * Use this hook anywhere in the application to access authentication state:
 *
 * ```tsx
 * const { authUser, signup, logout, isSigningUp } = useAuthStore();
 * ```
 */
export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/me");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: createUserSchemaValues) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("Error in signup: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: baseUserSchemaValues) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error in login: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error in logout: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  },

  updateProfile: async (data: updateUserSchemaValues) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
