import { AccountService } from "./account.service"
import fastifyPlugin from "fastify-plugin"
import { accountRoutes } from "./account.routes"

declare module "fastify" {
  interface FastifyInstance {
    accountService: AccountService
  }
}

// module
export default fastifyPlugin(
  async (app) => {
    const userService = app.userService

    const svc = new AccountService(app.db, userService)

    app.decorate("accountService", svc, ["db", "userService"])

    await app.register(accountRoutes, {
      prefix: "/account"
    })
  },
  {
    name: "account",
    dependencies: ["user"]
  }
)
