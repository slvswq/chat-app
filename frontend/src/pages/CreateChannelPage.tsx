import React from "react";

import { CreateChannelForm } from "@/components/CreateChannelForm";

const CreateChannelPage: React.FC = () => {
  return (
    <div className="w-full flex-1 bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <CreateChannelForm />
      </div>
    </div>
  );
};

export default CreateChannelPage;
