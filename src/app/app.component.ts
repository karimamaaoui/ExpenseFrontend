import { Component } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'depensesProject';

  constructor(private authService: AuthService) { }

  
  ngOnInit(){
  }

  checkUserLoginStatus(): boolean {
    return  this.authService.isUserLoggedIn();
  }


}
