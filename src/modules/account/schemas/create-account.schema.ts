import { z } from "zod"
import { CreateUserSchema } from "../../user/schemas/create-user.schema"

// DTO
export const CreateAccountSchema = CreateUserSchema.and(
  z.object({
    email: z.string(),
    password: z.string()
  })
)
