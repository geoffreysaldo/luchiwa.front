import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { AdminHeaderComponent} from './components/admin-header/admin-header.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
  ],
  exports:[
    HomeHeaderComponent,
    AdminHeaderComponent,
],
  providers: [],
})

export class ThemeModule { }