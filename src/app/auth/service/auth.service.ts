import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(user){
    return this.http.post(`${this.url}/login`, user);
  }
  
  register(user){
    return this.http.post(`${this.url}/signup`, user);
  }
  
  forgotPassword(email){
    return this.http.post(`${this.url}/forgot-password`,email);
  }

  
  resetPassword(token,newPassword){
    return this.http.post(`${this.url}/reset-password?token=${token}`, { newPassword });
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
