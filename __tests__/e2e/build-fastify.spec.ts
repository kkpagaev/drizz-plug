import { expect, describe, test, beforeAll } from "vitest"
import { FastifyInstance } from "fastify"

import { build } from "../../src/build"

describe("index", () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    fastify = await build()
  })

  test("fastify", async () => {
    const response = await fastify.inject("/api/")
    expect(response.statusCode).toBe(404)
    // const body = expectResponseBodyObject<{ locale: string }>(response)

    // expect(body.locale).toBeTypeOf("string")
    // expect(body.locale).toBe("en")
  })
})
