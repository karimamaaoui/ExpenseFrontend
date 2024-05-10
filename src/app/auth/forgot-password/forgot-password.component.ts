import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private authServ: AuthService,private toastr: ToastrService,  private router: Router){}

  handleSubmit(f){
    this.authServ.forgotPassword(f.value).subscribe({
      next: (response)=>{
        console.log("response",response)
        this.toastr.success('Verify your email !');

      },
      error: (err)=>{
        this.toastr.error('Error : ',err['error'].message);
        
       console.log("error",err['error'].message)
      },

    })
  }
}
