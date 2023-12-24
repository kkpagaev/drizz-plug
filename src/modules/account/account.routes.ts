import { App } from "../../build"
import { CreateAccountSchema } from "./schemas/create-account.schema"

export const accountRoutes = async (app: App) => {
  const accountService = app.accountService

  app.post(
    "/register",
    {
      schema: {
        body: CreateAccountSchema
      }
    },
    ({ body }, res) => {
      const account = accountService.register(body)

      return res.status(201).send(account)
    }
  )
}
