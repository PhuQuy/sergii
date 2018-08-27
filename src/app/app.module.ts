import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthGuard } from './core/auth.guard';
import { AdminAuthGuard } from './core/adminAuth.guard';

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
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './routes/reset-password/reset-password.component';
import { ComfirmationModalComponent } from './components/comfirmation-modal/comfirmation-modal.component';
import { AdminOrderComponent } from './routes/admin/admin-order/admin-order.component';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';

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
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminOrderComponent,
    ComfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,
    NgbModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [ComfirmationModalComponent],
  providers: [ AuthGuard, AdminAuthGuard ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
