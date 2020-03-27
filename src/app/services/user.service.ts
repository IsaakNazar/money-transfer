import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Paths } from '../misc/paths'
import { Observable } from 'rxjs'
import { User } from '../models/user'
import { map } from 'rxjs/operators'
import { deserialize, plainToClass } from 'class-transformer'

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) {
  }

  getUserInfo(): Observable<any> {
    return this.apiService.get(Paths.getUserInfo)
  }

  signIn(body: any): Observable<any> {
    return this.apiService.post(Paths.signIn, body)
  }



}
