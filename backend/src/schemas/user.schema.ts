import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(70, "Name cannot exceed 70 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});
