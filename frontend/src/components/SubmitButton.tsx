import React from "react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SubmitButtonProps {
  isSubmitting?: boolean;
  children?: React.ReactNode;
}

/**
 * SubmitButton
 *
 * A button component for forms that handles a loading state.
 *
 * @param props.isSubmitting - If true, disables the button and shows a spinner and "Loading..." text.
 * @param props.children - The button label or content.
 *
 * @example
 * <SubmitButton isSubmitting={true}>Submit</SubmitButton>
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  children,
}) => {
  return (
    <Field>
      <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
    </Field>
  );
};

export { SubmitButton };
