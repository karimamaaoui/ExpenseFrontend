import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authServ: AuthService,private toastr: ToastrService){}

  handleSubmit(f){
    this.authServ.register(f.value).subscribe({
      next: (response)=>{
        localStorage.setItem('access_token', response['token']);
        this.toastr.success('Successful register!');
        console.log('Successful login',response['token']);
      },
      error: (err)=>{
        this.toastr.error('Error : ',err['error'].message);
        
       console.log("error",err['error'].message)
      },

    })
  }
}
