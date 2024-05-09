import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  }
,  
{ path: '', component: AuthComponent },

];

export const MyRouting = RouterModule.forRoot(routes);