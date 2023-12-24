import fastifyPlugin from "fastify-plugin"
import { FastifyInstance } from "fastify"
import { JwtPayload } from "jsonwebtoken"

declare module "fastify" {
  interface FastifyRequest {
    isUserLoaded: boolean
    user: JwtPayload
    // returns user or throws
    authenticated: () => Promise<JwtPayload>
  }
}
export default fastifyPlugin(isAuthenticatedPlugin, {
  name: "auth",
  dependencies: ["jwt"]
})
async function isAuthenticatedPlugin(fastify: FastifyInstance) {
  const jwtService = fastify.jwtService

  async function getUserFromRequest(authorization: string) {
    const payload = jwtService.parseAndVerify(authorization)

    if (!payload) return undefined

    return payload
  }

  fastify.addHook("onRequest", async (request) => {
    request.isUserLoaded = false
    request.authenticated = async () => {
      const authorization = request.headers.authorization

      if (!request.isUserLoaded && authorization) {
        request.isUserLoaded = true
        const user = await getUserFromRequest(authorization)

        if (user) {
          request.user = user
        }
      }

      if (!request.user) {
        throw new Error("Not authenticated")
      }
      return request.user
    }
  })
}
