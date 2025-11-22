import { z } from "zod";
import { objectIdSchema } from "./objectId.schema";

export const channelSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  members: z.array(objectIdSchema),
});

export type channelSchemaValues = z.infer<typeof channelSchema>;
