import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { YourQuoteComponent } from './routes/your-quote/your-quote.component';
import { YourChoiseComponent } from './routes/your-choise/your-choise.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'your-quote', component: YourQuoteComponent },
  { path: 'your-answer', component: YourChoiseComponent }

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
