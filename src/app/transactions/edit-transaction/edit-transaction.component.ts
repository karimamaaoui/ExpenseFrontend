import { Component } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { Category } from '../models/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent {
  transaction: Transaction | null = null;
  tabCategories: Category[] = [];
  selectedCategory: string = '';
  selectedTypePayment: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,private categorySer: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.getTransactionById(id).subscribe(transaction => {
        this.transaction = transaction;
        this.selectedCategory = transaction.category._id;
        this.selectedTypePayment = transaction.typePayment;
      });
    }

    this.categorySer.getCategories().subscribe(categories => {
      this.tabCategories = categories;
    });
  }

  saveTransaction(): void {
    if (this.transaction) {
      this.transactionService.updateTransaction(this.transaction._id, this.transaction).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/home']);
  }

  trackByCategoryId(index: number, category: Category): string {
    return category._id;
  }
}