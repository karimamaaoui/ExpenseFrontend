import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImportService } from '../services/import.service'; // Import your ImportService here
import { Category } from '../models/Category';
import { Transaction } from '../models/Transaction'; // Assuming you have a Transaction model

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  tabCategories: Category[] = [];
  selectedCategory: string = '';
  tags: string[] = [];
  selectedTypePayment: string = '';
  file: File | null = null;
  transactions: Transaction[] = []; // List to hold transactions

  constructor(
    private transactionServ: TransactionService,
    private categorySer: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private importService: ImportService // Inject ImportService here
  ) {}

  ngOnInit() {
    this.categorySer.getCategories().subscribe({
      next: (data: Category[]) => {
        this.tabCategories = data;
        console.log("Response data", data);
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importCSV(): void {
    if (this.file) {
      this.importService.importCSV(this.file).subscribe(response => {
        console.log('Import successful:', response);
        // Assuming response contains imported transactions
        this.transactions = response; // Assign imported transactions to your list
      });
    }
  }

  addTransaction(f) {
    const tagValues = f.value.tags.map(tag => tag.value);
    console.log('Tags:', tagValues);

    const transactionData = {
      amount: f.value.amount,
      description: f.value.description,
      category: f.value.category,
      tags: tagValues,
      typePayment: f.value.typePayment,
    };

    this.transactionServ.addTransaction(transactionData).subscribe({
      next: (response) => {
        console.log("Response", response);
        this.toastr.success('Transaction Added Successfully!');
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error("Error", err);
        this.toastr.error(err['error'].message);
      }
    });
  }
}
