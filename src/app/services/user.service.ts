import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Paths } from '../misc/paths'
import { Observable, Subject } from 'rxjs'
import { User } from '../models/user'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

@Injectable()
export class UserService {

  userUpdate = new Subject()

  constructor(private apiService: ApiService) {
  }

  getUserInfo(): Observable<User.ModelToken> {
    return this.apiService.get<User.ModelToken>(Paths.getUserInfo).pipe(
      map(data => plainToClass(User.ModelToken, data))
    )
  }

  signIn(body: any): Observable<any> {
    return this.apiService.post(Paths.signIn, body)
  }

  registerUser(body: any): Observable<any> {
    return this.apiService.post(Paths.registerUser, body)
  }

  createTransaction(body: any): Observable<User.TransModel> {
    return this.apiService.post<User.TransModel>(Paths.createGetTransactions, body).pipe(
      map(data => plainToClass(User.TransModel, data))
    )
  }

  getTransactionList(): Observable<User.TransModelList> {
    return this.apiService.get<User.TransModelList>(Paths.createGetTransactions).pipe(
      map(data => plainToClass(User.TransModelList, data))
    )
  }

  filterList(body: any): Observable<any> {
    return this.apiService.post(Paths.filterList, body)
  }


}
