import React from "react";

import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useChatStore } from "@/store/useChatStore";
import {
  createMessageSchema,
  type createMessageSchemaValues,
} from "@backend-schemas/message.schema";

const MessageInput: React.FC = () => {
  const { currentTab, sendMessage, sendChannelMessage } = useChatStore();
  const { register, handleSubmit, reset } = useForm<createMessageSchemaValues>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: createMessageSchemaValues) => {
    if (currentTab === "personal") sendMessage(data);
    else if (currentTab === "channels") sendChannelMessage(data);

    reset();
  };

  const onError = (errors: FieldErrors) => {
    // Check errors object and call Sonner toaster
    if (Object.keys(errors).length > 0) {
      toast.error("Invalid message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div className="flex items-center gap-3 border-t p-4">
        <Input
          {...register("text")}
          type="text"
          placeholder="Enter a message here"
          className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full cursor-pointer"
        >
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
};

export { MessageInput };
