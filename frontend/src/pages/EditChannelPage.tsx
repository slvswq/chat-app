import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { EditChannelForm } from "@/components/EditChannelForm";
import { useChatStore } from "@/store/useChatStore";

const EditChannelPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedChannel } = useChatStore();

  const { setCurrentTab } = useChatStore();

  useEffect(() => {
    setCurrentTab("channels");
    if (!selectedChannel) navigate("/");
  }, [selectedChannel, setCurrentTab]);

  return selectedChannel ? (
    <div className="w-full flex-1 bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <EditChannelForm />
      </div>
    </div>
  ) : null;
};

export default EditChannelPage;
