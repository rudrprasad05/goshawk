import { z } from "zod";

export const SignInForm = z.object({
  email: z
    .string()
    .email("This is not a valid email.")
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
});
//   .refine(
//     (values) => {
//       return values.password === values.confirmPassword;
//     },
//     {
//       message: "Passwords must match!",
//       path: ["confirmPassword"],
//     }
//   );

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Enter a Valid Email" }),
    name: z
      .string()
      .min(2, { message: "Should have more than 2 characters" })
      .max(50, { message: "Should have less than 50 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must contain more than 2 characters" })
      .max(32, { message: "Password must have less than 2 characters" }),
    confirmPassword: z.string(),
    role: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Password doesn't match",
//   path: ["confirmpassword"],
// });

export const SellerRegisterFormSchema = z.object({
  userId: z.string().optional(),
  companyName: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" })
    .optional(),
  address: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" })
    .optional(),
  city: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" })
    .optional(),
  country: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" })
    .optional(),
  phone: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" })
    .optional(),
  plan: z.string().optional(),
  image: z.string().optional(),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type SellerRegisterType = z.infer<typeof SellerRegisterFormSchema>;
export type SignInFormType = z.infer<typeof SignInForm>;
