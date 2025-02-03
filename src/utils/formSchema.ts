import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z.string().min(2, {
    message: "Please input password",
  }),
});

export const userSchema = z.object({
  name: z.string().min(5, {
    message: "Please input name",
  }),
  email: z.string().email({
    message: "Invalid email format",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Please input phone number",
    })
    .max(12, {
      message: "Invalid phone number format",
    }),
});

export const passwordSchema = z
  .object({
    oldPass: z.string().min(5, {
      message: "Please input password",
    }),
    newPass: z.string().min(8, {
      message: "Minimum 8 characters",
    }),
    rePass: z.string().min(8, {
      message: "Minimum 8 characters",
    }),
  })
  .refine((data) => data.newPass === data.rePass, {
    message: "Passwords don't match",
    path: ["rePass"],
  });
