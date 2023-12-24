import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "../schema"
import fastifyPlugin from "fastify-plugin"

export type Drizzle = NodePgDatabase<typeof schema>

declare module "fastify" {
  interface FastifyInstance {
    db: Drizzle
  }
}

export function createDrizzle({ dbUrl }: { dbUrl: string }) {
  const client = new Client({
    connectionString: dbUrl
  })

  const db = drizzle(client, { schema })

  return { client, db }
}

export default fastifyPlugin(
  async (app) => {
    const config = app.config!

    const { client, db } = createDrizzle({ dbUrl: config.dbUrl })
    await client.connect()

    app.decorate("db", db)

    // licecycle hooks
    app.addHook("onClose", async () => {
      await client.end()
    })
  },
  {
    name: "db",
    dependencies: ["config"]
  }
)
