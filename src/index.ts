/* eslint-disable @typescript-eslint/no-floating-promises */
import { build } from "./build"

async function main() {
  const app = await build()

  await app.listen({
    port: 3000
  })
}

main()
