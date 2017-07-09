import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { ServerMessage } from './ServerMessage';
import { ToastyService, ToastyConfig, ToastOptions } from "ng2-toasty";
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [
    UserService,
  ],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private router: Router, private UserService: UserService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }
  
  login(){
    this.UserService.connect(this.username, this.password)
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        this.notify("success","Connexion réussie","");
        setTimeout(() => this.router.navigate(['/adherents']),2000);
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

  ngOnInit(): void {
  }
}
