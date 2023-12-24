import { FastifyPluginAsync } from "fastify"
import {
  validatorCompiler,
  serializerCompiler
} from "fastify-type-provider-zod"
import { join } from "path"
import fastifyAutoload from "@fastify/autoload"

export const appPlugin: FastifyPluginAsync = async (app) => {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await app.register(fastifyAutoload, {
    dir: join(__dirname, "plugins")
  })

  await app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    maxDepth: 1
  })
}
