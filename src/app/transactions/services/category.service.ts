import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  getCategories() : Observable<Category []>  {
    return this.http.get<Category[]>(this.url);
  }
  getCategoryById(id): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  addNewCaategory(newCat) {
    return this.http.post(`${this.url}/add`, newCat);
  }
}
