import { Component } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authServ : AuthService,private router: Router){}

  logout(){
    console.log("logout")
    this.authServ.logout();
    this.router.navigateByUrl('');
  }
}
