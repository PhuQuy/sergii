import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './core/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './routes/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { YourChoiseComponent } from './routes/your-choise/your-choise.component';
import { LoginComponent } from './routes/login/login.component';
import { PasswordComponent } from './routes/password/password.component';
import { UserComponent } from './routes/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    YourChoiseComponent,
    LoginComponent,
    PasswordComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
