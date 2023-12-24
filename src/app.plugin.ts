import { FastifyPluginAsync } from "fastify"
import fastifyPlugin from "fastify-plugin"
import {
  validatorCompiler,
  serializerCompiler
} from "fastify-type-provider-zod"

export const appPlugin: FastifyPluginAsync = fastifyPlugin(async (app) => {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
})
