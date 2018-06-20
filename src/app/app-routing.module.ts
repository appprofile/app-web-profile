import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@environments/environment';
/* Components. */
import { HomePageComponent } from '@components/home-page/home-page.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { ProfileViewComponent } from '@components/profile-view/profile-view.component';
import { ProfilesComponent } from '@components/profiles/profiles.component';
import { CallbackPageComponent } from '@components/callback-page/callback-page.component';
/* Guards. */
import { LoginGuard } from '@guards/auth0/login.guard';
import { ScopeGuard } from '@guards/auth0/scope.guard';
import { LogoutGuard } from '@guards/auth0/logout.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [LogoutGuard] },
  { path: 'callback', component: CallbackPageComponent, canActivate: [LoginGuard] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ScopeGuard],
    data: { expectedScopes: environment.auth0.scope.split(' ') }
  },
  {
    path: 'profile/:id', component: ProfileViewComponent, canActivate: [ScopeGuard],
    data: { expectedScopes: environment.auth0.scope.split(' ') }
  },
  {
    path: 'profiles', component: ProfilesComponent, canActivate: [ScopeGuard],
    data: { expectedScopes: environment.auth0.scope.split(' ') }
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
