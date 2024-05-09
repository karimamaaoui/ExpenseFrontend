import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    MyRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
