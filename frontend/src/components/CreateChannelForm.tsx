import React from "react";
import { cn } from "@/lib/utils";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useChatStore } from "@/store/useChatStore";
import { FormField } from "./FormField";
import { UserSelectionList } from "./UserSelectionList";
import { SubmitButton } from "./SubmitButton";
import {
  channelSchema,
  type channelSchemaValues,
} from "@backend-schemas/channel.schema";
import { getInitials } from "@/utils/stringUtils";

const fields = [{ id: "name", type: "text", label: "Channel Name" }] as const;

/**
 * Renders create-channel-form with name field, list of users, and the channel's avatar.
 * Uses Zod for schema validation and react-hook-form for form handling.
 *
 * @param props.className - Optional CSS classes to style the root container.
 * @param props.rest - Any additional props applied to the root div.
 *
 * @example
 * <CreateChannelForm className="max-w-md mx-auto" />
 */
function CreateChannelForm({
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const { createChannel, isChannelCreating } = useChatStore();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<channelSchemaValues>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "My Channel",
      members: [],
    },
  });

  const name = watch("name");

  const onSubmit = (data: channelSchemaValues) => {
    createChannel(data);
  };

  const onError = (errors: FieldErrors) => {
    // Check errors object and call Sonner toaster
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...rest}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create a New Channel</CardTitle>
          <CardDescription>
            Set up a new channel by providing its name and selecting members.
            Channels help organize conversations and allow groups of users to
            chat together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pb-6 border-b mb-6">
            <Avatar className="mx-auto size-20 text-2xl font-semibold">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <FieldGroup>
              {fields.map((field) => (
                <FormField
                  key={field.id}
                  {...register(field.id)}
                  {...field}
                  error={errors[field.id]?.message}
                />
              ))}
              <UserSelectionList
                selectedMembers={watch("members") || []}
                setSelectedMembers={(value: string[]) =>
                  setValue("members", value, { shouldValidate: true })
                }
              />

              <SubmitButton isSubmitting={isChannelCreating}>
                Create channel
              </SubmitButton>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { CreateChannelForm };
