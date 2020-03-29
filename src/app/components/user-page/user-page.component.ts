import { Component } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { AuthenticationService } from '../../services/authentication.service'
import { User } from '../../models/user'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  transaction: User.History

  constructor(private apiService: ApiService,
              private authenticationService: AuthenticationService) {
  }

  selectRow(transaction: User.History) {
    this.transaction = transaction
  }

  logOut() {
    this.authenticationService.logout()
  }

}
