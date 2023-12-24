import * as jwt from "jsonwebtoken"

export interface JwtPayload extends jwt.JwtPayload {
  userId: number
}
export class JwtService {
  constructor(private readonly secret: string) {}

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret)
  }

  verify(token: string) {
    return jwt.verify(token, this.secret)
  }
}
