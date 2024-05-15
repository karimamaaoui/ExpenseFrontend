import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { Budget } from '../models/Budget';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

  tabCategories: Category [] = [];
  selectedCategory: string = '';
  tabBudgets: Budget [] = [];
  tabTransactions: Transaction[] = [];
  constructor(
    private budgetService: BudgetService,private transactionService: TransactionService,private categorySer: CategoryService,private toastr: ToastrService,  private router: Router) {}


   
    ngOnInit(){
      this.categorySer.getCategories().subscribe({
        next : (data : Category[] ) => {
          this.tabCategories= data;
       //   console.log("response data",data)
        
        },
        error: (err)=>{
          console.error("Error",err);
        }
      });
      this.loadBudgets(); 
      this.loadTransactions()
    }
    loadBudgets() {
      this.budgetService.getBudgets().subscribe({
        next: (data: Budget[]) => {
          this.tabBudgets = data;
          console.log("Response data", data);
        },
        error: (e) => {
          alert('Problem');
        }
      });
    }


    loadTransactions() {
      this.transactionService.getTransactions().subscribe({
        next: (data: Transaction[]) => {
          this.tabTransactions = data;
          console.log('Transactions:', this.tabTransactions); 
        },
        error: (error) => {
          console.error('Error fetching transactions:', error);
        }
      });
    }
   
    calculateSpentAmount(budgetCategory: string): number {
      const transactionsForCategory = this.tabTransactions.filter(transaction => transaction.category.nameCat === budgetCategory);
      
      const totalSpentAmount = transactionsForCategory.reduce((total, transaction) => {
        if (transaction.amount !== undefined && transaction.amount !== null) {
       //   console.log("totla", total);
          return total + transaction.amount;
        } else {
          return total;
        }
      }, 0);
    
      return totalSpentAmount;
    }
    calculateProgressColor(percentage: number): string {
      if (percentage <= 25) {
        return 'bg-info'; 
      } else if (percentage <= 500) {
        return 'bg-warning'; 
      } else if (percentage <= 2000) {
        return 'bg-danger'; 
      } else {
        return 'bg-success'; 
      }
    }
    

    addBudget(f){
      this.budgetService.addNewBudget(f.value).subscribe({
        next: (response)=>{
          console.log("response",response)
          this.toastr.success('Budget Added Successful!');
        },
        error: (err)=>{
          console.log("data",f.value)
          console.log("error",err)
          this.toastr.error(err['error'].message);
          
        },
  
      })
    }
  
}
