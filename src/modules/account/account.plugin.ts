import { AccountService } from "./account.service"
import fastifyPlugin from "fastify-plugin"
import { accountRoutes } from "./account.routes"
import { FastifyInstance } from "fastify"

declare module "fastify" {
  interface FastifyInstance {
    accountService: AccountService
  }
}

// module
export default fastifyPlugin(accountPlugin, {
  name: "account",
  dependencies: ["user"]
})

async function accountPlugin(app: FastifyInstance) {
  const userService = app.userService

  const svc = new AccountService(app.db, userService)

  app.decorate("accountService", svc, ["db", "userService"])

  await app.register(accountRoutes, {
    prefix: "/account"
  })
}
