import { FastifyInstance } from "fastify"
import { UserService } from "./user.service"
import fastifyPlugin from "fastify-plugin"

declare module "fastify" {
  interface FastifyInstance {
    userService: UserService
  }
}

export default fastifyPlugin(
  async (app: FastifyInstance) => {
    const svc = new UserService(app.db)

    app.decorate("userService", svc, ["db"])
  },
  {
    name: "user",
    dependencies: ["db"]
  }
)
