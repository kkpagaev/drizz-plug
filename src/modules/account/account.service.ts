import { eq } from "drizzle-orm"
import { accounts } from "../../schema"
import { CreateUser, UserService } from "../user/user.service"
import { Drizzle } from "../../plugins/db"

export type CreateAccount = {
  email: string
  password: string
} & CreateUser

export class AccountService {
  constructor(
    private db: Drizzle,
    private userSerice: UserService
  ) {}

  async register(dto: CreateAccount) {
    const { email, password } = dto
    const account = await this.findByEmail(email)

    if (account) {
      throw new Error("Account already exists")
    }

    const user = await this.db.transaction(async (trx) => {
      await trx.insert(accounts).values({
        email,
        password
      })

      const user = await this.userSerice.create(
        {
          fullName: dto.fullName,
          username: dto.username
        },
        trx
      )

      return user
    })

    return user
  }

  async findByEmail(email: string) {
    const account = await this.db.query.accounts.findFirst({
      where: eq(accounts.email, email)
    })

    if (!account) {
      throw new Error("Account not found")
    }

    return account
  }
}
