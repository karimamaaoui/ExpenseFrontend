import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { authtokenInterceptor } from './authtoken.interceptor';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyRouting,
   // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    ToastrModule.forRoot(), 
  ],
  providers: [provideHttpClient(withInterceptors([authtokenInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
