import { migrate } from "drizzle-orm/node-postgres/migrator"
import { getConfig } from "./plugins/config"
import { createDrizzle } from "./plugins/db"

async function run_migration() {
  const { dbUrl } = getConfig()

  const { client, db } = createDrizzle({ dbUrl })

  await client.connect()

  await migrate(db, { migrationsFolder: "./drizzle/migrations" })

  await client.end()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run_migration()
