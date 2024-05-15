import { Component } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrl: './expense-report.component.css'
})
export class ExpenseReportComponent {
  transactions: Transaction[] = []; 
  selectedStartDate: Date;
  selectedEndDate: Date;
  selectedAmount: number = 0;

  totalAmount: number = 0;

  constructor(
    private transactionService: TransactionService) {}

  ngOnInit(): void {
  }
  loadTransactions() {
    
    // Check if both dates are selected
    if (this.selectedStartDate && this.selectedEndDate) {
      //Convert Selected Dates to Date Objects
      const startDate = new Date(this.selectedStartDate);
      const endDate = new Date(this.selectedEndDate);
      
      this.transactionService.getTransactions().subscribe({
        next: (data: Transaction[]) => {
          //Filter transactions based on selected dates
          this.transactions = data.filter(transaction => {
            const transactionDate = new Date(transaction.createdAt);
            const localTransactionDate = new Date(transactionDate.getTime() + (transactionDate.getTimezoneOffset() * 60000));
            return localTransactionDate >= startDate && localTransactionDate <= endDate;
          });
          this.totalAmount = this.calculateTotal(this.transactions)
        },
        error: (e) => {
          console.error('Problem loading transactions:', e);
          alert('Problem loading transactions');
        }
      });
    } else {
      this.transactions = [];
    }
  }
  
  
  calculateTotal(transactions: any[]): number {
    let total = 0;
    // Parcourir les transactions et ajouter les montants au total
    for (const transaction of transactions) {
      total += transaction.amount;
    }
    // Retourner le total calculé
    return total;
  }

}
