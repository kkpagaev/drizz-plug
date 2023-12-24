import { z } from "zod"
import fastifyPlugin from "fastify-plugin"

export const ConfigSchema = z.object({
  dbUrl: z.string().default("postgres://user:user@localhost:7780/user")
})

export type Config = z.infer<typeof ConfigSchema>

export function getConfig() {
  return ConfigSchema.parse(process.env)
}

declare module "fastify" {
  interface FastifyInstance {
    config: Config
  }
}

export default fastifyPlugin(
  async (app) => {
    const config = getConfig()

    app.decorate("config", config)
  },
  {
    name: "config"
  }
)
