import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { YourChoiseComponent } from './routes/your-choise/your-choise.component';
import { LoginComponent } from './routes/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'your-quote', component: YourChoiseComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
