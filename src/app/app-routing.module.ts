import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@environments/environment';
/* Components. */
import { HomePageComponent } from '@components/home-page/home-page.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { ProfilesComponent } from '@components/profiles/profiles.component';
import { CallbackPageComponent } from '@components/callback-page/callback-page.component';
/* Guards. */
import { LoginGuard } from '@guards/auth0/login.guard';
import { ScopeGuard } from '@guards/auth0/scope.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'callback', component: CallbackPageComponent, canActivate: [LoginGuard] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ScopeGuard],
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
