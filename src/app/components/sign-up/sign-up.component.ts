import { Component, OnInit, ViewChild } from '@angular/core'
import { ErrorMatcher } from '../../helpers/error-matcher'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { mustMatchPasswordValidator } from '../../helpers/validators'
import { UserService } from '../../services/user.service'
import { BaseComponent } from '../BaseComponent'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BaseComponent implements OnInit {

  signUpForm: FormGroup
  matcher = new ErrorMatcher()
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d).{4,8}$/)]],
      confirmPassword: [null, Validators.required]
    }, {
      validator:  mustMatchPasswordValidator('password', 'confirmPassword')
    })
  }

  getFormControl(field: string): FormControl {
    return this.signUpForm.controls[field] as FormControl
  }

  signUp () {
    if (this.signUpForm.invalid) {
      return
    }

    const form = this.signUpForm.value
    delete form['confirmPassword']

    this.subs.add(
      this.userService.registerUser(form).subscribe(
        () => {
          this.toastrService.success('New user has been successfully created!')
          this.formDirective.resetForm()
          this.router.navigate(['sign-in'])
        },
        error => {
          this.toastrService.error(error)
        }
      )
    )
  }

}
