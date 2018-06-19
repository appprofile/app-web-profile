import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function getTranslateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { AppRoutingModule } from './app-routing.module';
/* Services. */
import { Auth0Service } from '@services/auth0/auth0.service';
/* Components. */
import { AppComponent } from './app.component';
import { HomePageComponent } from '@components/home-page/home-page.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { NotFoundPageComponent } from '@components/not-found-page/not-found-page.component';
import { RegisterPageComponent } from '@components/register-page/register-page.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { CallbackPageComponent } from '@components/callback-page/callback-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    ProfileComponent,
    CallbackPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (getTranslateFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    Auth0Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
