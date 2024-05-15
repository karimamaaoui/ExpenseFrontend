import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  url = 'http://localhost:3000/budget';

  constructor(private http: HttpClient) {}

  getBudgets() : Observable<Budget []>  {
    return this.http.get<Budget[]>(`${this.url}/list`);
  }
  getBudgetById(id): Observable<Budget> {
    return this.http.get<Budget>(`${this.url}/get/${id}`);
  }

  addNewBudget(newBudget) {
    return this.http.post(`${this.url}/add`, newBudget);
  }
}
