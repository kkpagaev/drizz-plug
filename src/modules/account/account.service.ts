import { eq } from "drizzle-orm"
import { accounts } from "../../schema"
import { CreateUser, UserService } from "../user/user.service"
import { Drizzle } from "../../plugins/db.plugin"
import { JwtService } from "../jwt/jwt.service"
import { compareSync, hash } from "bcrypt"

export type CreateAccount = {
  email: string
  password: string
} & CreateUser

export class AccountService {
  constructor(
    private db: Drizzle,
    private userSerice: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: CreateAccount) {
    const { email, password } = dto
    const account = await this.findByEmail(email)

    if (account) {
      throw new Error("Account already exists")
    }

    const user = await this.db.transaction(async (trx) => {
      const hashedPassword = await hash(password, 10)
      await trx.insert(accounts).values({
        email,
        password: hashedPassword
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

  async login(email: string, password: string) {
    const account = await this.findByEmail(email)

    if (!account || !compareSync(password, account.password)) {
      throw new Error("invalid credentials")
    }

    const token = this.jwtService.sign({
      userId: account.id
    })

    return token
  }

  async findByEmail(email: string) {
    const account = await this.db.query.accounts.findFirst({
      where: eq(accounts.email, email)
    })

    return account
  }
}
