import { Expose } from 'class-transformer'

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
}
