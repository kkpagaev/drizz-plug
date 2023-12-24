import { App } from "../../build"
import { CreateUserSchema } from "./schemas/create-user.schema"

export const userRoutes = (app: App) => {
  const userService = app.userService!

  app.post(
    "/",
    {
      schema: {
        body: CreateUserSchema
      }
    },
    async (req, res) => {
      const body = req.body

      const user = await userService.create(body)

      return res.status(201).send(user)
    }
  )
}
