import { Expose, Type } from 'class-transformer'

export namespace User {
  export class Model {
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    balance: number
  }

  export class LoginModel {
    @Expose()
    email: string

    @Expose()
    password: string
  }

  export class History {
    @Expose()
    id: number

    @Expose()
    username: string

    @Expose()
    date: Date

    @Expose()
    balance: number

    @Expose()
    amount: number
  }

  export class ModelToken {
    @Expose()
    @Type(() => Model)
    user_info_token: Model
  }

  export class TransModel {
    @Expose()
    @Type(() => History)
    trans_token: History
  }

  export class TransModelList {
    @Expose()
    @Type(() => History)
    trans_token: History[]
  }
}
