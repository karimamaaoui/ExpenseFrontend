import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../services/transaction.service';
import { Category } from '../models/Category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabTrans: Transaction[] = [];
  tabTransFilter: Transaction[] = [];
  tabCategories: Category[] = [];
  selectedAmount: number = 0;
  selectedCatNames: string[] = []; 
  categoryForm: FormGroup;
  totalAmount: number = 0;
  firstExpenseDate: Date ;
  lastExpenseDate: Date;
  selectedStartDate: Date;
  selectedEndDate: Date;



  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
    this.initializeForm();
  }


  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.tabTrans = data;
        this.tabTransFilter = data;
        console.log("Response data", data);
        this.calculateTotalAmount()
        this.firstExpenseDateFct();
        this.lastExpenseDateFct();
        this.numberOfExpenses();
      },
      error: (e) => {
      //  console.log(`Error during the transaction list retrieval: ${e}`);
        alert('Problem');
      }
    });
  }
  numberOfExpenses(): number {
    return this.tabTrans.length;
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.tabCategories = data;
       // console.log("Response data category", data);
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  initializeForm() {
    this.categoryForm = this.formBuilder.group({});
    this.tabCategories.forEach(category => {
      this.categoryForm.addControl(category.nameCat, this.formBuilder.control(false));
    });
  }

  toggleCategorySelection(categoryName: string) {
    if (this.selectedCatNames.includes(categoryName)) {
      this.selectedCatNames = this.selectedCatNames.filter(name => name !== categoryName);
    } else {
      this.selectedCatNames.push(categoryName);
    }
  }
  //search by category || start date && end date || amount
  search() {
    const startDate = this.selectedStartDate ? new Date(this.selectedStartDate) : null;
    const endDate = this.selectedEndDate ? new Date(this.selectedEndDate) : null;
  
    this.tabTransFilter = this.tabTrans.filter(transaction => {
      const matchesAmount = this.selectedAmount ? transaction.amount === this.selectedAmount : true;
      const matchesCategory = this.selectedCatNames.length > 0 ? this.selectedCatNames.includes(transaction.category.nameCat) : true;
      const transactionDate = new Date(transaction.createdAt);
      const localTransactionDate = new Date(transactionDate.getTime() + (transactionDate.getTimezoneOffset() * 60000));

    const withinDateRange = (!startDate || localTransactionDate >= startDate) && (!endDate || localTransactionDate <= endDate);

      return matchesAmount && matchesCategory && withinDateRange;
      
    });
  }
  //calculate the total amount
  calculateTotalAmount() {
    this.totalAmount = this.tabTrans.reduce((total, transaction) => total + transaction.amount, 0);
  }

  firstExpenseDateFct(): Date | null {
      
    // Find the minimum createdAt value
    const minCreatedAt = this.tabTrans.reduce((min, transaction) => {
      return transaction.createdAt < min ? transaction.createdAt : min;
    }, this.tabTrans[0].createdAt);
  
    this.firstExpenseDate = new Date(minCreatedAt);
    return this.firstExpenseDate; 
  }

  lastExpenseDateFct(): Date | null {
 
    // Find the maximum createdAt value
    const maxCreatedAt = this.tabTrans.reduce((max, transaction) => {
      return transaction.createdAt > max ? transaction.createdAt : max;
    }, this.tabTrans[0].createdAt);
  
    this.lastExpenseDate = new Date(maxCreatedAt); 
    return this.lastExpenseDate; 
  }
  

}
