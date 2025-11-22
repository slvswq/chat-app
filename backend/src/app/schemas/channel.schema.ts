import { z } from "zod";
import { objectIdSchema } from "./objectId.schema";

export const channelSchema = z.object({
  name: z.string().min(1, "Channel name is required"),
  members: z.array(objectIdSchema).optional(),
});

export type channelSchemaValues = z.infer<typeof channelSchema>;
