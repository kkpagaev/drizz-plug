import { FastifyInstance } from "fastify"

export const counterRoutes = async (app: FastifyInstance) => {
  const counterService = app.counterService

  app.get("/", async (req, res) => {
    const counter = await counterService.increment(1)

    return res.send({ counter })
  })
}
