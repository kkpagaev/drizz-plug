import { Redis } from "../../plugins/cache"

export class CounterService {
  constructor(private cache: Redis) {}

  async increment(id: number) {
    const counter = await this.cache.get(`counter:${id}`)

    if (!counter) {
      await this.cache.set(`counter:${id}`, 1)
    } else {
      await this.cache.set(`counter:${id}`, parseInt(counter) + 1)
    }

    return await this.cache.get(`counter:${id}`)
  }
}
