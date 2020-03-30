import { FormGroup } from '@angular/forms'

export const mustMatchPasswordValidator = (controlName: string, matchingControlName: string) => {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName]
    const matchingControl = formGroup.controls[matchingControlName]

    if (matchingControl.errors && !matchingControl.errors.passwordMismatch) {
      return
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({passwordMismatch: true})
    } else {
      matchingControl.setErrors(null)
    }
  }
}

// regular expression patterns
export const passwordPattern = /^(?=.*\d).{4,8}$/
export const numericPattern = /^[0-9]+$/
