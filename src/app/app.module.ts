import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localstorage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { NewMessageComponent } from './new-message/new-message.component';
import { ViewMessageComponent } from './view-message/view-message.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'messages', canActivate: [AuthGuardService], component: MessagesComponent },
  { path: 'messages/new', canActivate: [AuthGuardService], component: NewMessageComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    RegisterComponent,
    NewMessageComponent,
    ViewMessageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    LocalStorageService,
    AuthService,
    UserService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
//    {
//      provide: HTTP_INTERCEPTORS,
//      useClass: JwtInterceptor,
//      multi: true
//    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
