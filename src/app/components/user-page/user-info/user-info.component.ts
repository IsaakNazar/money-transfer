import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'
import { BaseComponent } from '../../BaseComponent'
import { User } from '../../../models/user'

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends BaseComponent implements OnInit {

  user: User.Model

  constructor(private userService: UserService) {
    super()
  }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser() {
    this.subs.add(
      this.userService.getUserInfo().subscribe(
        resp => {
          this.user = resp.user_info_token
        }
      )
    )
  }



}
