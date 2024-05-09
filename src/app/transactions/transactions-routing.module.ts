import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  {
    path: '', component: TransactionListComponent
  }
];

export const TransactionsRoutingModule = RouterModule.forChild(routes);