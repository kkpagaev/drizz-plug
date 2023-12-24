import Fastify from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { appPlugin } from "./app.plugin"

export async function build() {
  const app = Fastify({})

  await app.register(appPlugin)
  app.printRoutes()

  return app.withTypeProvider<ZodTypeProvider>()
}

export type App = Awaited<ReturnType<typeof build>>
