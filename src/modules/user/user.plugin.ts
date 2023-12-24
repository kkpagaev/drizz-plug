import { FastifyInstance } from "fastify"
import { UserService } from "./user.service"
import fastifyPlugin from "fastify-plugin"
import { userRoutes } from "./user.routes"

declare module "fastify" {
  interface FastifyInstance {
    userService: UserService
  }
}

export default fastifyPlugin(
  async (app: FastifyInstance) => {
    const svc = new UserService(app.db)

    app.decorate("userService", svc, ["db"])

    await app.register(userRoutes, {
      prefix: "/user"
    })
  },
  {
    name: "user"
  }
)
