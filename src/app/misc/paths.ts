import { environment } from '../../environments/environment'

const base = (rest: string): string => `${environment.baseUrl}/${rest}`

export class Paths {
  static registerUser = base('users')
  static createGetTransactions = base('api/protected/transactions')
  static getUserInfo = base('api/protected/user-info')
  static signIn = base('sessions/create')
  static filterList = base('api/protected/users/list')
}
