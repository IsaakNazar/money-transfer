import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.currentUserToken
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.currentUserToken}`
        }
      })
    }

    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.toastrService.error(err.error)
            this.authenticationService.logout()
            return of(err)
          }
          throw err
        }
      )
    )
  }

  private handleAuthError() {
    this.authenticationService.logout()
    // this.router.navigate(['sign-in']);
  }

}
