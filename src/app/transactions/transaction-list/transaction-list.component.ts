import { Component, inject } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  tabTrans: Transaction [] = [];

  transactionService = inject(TransactionService);

  ngOnInit(){
    this.transactionService.getTransactions().subscribe({
      next : (data : Transaction[] ) => {
        this.tabTrans= data;
        console.log("response data",data)
      },

      error : (e) => {console.log(`Error during the transaction list retrieval : ${e}`)
      alert('Problem');

    }
    })
  }

}
