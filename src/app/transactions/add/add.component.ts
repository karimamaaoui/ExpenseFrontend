import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  constructor(private transactionServ: TransactionService,private toastr: ToastrService,  private router: Router){}

  addTransaction(f){
    this.transactionServ.addTransaction(f.value).subscribe({
      next: (response)=>{
        console.log("response",response)
        this.toastr.success('Successful login!');
        this.router.navigateByUrl('/home');
      },
      error: (err)=>{
        console.log("error",err)
        this.toastr.error(err['error'].message);
        
      },

    })
  } 
}
