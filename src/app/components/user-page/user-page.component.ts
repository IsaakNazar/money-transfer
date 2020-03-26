import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Paths } from '../../misc/paths'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private apiService: ApiService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getUserInfo() {
    this.apiService.get(Paths.getUserInfo).subscribe(
      resp => {
        console.log('user info', resp)
      }
    )
  }

  logIn() {
    this.authenticationService.login("john@cage.good", 'johncage').subscribe(resp => {
      console.log('login', resp)
    })
  }

  logOut() {
    this.authenticationService.logout()
  }

}
