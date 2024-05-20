import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction'; // Assurez-vous du chemin correct vers Transaction
import { Category } from '../models/Category'; // Assurez-vous du chemin correct vers Category

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  transaction: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) {
    // Initialisez une transaction vide au début ou avec des valeurs par défaut
    this.transaction = new Transaction('', '', 0, new Category('', ''), [], new Date(), '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.getTransactionById(id).subscribe(transaction => {
        this.transaction = transaction; // Assignez la transaction récupérée à votre objet transaction
      });
    }
  }

  saveTransaction(): void {
    if (this.transaction._id) {
      this.transactionService.updateTransaction(this.transaction._id, this.transaction).subscribe(() => {
        this.router.navigate(['/transactions']); // Redirigez après la sauvegarde
      });
    }
  }
}
