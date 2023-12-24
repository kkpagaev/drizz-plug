import { FastifyInstance } from "fastify"
import fastifyPlugin from "fastify-plugin"
import { chatRoutes } from "./chat.routes"

export default fastifyPlugin(chatPlugin, {
  name: "chat",
  dependencies: ["ws"]
})
async function chatPlugin(fastify: FastifyInstance) {
  await fastify.register(chatRoutes, {
    prefix: "/chat"
  })
}
