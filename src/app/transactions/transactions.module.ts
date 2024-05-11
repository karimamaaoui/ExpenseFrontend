import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransactionListComponent,
    AddComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
