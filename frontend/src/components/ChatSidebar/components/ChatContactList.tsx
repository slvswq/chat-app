import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChatContact } from "./ChatContact";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ChatListSkeleton } from "./skeletons/ChatListSkeleton";

const ChatContactList: React.FC = () => {
  const navigate = useNavigate();

  const { getUsers, users, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <ChatListSkeleton />;

  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {users.map((user) => (
        <ChatContact
          key={user._id}
          {...user}
          isActive={user._id === selectedUser?._id}
          isOnline={onlineUsers.includes(user._id)}
          onClick={() => {
            navigate("/");
            setSelectedUser(user);
          }}
        />
      ))}
    </div>
  );
};

export { ChatContactList };
