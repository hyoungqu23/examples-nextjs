import { z } from "zod";

export const zUser = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  profile: z
    .object({
      avatarUrl: z.string().optional(),
    })
    .optional(),
});

export const zUsers = z.array(zUser);
