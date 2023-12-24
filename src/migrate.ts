import { migrate } from "drizzle-orm/node-postgres/migrator"
import { getConfig } from "./plugins/config.plugin"
import { createDrizzle } from "./plugins/db.plugin"

async function run_migration() {
  const { DB_URL: dbUrl } = getConfig()

  const { client, db } = createDrizzle({ dbUrl })

  await client.connect()

  await migrate(db, { migrationsFolder: "./drizzle/migrations" })

  await client.end()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run_migration()
