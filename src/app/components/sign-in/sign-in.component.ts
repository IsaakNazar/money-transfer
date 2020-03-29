import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ErrorMatcher } from '../../helpers/error-matcher'
import { BaseComponent } from '../BaseComponent'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup
  matcher = new ErrorMatcher()

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  getFormControl(field: string): FormControl {
    return this.loginForm.controls[field] as FormControl
  }

  signIn() {
    if (this.loginForm.invalid) {
      return
    }

    this.authenticationService.login(this.loginForm.value).subscribe(
      () => this.router.navigate(['user'])
    )
  }

}
