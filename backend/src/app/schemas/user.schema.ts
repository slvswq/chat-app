import { z } from "zod";

export const baseUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string(),
});

export const createUserSchema = baseUserSchema.safeExtend({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(70, "Name cannot exceed 70 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(70, "Name cannot exceed 70 characters"),
  profilePic: z.base64(),
});
