import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Paths } from '../misc/paths'
import { Observable, Subject } from 'rxjs'
import { User } from '../models/user'
import { map } from 'rxjs/operators'
import { deserialize, plainToClass } from 'class-transformer'

@Injectable()
export class UserService {

  userUpdate = new Subject()

  constructor(private apiService: ApiService) {
  }

  getUserInfo(): Observable<any> {
    return this.apiService.get(Paths.getUserInfo)
  }

  signIn(body: any): Observable<any> {
    return this.apiService.post(Paths.signIn, body)
  }

  registerUser(body: any): Observable<any> {
    return this.apiService.post(Paths.registerUser, body)
  }

  createTransaction(body: any): Observable<any> {
    return this.apiService.post(Paths.createGetTransactions, body)
  }

  getTransactionList(): Observable<any> {
    return this.apiService.get(Paths.createGetTransactions)
  }

  filterList(body: any): Observable<any> {
    return this.apiService.post(Paths.filterList, body)
  }


}
