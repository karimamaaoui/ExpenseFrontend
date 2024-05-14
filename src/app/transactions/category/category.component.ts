import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private catServ: CategoryService ,private toastr: ToastrService,  private router: Router){}

  addCategory(f){
    
    this.catServ.addNewCaategory(f.value).subscribe({
      next: (response)=>{
        console.log("response",response)
        this.toastr.success('Category Added Successful!');
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
