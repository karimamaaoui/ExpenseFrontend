import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [
    TransactionListComponent,
    AddComponent,
    HomeComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TagInputModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
