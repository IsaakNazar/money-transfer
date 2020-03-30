import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { UserService } from '../../../services/user.service'
import { BaseComponent } from '../../BaseComponent'
import { Observable, of } from 'rxjs'
import { catchError, debounceTime, startWith, switchMap } from 'rxjs/operators'
import { ErrorMatcher } from '../../../helpers/error-matcher'
import { ToastrService } from 'ngx-toastr'
import { User } from '../../../models/user'
import { numericPattern } from '../../../misc/validators'

@Component({
  selector: 'create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() selectedTransaction: User.History

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective

  transactionForm: FormGroup
  filteredOptions: Observable<any>
  matcher = new ErrorMatcher()

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.selectedTransaction) {
      this.transactionForm.patchValue({
        name: this.selectedTransaction.username,
        amount: Math.abs(this.selectedTransaction.amount)
      })
    }
  }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern(numericPattern)]]
    })

    this.filteredOptions = this.transactionForm.controls['name'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(value => {
          return (value && value.length) ? this.lookup(value) : of(null)
        })
      )
  }

  send() {
    if (this.transactionForm.invalid) {
      return
    }

    this.subs.add(
      this.userService.createTransaction(this.transactionForm.value).subscribe(
        (resp: User.TransModel) => {
          this.userService.userUpdate.next(resp)
          this.formDirective.resetForm()
          this.toastrService.success('Transaction has been successfully sent!')
        },
        error => {
          this.toastrService.error(error)
        }
      )
    )
  }

  getFormControl(field: string): FormControl {
    return this.transactionForm.controls[field] as FormControl
  }

  private lookup(value: string): Observable<any> {
    const filterValue = value.toLowerCase()
    return this.userService.filterList({filter: filterValue}).pipe(
      catchError(() => of(null))
    )
  }

}
