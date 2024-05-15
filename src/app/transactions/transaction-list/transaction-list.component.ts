import { Component, Input, inject } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  tabTrans: Transaction [] = [];
  @Input() transactions: Transaction[] = [];
  transactionService = inject(TransactionService);

  ngOnInit(){
  }

}
