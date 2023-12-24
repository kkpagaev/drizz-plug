import { expect, test, beforeAll, describe } from "vitest"
import { z } from "zod"
import { build } from "../../../src/build"
import { FastifyInstance } from "fastify"
import { CreateAccountSchema } from "../../../src/modules/account/schemas/create-account.schema"
import dbPlugin from "../../../src/plugins/db.plugin"
import configPlugin from "../../../src/plugins/config.plugin"
import accountPlugin from "../../../src/modules/account/account.plugin"
import { fastifyPlugin as fp } from "fastify-plugin"

class UserServiceMock {
  async create() {
    return {
      id: 1
    }
  }

  async find() {
    return undefined
  }
}

const userPluginMock = fp(
  async (app) => {
    app.decorate("userService", new UserServiceMock() as any)
  },
  { name: "user" }
)

describe("signup", () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    fastify = await build()
    for (const plugin of [
      configPlugin,
      dbPlugin,
      userPluginMock,
      accountPlugin
    ]) {
      await fastify.register(plugin)
    }
  })

  test("signup", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/account/register",
      headers: {
        "content-type": "application/json"
      },
      payload: {
        email: "test" + Date.now() + "@test.com",
        fullName: "test",
        password: "test",
        username: "test"
      } satisfies z.infer<typeof CreateAccountSchema>
    })

    expect(response.statusCode).toBe(201)
  })
})
