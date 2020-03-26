import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  send<R>(method: string, uri: string, body = {}, formData = false): Observable<R> {
    let headers = new HttpHeaders()
    if (!formData) {
      headers = headers.append('Content-Type', 'application/json')
    } else {
      headers = headers.append('Content-Type', 'multipart/form-data')
    }
    const options: any = {
      headers,
      observe: 'response',
      withCredentials: true
    }

    if (method === 'GET') {
      options.params = body
    } else {
      options.body = formData ? body : JSON.stringify(body)
    }

    return this.http.request(method, uri, options).pipe(
      map((response: any) => response.body),
      catchError((reason: HttpErrorResponse) => {
        return throwError(reason.error)
      })
    )
  }

  post<T>(uri: string, body = {}, formData = false): Observable<T> {
    return this.send<T>('POST', uri, body, formData)
  }

  get<T>(uri: string, body = {}): Observable<T> {
    return this.send<T>('GET', uri, body)
  }


}
