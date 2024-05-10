import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  }
,  
{ path: '', component: AuthComponent },

{ path: 'register', component: RegisterComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'reset-password', component: ResetPasswordComponent }

];

export const MyRouting = RouterModule.forRoot(routes);