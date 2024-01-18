import { z } from "zod";

export const NewProductForm = z.object({
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  description: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(250, { message: "Should have less than 250 characters" }),
  price: z.string(),
  // tag: z.string(),
  imageUrl: z
    .string()
    .min(1, { message: "Press Upload before submitting the form" })
    .optional(),
  sellerId: z.string().optional(),
});
export const ProductSearchSchema = z.object({
  search: z
    .string()

    .max(20, { message: "max search length exceeded" }),
});

export type ProductSearchType = z.infer<typeof ProductSearchSchema>;
export type NewProductType = z.infer<typeof NewProductForm>;
