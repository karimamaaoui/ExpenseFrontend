import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  }
,  
{ path: '', component: AuthComponent },

{ path: 'register', component: RegisterComponent },

];

export const MyRouting = RouterModule.forRoot(routes);