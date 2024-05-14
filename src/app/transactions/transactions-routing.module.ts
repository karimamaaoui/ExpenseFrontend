import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';

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
];

export const TransactionsRoutingModule = RouterModule.forChild(routes);