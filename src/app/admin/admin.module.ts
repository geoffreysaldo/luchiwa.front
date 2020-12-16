import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminConnectionPageComponent } from './components/admin-connection-page/admin-connection-page.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthAdminService } from './services/auth-admin.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AutoLoginResolver } from './services/auto-login.resolver';
import { ProductPageComponent } from './components/product-page/product-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminConnectionPageComponent,
    OrdersPageComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ThemeModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [
    AuthAdminService,
    AuthGuardService,
    AutoLoginResolver,
  ],
})

export class AdminModule { }