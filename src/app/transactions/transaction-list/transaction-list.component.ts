import { Component, Input, inject } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  tabTrans: Transaction [] = [];
  @Input() transactions: Transaction[] = [];
  transactionService = inject(TransactionService);
  router = inject(Router);

  ngOnInit(){
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  editTransaction(id: String) {
    this.router.navigate([`edit-transaction/${id}`]);
  }

  deleteTransaction(id: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.loadTransactions(); // Reload the transactions after deletion
      });
    }
  }
}
