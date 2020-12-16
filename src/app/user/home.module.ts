import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import {ThemeModule} from '../theme/theme.module';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { ConnectionPageComponent } from './components/connection-page/connection-page.component';
import { InscriptionPageComponent } from './components/inscription-page/inscription-page.component';
import { AuthService } from './services/auth.service';
import { ValidationPageComponent } from './components/validation-page/validation-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { UpdatePasswordPageComponent } from './components/update-password-page/update-password-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { UserInterceptorService } from './services/user-interceptor.service';

@NgModule({
  declarations: [
    HomePageComponent,
    ConnectionPageComponent,
    InscriptionPageComponent,
    ValidationPageComponent,
    ForgetPasswordPageComponent,
    UpdatePasswordPageComponent,
    AccountPageComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    HttpClientModule,
    ThemeModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule

  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true}
  ],
})

export class HomeModule { }