import React from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
