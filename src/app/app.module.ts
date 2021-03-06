import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function getTranslateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { BsTableModule } from 'es-ng-bs-table';
/* Services. */
import { Auth0Service } from '@services/auth0/auth0.service';
import { ProfileService } from '@services/profile/profile.service';
/* Components. */
import { AppComponent } from './app.component';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { ProfilesComponent } from '@components/profiles/profiles.component';
import { CallbackPageComponent } from '@components/callback-page/callback-page.component';
import { ProfileViewComponent } from '@components/profile-view/profile-view.component';
/* Guards. */
import { ScopeGuard } from '@guards/auth0/scope.guard';
import { LoginGuard } from '@guards/auth0/login.guard';
import { LogoutGuard } from '@guards/auth0/logout.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SidebarComponent,
    NotFoundPageComponent,
    ProfileComponent,
    ProfilesComponent,
    CallbackPageComponent,
    ProfileViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsTableModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (getTranslateFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    Auth0Service,
    ProfileService,
    FlashMessagesService,
    ScopeGuard,
    LoginGuard,
    LogoutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
