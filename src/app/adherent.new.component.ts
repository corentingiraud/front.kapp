import { Component, OnInit, Input } from '@angular/core';
import { AdherentService } from './adherent.service';
import { ServerMessage } from './ServerMessage';
import { Adherent } from "app/Adherent";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Router } from "@angular/router";

@Component({
  selector: 'adherents',
  templateUrl: './adherent.new.component.html',
  providers: [
    AdherentService,
  ],
})

export class AdherentNewComponent implements OnInit {
  
  message: String;
  adherent: Adherent = new Adherent;

  constructor(private router: Router, private AdherentService: AdherentService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }

  add(){
    this.AdherentService.add(this.adherent)
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        this.notify("success","Adhérent ajouté","");
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

