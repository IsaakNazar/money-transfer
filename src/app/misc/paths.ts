import { environment } from '../../environments/environment'

const base = (rest: string): string => `${environment.baseUrl}/${rest}`

export class Paths {
  static registerUsers = base('users')
  static getUserTransactions = base('api/protected/transactions')
  static getUserInfo = base('api/protected/user-info')
  static signIn = base('sessions/create')
}
