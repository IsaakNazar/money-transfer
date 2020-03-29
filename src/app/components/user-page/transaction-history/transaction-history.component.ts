import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { UserService } from '../../../services/user.service'
import { User } from '../../../models/user'
import { BaseComponent } from '../../BaseComponent'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'

@Component({
  selector: 'transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent extends BaseComponent implements OnInit {
  data: MatTableDataSource<User.History>
  columns = ['date', 'username', 'amount', 'balance']

  @Output() emitSelectedRow = new EventEmitter<User.History>()

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor(private userService: UserService) {
    super()
  }

  ngOnInit(): void {
    this.loadList()
    this.subs.add(
      this.userService.userUpdate.asObservable().subscribe(
        () => this.loadList()
      )
    )
  }


  loadList() {
    this.userService.getTransactionList().subscribe(
      (resp: User.TransModelList) => {
        this.data = new MatTableDataSource<User.History>(resp.trans_token)
        this.data.paginator = this.paginator
        this.data.sortingDataAccessor = (item: User.History, property: string) => {
          switch (property) {
            case 'date':
              return new Date(item.date)
            default:
              return item[property]
          }
        }
        this.data.sort = this.sort
      }
    )
  }

  getRow(row: User.History) {
    this.emitSelectedRow.emit(row)
  }


}
