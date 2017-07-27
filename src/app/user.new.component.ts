import { Component, OnInit, Input } from '@angular/core';
import { ServerMessage } from './ServerMessage';
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Router } from "@angular/router";
import { User } from "app/User";
import { UserService } from "app/user.service";

@Component({
  selector: 'user',
  templateUrl: './user.new.component.html',
  providers: [
    UserService
  ],
})

export class UserNewComponent implements OnInit {
  
  promptMessage: any;
  message: String;
  user: User = new User;
  userCode: String;

  constructor(private router: Router, private UserService: UserService, 
  private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }

  add(user: User){
    this.UserService.add(this.user)
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        this.notify("success","Utilisateur ajouté","");
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

