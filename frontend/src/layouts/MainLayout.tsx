import React from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as any
      }
    >
      <div className="flex h-screen w-full">
        <ChatSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
