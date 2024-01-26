import { z } from "zod";

export const NewAdSchema = z.object({
  billboardId: z.string().optional(),
  imageUrl: z.string().optional(),
  sellerId: z.string().optional(),
});

export type NewAdType = z.infer<typeof NewAdSchema>;
