/* eslint-disable @typescript-eslint/no-floating-promises */
import { autoLoadPlugin } from "./auto-load.plugin"
import { build } from "./build"

async function main() {
  const app = await build()

  app.register(autoLoadPlugin)

  await app.listen({
    port: 3000
  })
}

main()
