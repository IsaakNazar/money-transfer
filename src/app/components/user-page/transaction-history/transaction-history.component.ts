import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  data = [
    {id: 1, date: '12/12/12', username: 'ali', amount: 15, balance: 485},
    {id: 2, date: '12/12/12', username: 'gerb', amount: 25, balance: 455},
    {id: 3, date: '13/10/14', username: 'mord', amount: 45, balance: 435},
    {id: 4, date: '12/12/13', username: 'berto', amount: 63, balance: 384},
    {id: 5, date: '2/12/15', username: 'kate', amount: 45, balance: 335},
  ]

  columns = Object.keys(this.data[0])

  constructor() { }

  ngOnInit(): void {
    console.log(this.columns)
  }

}
