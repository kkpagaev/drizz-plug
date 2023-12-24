import { z } from "zod"

export const LoginAccountSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
