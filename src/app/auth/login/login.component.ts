import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authServ: AuthService,private toastr: ToastrService){}

  handleSubmit(f){
    this.authServ.login(f.value).subscribe({
      next: (response)=>{
        localStorage.setItem('access_token', response['token']);
        this.toastr.success('Successful login!');
      //  console.log('Successful login',response['token']);
      },
      error: (err)=>{
        this.toastr.error('Error : ',err['error'].message);
        
     //   console.log("error",err['error'].message)
      },

    })
  }

}
