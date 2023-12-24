import fastifyPlugin from "fastify-plugin"
import { createClient } from "redis"
import { FastifyInstance } from "fastify"

export type Redis = ReturnType<typeof createClient>

declare module "fastify" {
  interface FastifyInstance {
    cache: Redis
  }
}

export default fastifyPlugin(cachePlugin, {
  name: "cache",
  dependencies: ["config"]
})

async function cachePlugin(app: FastifyInstance) {
  const redisUrl = app.config.REDIS_URL

  const redis = createClient({
    url: redisUrl
  })

  await redis.connect()

  app.decorate("cache", redis)

  app.addHook("onClose", async (app) => {
    await app.cache.disconnect()
  })
}
