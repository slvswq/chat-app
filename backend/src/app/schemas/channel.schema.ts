import { z } from "zod";
import { objectIdSchema } from "./objectId.schema";

export const channelInfoSchema = z.object({
  name: z.string().min(1, "Channel name is required"),
});

export const createChannelSchema = channelInfoSchema.safeExtend({
  members: z.array(objectIdSchema).optional(),
});

export const addChannelMembersSchema = z.object({
  members: z.array(objectIdSchema),
});

export type channelInfoSchemaValues = z.infer<typeof channelInfoSchema>;
export type createChannelSchemaValues = z.infer<typeof createChannelSchema>;
export type addChannelMembersSchemaValues = z.infer<
  typeof addChannelMembersSchema
>;
