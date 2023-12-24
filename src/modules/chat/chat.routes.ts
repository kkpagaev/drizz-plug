import { FastifyInstance } from "fastify"

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.get("/", { websocket: true }, async (connection, req) => {
    connection.socket.on("message", () => {
      console.log("message received")
      connection.socket.send("hi from server")
      return false
    })

    connection.socket.on("close", () => {
      connection.socket.send("hi from server")
      console.log("connection closed")
    })

    setInterval(() => {
      connection.socket.send("hi from server")
    }, 1000)

    return false
  })
}
