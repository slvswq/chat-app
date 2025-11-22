import axios from "axios";
import { create } from "zustand";
import { toast } from "sonner";
import type { User } from "@/types/user";
import type { ChannelMessage, Message } from "@/types/message";
import type { Channel } from "@/types/channel";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";
import { type createMessageSchemaValues } from "@backend-schemas/message.schema";

interface ChatStore {
  currentTab: "personal" | "channels";

  users: User[];
  channels: Channel[];

  messages: Message[];
  selectedUser: User | null;

  channelMessages: ChannelMessage[];
  selectedChannel: Channel | null;

  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isChannelsLoading: boolean;
  isChannelMessagesLoading: boolean;

  setCurrentTab: (value: "personal" | "channels") => void;

  getUsers: (searchQuery?: string) => void;
  getMessages: (userId: string) => void;
  sendMessage: (messageData: createMessageSchemaValues) => void;
  setSelectedUser: (selectedUser: User | null) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;

  getChannels: (searchQuery?: string) => void;
  sendChannelMessage: (messageData: createMessageSchemaValues) => void;
  setSelectedChannel: (selectedChannel: Channel | null) => void;
}

/**
 * Global chat store powered by Zustand.
 *
 * This store centralizes all chat-related state and actions
 * used across the application. It manages both personal chats
 * and channel-based messaging.
 *
 * ## State
 * - `currentTab` — Controls whether the user is viewing personal chats or channels.
 *
 * ### Personal chat state
 * - `users` — List of users available for private messaging.
 * - `messages` — Messages for the currently selected user.
 * - `selectedUser` — The active user in a personal chat, or `null`.
 *
 * ### Channel chat state
 * - `channels` — List of all available channels.
 * - `channelMessages` — Messages for the currently selected channel.
 * - `selectedChannel` — The active channel, or `null`.
 *
 * ### Loading states
 * - `isUsersLoading` — Indicates whether users are currently being fetched.
 * - `isMessagesLoading` — Indicates whether private messages are being fetched.
 * - `isChannelsLoading` — Indicates whether channels are being fetched.
 * - `isChannelMessagesLoading` — Indicates whether channel messages are being fetched.
 *
 * ## Actions
 *
 * ### setCurrentTab(value)
 * Switches between the "personal" and "channels" views.
 *
 * **Parameters:**
 * - `value` — `"personal"` or `"channels"`.
 *
 * ---
 *
 * ### getUsers(searchQuery?)
 * Fetches all users, or filters by `fullName` using an optional search query.
 * Updates `users` and handles loading & error states.
 *
 * **Parameters:**
 * - `searchQuery` — optional string for filtering users.
 *
 * ---
 *
 * ### getMessages(userId)
 * Fetches all messages exchanged with the given user.
 * Updates `messages`.
 *
 * **Parameters:**
 * - `userId` — ID of the user whose messages should be fetched.
 *
 * ---
 *
 * ### sendMessage(messageData)
 * Sends a personal message to the currently selected user.
 *
 * **Parameters:**
 * - `messageData` — message payload (text, senderId, receiverId, etc.).
 *
 * ---
 *
 * ### setSelectedUser(user)
 * Selects a user for personal messaging.
 *
 * **Parameters:**
 * - `user` — `User` object or `null`.
 *
 * ---
 *
 * ### subscribeToMessages()
 * Subscribes to the `newMessage` WebSocket event.
 * Updates the message list dynamically when new messages arrive.
 *
 * ---
 *
 * ### unsubscribeFromMessages()
 * Removes the WebSocket event listener created by `subscribeToMessages()`.
 *
 * ---
 *
 * ### getChannels(searchQuery?)
 * Fetches channels from the backend or filters them by name.
 *
 * **Parameters:**
 * - `searchQuery` — optional text used to filter channel names.
 *
 * ---
 *
 * ### getChannelMessages(channelId)
 * Fetches all messages for a given channel.
 * Updates `channelMessages`.
 *
 * **Parameters:**
 * - `channelId` — ID of the channel whose messages should be fetched.
 *
 * ---
 *
 * ### sendChannelMessage(messageData)
 * Sends a new message to the selected channel.
 *
 * **Parameters:**
 * - `messageData` — channel message payload.
 *
 * ---
 *
 * ### setSelectedChannel(channel)
 * Selects a channel for viewing or messaging.
 *
 * **Parameters:**
 * - `channel` — `Channel` object or `null`.
 *
 *
 * ## Usage
 *
 * ```tsx
 * const {
 *   users,
 *   messages,
 *   getUsers,
 *   getMessages,
 *   isUsersLoading
 * } = useChatStore();
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
  currentTab: "personal",

  users: [],
  channels: [],

  messages: [],
  selectedUser: null,

  channelMessages: [],
  selectedChannel: null,

  isUsersLoading: false,
  isMessagesLoading: false,
  isChannelsLoading: false,
  isChannelMessagesLoading: false,

  setCurrentTab: (value: "personal" | "channels") => set({ currentTab: value }),

  getUsers: async (searchQuery?: string) => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(`/users?search=${searchQuery ?? ""}`);
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

  getChannels: async (searchQuery?: string) => {
    set({ isChannelsLoading: true });
    try {
      const res = await axiosInstance.get(
        `/channels?search=${searchQuery ?? ""}`
      );
      set({ channels: res.data });
    } catch (error) {
      console.log("Error in getChannels: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isChannelsLoading: false });
    }
  },

  getChannelMessages: async (channelId: string) => {
    set({ isChannelMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${channelId}`);
      set({ channelMessages: res.data });
    } catch (error) {
      console.log("Error in getChannelMessages: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      set({ isChannelMessagesLoading: false });
    }
  },

  sendChannelMessage: async (messageData: createMessageSchemaValues) => {
    const { selectedChannel, channelMessages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/channel/${selectedChannel?._id}`,
        messageData
      );
      set({ messages: [...channelMessages, res.data] });
    } catch (error) {
      console.log("Error in sendChannelMessage: ", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  },

  setSelectedChannel: (selectedChannel: Channel | null) => {
    set({ selectedChannel });
  },
}));
