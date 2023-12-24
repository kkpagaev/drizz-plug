import { z } from "zod"
import fastifyPlugin from "fastify-plugin"
import * as dotenv from "dotenv"

export const ConfigSchema = z.object({
  DB_URL: z.string().default("postgres://user:user@localhost:7780/user"),
  JWT_SECRET: z.string().default("secret")
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
    dotenv.config()

    const config = getConfig()

    app.decorate("config", config)
  },
  {
    name: "config"
  }
)
