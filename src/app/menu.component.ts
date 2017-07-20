import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service';
import { ServerMessage } from './ServerMessage';
import { Router } from "@angular/router";
import { ToastyService, ToastyConfig, ToastOptions } from "ng2-toasty";

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  providers: [ ],
})
export class MenuComponent implements OnInit {

  subscription: Subscription;
  isAuthenticated: boolean;
  right: string;
  isNavbarCollapsed: boolean = false;

  constructor(private router: Router, private UserService: UserService, 
              private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
     UserService.loggedIn$.subscribe(
      status => {
        this.isAuthenticated = status;
      });
     UserService.right$.subscribe(
      role => {
        this.right = role;
      });
  }

  ngOnInit(): void {
  }

  logout(){
    this.UserService.logout()
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        this.notify("success","Déconnexion réussie","");
        setTimeout(() => this.router.navigate(['/login']),2000);
      } else {
        this.notify("error","Erreur serveur", serverMessage.message);
      }
    }, error =>  {
      this.notify("error","Erreur", error);
    });
  }

  notify(type: string, titre: string, message: string){
    const toastOptions:ToastOptions = {
        title: titre,
        msg: message,
        showClose: true,
        timeout: 3000,
        theme: 'default',
    };
    switch (type){
      case "success":
        this.toastyService.success(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
    }
  }
}
