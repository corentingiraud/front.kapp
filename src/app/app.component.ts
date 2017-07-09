import { Component } from '@angular/core';
import { UserService } from "app/user.service";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService,
  ],
})
export class AppComponent {
  message: String = "";

  constructor(private router: Router, private UserService: UserService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }

  deconnexion(){
    console.log("Deconnexion");
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
