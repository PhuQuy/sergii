import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './core/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './routes/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { YourChoiseComponent } from './routes/your-choise/your-choise.component';
import { LoginComponent } from './routes/login/login.component';
import { PasswordComponent } from './routes/password/password.component';
import { UserComponent } from './routes/user/user.component';
import { ADMIN_COMPONENTS } from './routes/admin';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './routes/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    YourChoiseComponent,
    LoginComponent,
    PasswordComponent,
    UserComponent,
    ADMIN_COMPONENTS,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ AuthGuard ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
