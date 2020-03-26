import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>
  // public currentUser: Observable<string>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')))
    // this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserToken(): any {
    return this.currentUserSubject.getValue()
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.baseUrl}/sessions/create`, {email, password})
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
  }
}
