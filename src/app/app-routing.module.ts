import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login.component';
import { AdherentsComponent }   from './adherents.component';
import { AdherentNewComponent }   from './adherent.new.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'adherents',  component: AdherentsComponent },
  { path: 'adherents/new',  component: AdherentNewComponent },
  { path: '**', redirectTo: '/adherents', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
