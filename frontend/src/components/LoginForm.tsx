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
import { FieldDescription, FieldGroup } from "@/components/ui/field";

import { Link } from "react-router-dom";

import { useAuthStore } from "@/store/useAuthStore";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import {
  baseUserSchema,
  type baseUserSchemaValues,
} from "@backend-schemas/user.schema";

const fields = [
  {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "johndoe@example.com",
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    placeholder: "••••••••",
  },
] as const;

/**
 * Renders a login form with email and password fields.
 * Uses Zod for schema validation and react-hook-form for form handling.
 *
 * @param props.className - Optional CSS classes to style the root container.
 * @param props.rest - Any additional props applied to the root div.
 *
 * @example
 * <LoginForm className="max-w-md mx-auto" />
 */
function LoginForm({ className, ...rest }: React.ComponentProps<"div">) {
  const { login, isLogingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<baseUserSchemaValues>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: baseUserSchemaValues) => {
    login(data);
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
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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

              <SubmitButton isSubmitting={isLogingIn}>Login</SubmitButton>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { LoginForm };
