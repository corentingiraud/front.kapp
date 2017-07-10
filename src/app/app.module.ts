import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import {ToastyModule} from 'ng2-toasty';

import { AppComponent } from './app.component';

import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent }      from './login.component';
import { AdherentsComponent }   from './adherents.component';
import { AdherentNewComponent }   from './adherent.new.component';
import { MenuComponent }   from './menu.component';
import { UserService } from "app/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdherentsComponent,
    AdherentNewComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, 
    ToastyModule.forRoot(),
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent],
  exports: [BrowserModule, ToastyModule]
})
export class AppModule { }
