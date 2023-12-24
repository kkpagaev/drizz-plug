import { FastifyInstance } from "fastify"
import { AccountService } from "./account.service"
import fastifyPlugin from "fastify-plugin"
import { accountRoutes } from "./account.routes"
import { ZodTypeProvider } from "fastify-type-provider-zod"

declare module "fastify" {
  interface FastifyInstance {
    accountService: AccountService
  }
}

// module
export default fastifyPlugin(
  async (app: FastifyInstance) => {
    const userService = app.userService

    const svc = new AccountService(app.db, userService)

    app.decorate("accountService", svc, ["db", "userService"])

    accountRoutes(app.withTypeProvider<ZodTypeProvider>())
  },
  {
    dependencies: ["user"]
  }
)
