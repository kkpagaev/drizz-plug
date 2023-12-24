import { FastifyInstance } from "fastify"
import fastifyPlugin from "fastify-plugin"
import { JwtService } from "./jwt.service"

declare module "fastify" {
  interface FastifyInstance {
    jwtService: JwtService
  }
}

export default fastifyPlugin(jwtPlugin, {
  name: "jwt",
  dependencies: ["config"]
})
async function jwtPlugin(fastify: FastifyInstance) {
  const config = fastify.config
  const jwtService = new JwtService(config.JWT_SECRET)

  fastify.decorate("jwtService", jwtService)
}
