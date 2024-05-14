import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  tabCategories: Category [] = [];
  selectedCategory: string = '';
  tags: string[] = [];
  selectedTypePayment: string= '';
  
  constructor(private transactionServ: TransactionService ,private categorySer: CategoryService,private toastr: ToastrService,  private router: Router){}

  ngOnInit(){
    this.categorySer.getCategories().subscribe({
      next : (data : Category[] ) => {
        this.tabCategories= data;
        console.log("response data",data)
      
      },
      error: (err)=>{
        console.error("Error",err);
      }
    })
  }


  addTransaction(f){
    const tagValues = f.value.tags.map(tag => tag.value);
    console.log('Tags:', tagValues);

    const transactionData = {
      amount: f.value.amount,
      description: f.value.description,
      category: f.value.category,
      tags: tagValues,
      typePayment:f.value.typePayment,

  };
    this.transactionServ.addTransaction(transactionData).subscribe({
      next: (response)=>{
        console.log("response",response)
        this.toastr.success('Transaction Added Successful!');
        this.router.navigateByUrl('/home');
      },
      error: (err)=>{
        console.log("data",f.value)
        console.log("error",err)
        this.toastr.error(err['error'].message);
        
      },

    })
  } 
}
