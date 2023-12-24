import fastifyPlugin from "fastify-plugin"
import { CounterService } from "./counter.service"
import { FastifyInstance } from "fastify"
import { counterRoutes } from "./counter.routes"

declare module "fastify" {
  interface FastifyInstance {
    counterService: CounterService
  }
}
export default fastifyPlugin(counterPlugin, {
  name: "counter",
  dependencies: ["cache"]
})
async function counterPlugin(fastify: FastifyInstance) {
  const svc = new CounterService(fastify.cache)

  fastify.decorate("counterService", svc, ["cache"])

  await fastify.register(counterRoutes, {
    prefix: "/counter"
  })
}
