import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  constructor(private authServ: AuthService,private toastr: ToastrService,  private router: Router ,private route: ActivatedRoute){}

  handleSubmit(f) {
    const { newPassword } = f.value;
    // Get the token from the query parameter
    const token = this.route.snapshot.queryParams['token'];
    if (!token) {
      console.error('Token is missing in the query parameter.');
      return; 
    }
  
    this.authServ.resetPassword(token, newPassword).subscribe({
      next: (response) => {
        console.log("response", response);
         this.toastr.success('Password reset successfully!');
         this.router.navigateByUrl('');

      },
      error: (err) => {
        this.toastr.error('Error: ' + err.message);
        console.error("error", err);
      }
    });
  }
}