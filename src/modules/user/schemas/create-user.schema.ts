import { z } from "zod"

export const CreateUserSchema = z.object({
  fullName: z.string(),
  username: z.string()
})
