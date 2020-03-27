import { Component, OnInit } from '@angular/core'
import { ApiService } from './services/api.service'
import { Paths } from './misc/paths'
import { AuthenticationService } from './services/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  body = {"username":"John Cage","password":"johncage","email":"john@cage.good"}


  constructor(private apiService: ApiService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    // this.apiService.post(Paths.registerUsers, this.body).subscribe(
    //   resp => {
    //     console.log(resp)
    //   }
    // )
    // this.authenticationService.login("john@cage.good", 'johncage').subscribe(resp => {
    //   console.log('====>', resp)
    // })

  }

}
