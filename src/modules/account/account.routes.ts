import { App } from "../../build"
import { CreateAccountSchema } from "./schemas/create-account.schema"
import { LoginAccountSchema } from "./schemas/login-account.chema"

export const accountRoutes = async (app: App) => {
  const accountService = app.accountService

  app.post(
    "/register",
    {
      schema: {
        body: CreateAccountSchema
      }
    },
    async ({ body }, res) => {
      const account = await accountService.register(body)

      return res.status(201).send(account)
    }
  )

  app.post(
    "/login",
    {
      schema: {
        body: LoginAccountSchema
      }
    },
    async ({ body }) => {
      const token = await accountService.login(body.email, body.password)

      return { token }
    }
  )
}
