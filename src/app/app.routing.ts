import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { YourChoiseComponent } from './routes/your-choise/your-choise.component';
import { LoginComponent } from './routes/login/login.component';
import { PasswordComponent } from './routes/password/password.component';
import { UserComponent } from './routes/user/user.component';
import { AuthGuard } from './core/auth.guard';
import {
    AdminComponent,
    AdminSurveyComponent,
    AdminUserComponent,
} from './routes/admin';
import { NotfoundComponent } from './routes/notfound/notfound.component';
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './routes/reset-password/reset-password.component';
import { AdminOrderComponent } from './routes/admin/admin-order/admin-order.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'your-quote',
        component: YourChoiseComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'verify-password/:id',
        component: PasswordComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'reset-password/:id',
        component: ResetPasswordComponent,
    },
    {
        path: 'user/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'users',
                component: AdminUserComponent,
            },
            {
                path: 'survey',
                component: AdminSurveyComponent,
            },
            {
                path: 'order',
                component: AdminOrderComponent
            }
        ],
    },
    {
        path: '**',
        component: NotfoundComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}
