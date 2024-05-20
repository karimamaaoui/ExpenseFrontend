import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { BudgetComponent } from './budget/budget.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component'; // Import the new component


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'add', component: AddComponent
  },
  
  {
    path: 'category', component: CategoryComponent
  },
  
  {
    path: 'report', component: ExpenseReportComponent
  },
  {
    path: 'budget', component: BudgetComponent
  },
  {
    path: 'edit-transaction/:id', component: EditTransactionComponent // Add the new route for editing transactions
  }
];

export const TransactionsRoutingModule = RouterModule.forChild(routes);