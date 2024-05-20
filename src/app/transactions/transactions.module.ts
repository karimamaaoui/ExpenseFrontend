import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { TagInputModule } from 'ngx-chips';
import { CategoryChartsComponentComponent } from './category-charts-component/category-charts-component.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { BudgetComponent } from './budget/budget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';



@NgModule({
  declarations: [
    TransactionListComponent,
    AddComponent,
    HomeComponent,
    CategoryComponent,
    CategoryChartsComponentComponent,
    ExpenseReportComponent,
    BudgetComponent,
    EditTransactionComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    TagInputModule,
    TransactionsRoutingModule,
    NgApexchartsModule
  ]
})
export class TransactionsModule { }
