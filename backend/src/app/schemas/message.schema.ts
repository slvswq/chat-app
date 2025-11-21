import { z } from "zod";

export const createMessageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
});

export type createMessageSchemaValues = z.infer<typeof createMessageSchema>;
