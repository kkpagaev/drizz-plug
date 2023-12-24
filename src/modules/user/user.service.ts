import { eq } from "drizzle-orm"
import { users } from "../../schema"
import { Drizzle } from "../../plugins/db.plugin"

export type CreateUser = {
  fullName: string
  username: string
}

export class UserService {
  constructor(private db: Drizzle) {}

  async create(dto: CreateUser, tx?: Drizzle) {
    const user = await (tx || this.db)
      .insert(users)
      .values({
        fullName: dto.fullName,
        username: dto.username
      })
      .returning({ id: users.id })

    return user[0]
  }

  async find(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id)
    })

    return user
  }
}
