import { z } from "zod"

export const SignupSchema = z.object({
  username: z.email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(6).max(40)
})

export const SigninSchema = z.object({
  username: z.email(),
  password: z.string()
})

export const UpdateUserSchema = z.object({
  firstname: z.string().min(1).optional(),
  lastname: z.string().min(1).optional(),
  password: z.string().min(6).optional()
}).refine(data => Object.keys(data).length > 0, {
  message: "at least one field must be provided"
})

export const TransferSchema = z.object({
  to: z.string().min(1, "recipient userId is required"),
  amount: z.number().positive("amount must be positive")
})
