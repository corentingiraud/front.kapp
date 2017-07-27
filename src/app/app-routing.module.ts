import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login.component';
import { AdherentsComponent }   from './adherents.component';
import { AdherentNewComponent }   from './adherent.new.component';

import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { UserNewComponent } from "app/user.new.component";

const routes: Routes = [
  { path: '', redirectTo: '/adherents', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'adherents',  component: AdherentsComponent,  canActivate: [AuthGuard]},
  { path: 'adherents/new',  component: AdherentNewComponent, canActivate: [AuthGuardAdmin]},
  { path: 'users/new',  component: UserNewComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/adherents', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers: [AuthGuard],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
