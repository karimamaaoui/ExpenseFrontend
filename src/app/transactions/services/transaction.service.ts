import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url = 'http://localhost:3000/transactions';
  

  constructor(private http: HttpClient) {}

  getTransactions() : Observable<Transaction []>  {
    return this.http.get<Transaction[]>(this.url);
  }
  addTransaction(newTransaction){
    return this.http.post(`${this.url}/add`, newTransaction);
  }
  searchTransaction(params){
    return this.http.get(`${this.url}/search`, {params});
  }
  updateTransaction(id: string, updatedTransaction: Transaction): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.url}/update/${id}`, updatedTransaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.url}/get/${id}`);
  }
  
}
