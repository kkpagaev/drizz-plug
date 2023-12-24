import fastifyAutoload from "@fastify/autoload"
import fastifyPlugin from "fastify-plugin"
import { join } from "path"

export const autoLoadPlugin = fastifyPlugin(async (app) => {
  await app.register(fastifyAutoload, {
    dir: join(__dirname, "plugins")
  })

  await app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    prefix: "/api",
    dirNameRoutePrefix: false,
    encapsulate: true,
    maxDepth: 1
  })
})
