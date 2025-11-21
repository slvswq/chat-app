import axios from "axios";
import { create } from "zustand";
import { toast } from "sonner";
import type { User } from "@/types/user";
import type { Message } from "@/types/message";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";
import { type createMessageSchemaValues } from "@backend-schemas/message.schema";

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => void;
  getMessages: (userId: string) => void;
  sendMessage: (messageData: createMessageSchemaValues) => void;
  setSelectedUser: (selectedUser: User | null) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

/**
 * Global chat store powered by Zustand.
 *
 * This store centralizes all chat-related state and actions
 * used across the application.
 *
 * ## State
 * - `messages` — Array of messages for the currently selected user.
 * - `users` — List of all users in the chat system.
 * - `selectedUser` — Currently selected user or `null` if none is selected.
 * - `isUsersLoading` — Indicates whether the users list is being fetched.
 * - `isMessagesLoading` — Indicates whether messages for the selected user are being fetched.
 *
 * ## Actions
 *
 * ### getUsers()
 * Fetches all users from the backend API and updates `users`.
 * Sets `isUsersLoading` to `true` while fetching and `false` when done.
 * Shows an error toast if the request fails.
 *
 * ### getMessages(userId)
 * Fetches messages for a specific user from the backend API and updates `messages`.
 * Sets `isMessagesLoading` to `true` while fetching and `false` when done.
 * Shows an error toast if the request fails.
 *
 * ### setSelectedUser(user)
 * Adds new `Message` to the database with given data.
 *
 * **Parameters:**
 * - `messageData` — the data with message text, senderId, and receiverId.
 *
 * ### setSelectedUser(user)
 * Updates `selectedUser` with given user.
 *
 * **Parameters:**
 * - `userId` — The ID of the user whose messages should be fetched.
 *
 * ### subscribeToMessages()
 * Start listening to `newMessage` event using WebSockets and dynamically updates
 * the messages list with new messages.
 *
 * ### unsubscribeFromMessages()
 * Removes listener to `newMessage` event created by subscribeToMessages() function.
 *
 * ## Usage
 * Use this hook anywhere in the application to access chat state:
 *
 * ```tsx
 * const { users, messages, getUsers, getMessages, isUsersLoading } = useChatStore();
 *
 * useEffect(() => {
 *   getUsers();
 * }, []);
 *
 * const selectUser = (userId: string) => {
 *   getMessages(userId);
 * };
 * ```
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getUsers: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error in getMessages: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: createMessageSchemaValues) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in sendMessage: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
}));
