import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../../services/user.service'
import { BaseComponent } from '../../BaseComponent'
import { Observable, of } from 'rxjs'
import { catchError, debounceTime, startWith, switchMap } from 'rxjs/operators'
import { ErrorMatcher } from '../../../helpers/error-matcher'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent extends BaseComponent implements OnInit {

  @Output() createTransactionEmit = new EventEmitter<boolean>()

  transactionForm: FormGroup
  filteredOptions: Observable<any>
  matcher = new ErrorMatcher()

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService) {
    super()
  }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    })

    this.loadUsers()

    this.filteredOptions = this.transactionForm.get('name').valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(value => {
          return (value !== '') ? this.lookup(value) : of(null)
        })
      )
  }

  loadUsers() {
    this.subs.add(
      this.userService.getTransactionList().subscribe(
        resp => {
          console.log('==>', resp)
        }
      )
    )
  }

  send() {
    if (this.transactionForm.invalid) {
      return
    }

    this.subs.add(
      this.userService.createTransaction(this.transactionForm.value).subscribe(
        resp => {
          this.userService.userUpdate.next(resp)
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
