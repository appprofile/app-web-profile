import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components. */
import { HomePageComponent } from '@components/home-page/home-page.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { RegisterPageComponent } from '@components/register-page/register-page.component';
import { CallbackPageComponent } from '@components/callback-page/callback-page.component';
/* Guards. */
import { LogoutGuard } from '@guards/auth0/logout.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'callback', component: CallbackPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent, canActivate: [LogoutGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
