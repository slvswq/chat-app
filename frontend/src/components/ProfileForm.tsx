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

import { useAuthStore } from "@/store/useAuthStore";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import {
  updateUserSchema,
  type updateUserSchemaValues,
} from "@backend-schemas/user.schema";
import { ChatAvatar } from "./ChatAvatar";

const fields = [{ id: "fullName", type: "text", label: "Full Name" }] as const;

/**
 * Renders the user's avatar with their initials and a profile form with fullName and email (disabled) fields.
 * Uses Zod for schema validation and react-hook-form for form handling.
 *
 * @param props.className - Optional CSS classes to style the root container.
 * @param props.rest - Any additional props applied to the root div.
 *
 * @example
 * <ProfileForm className="max-w-md mx-auto" />
 */
function ProfileForm({ className, ...rest }: React.ComponentProps<"div">) {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUserSchemaValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: authUser?.fullName,
    },
  });

  const fullName = watch("fullName");

  const onSubmit = (data: updateUserSchemaValues) => {
    updateProfile(data);
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
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>
            Manage your personal details and profile information. This
            information will be visible to other users on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pb-6 border-b mb-6">
            <ChatAvatar
              className="mx-auto size-20 text-2xl font-semibold"
              name={fullName}
            />
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

              <FormField
                id="email"
                type="email"
                label="Email"
                value={authUser?.email}
                disabled
              />

              <SubmitButton isSubmitting={isUpdatingProfile}>
                Update profile
              </SubmitButton>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { ProfileForm };
