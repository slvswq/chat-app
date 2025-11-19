import React, { useState } from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";

interface FormFieldProps {
  /** Unique identifier for the input element */
  id: string;

  /** Optional label text displayed above the field */
  label?: string;

  /** Optional description displayed below the field (e.g. hint text) */
  description?: string;

  /** Input type (e.g. "text", "email", "password") */
  type: string;

  /** Placeholder text displayed inside the input */
  placeholder?: string;

  /** Whether the input is required */
  required?: boolean;

  /** Validation error message from react-hook-form */
  error?: string;

  /** Current input value (optional because RHF may supply it internally) */
  value?: string;
}

/**
 * A customizable form field component designed to integrate seamlessly
 * with React Hook Form.
 *
 * @param props.id - Unique identifier for the input element.
 * @param props.label - Optional label text displayed above the field.
 * @param props.description - Optional helper text displayed below the field.
 * @param props.type - Type of the input element (e.g., "text", "email", "password").
 * @param props.placeholder - Optional placeholder text inside the input.
 * @param props.required - Indicates whether the field is required.
 * @param props.error - Optional validation error message from React Hook Form.
 * @param props.value - Optional field value; may be controlled by React Hook Form.
 * @param props.rest - Any additional props applied to the input field.
 *
 * @example
 * <FormField
 *   key={field.id}
 *   {...register(field.id)}
 *   {...field}
 *   error={errors[field.id]?.message}
 * />
 */
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  description,
  type,
  placeholder,
  required,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={description || error ? `${id}-desc` : undefined}
          {...rest}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="link"
            className="absolute border-0 right-0"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4 opacity-50" />
            ) : (
              <Eye className="size-4 opacity-50" />
            )}
          </Button>
        )}
      </div>
      {(error || description) && (
        <FieldDescription
          id={`${id}-desc`}
          className={error ? "text-red-600" : ""}
        >
          {error ?? description}
        </FieldDescription>
      )}
    </Field>
  );
};

export { FormField };
