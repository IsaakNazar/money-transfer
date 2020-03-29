import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { UserService } from './user.service'
import { User } from '../models/user'
import { Router } from '@angular/router'

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')))
  }

  public get currentUserToken(): any {
    return this.currentUserSubject.getValue()
  }

  login(user: User.LoginModel) {
    return this.userService.signIn({email: user.email, password: user.password})
      .pipe(
        map(token => {
          const {id_token} = token
          localStorage.setItem('token', JSON.stringify(id_token))
          this.currentUserSubject.next(id_token)
          return id_token
        }))

  }

  logout() {
    localStorage.removeItem('token')
    this.currentUserSubject.next(null)
    this.router.navigate(['sign-in'])
  }
}
