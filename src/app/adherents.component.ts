import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { AdherentService } from './adherent.service';
import { ServerMessage } from './ServerMessage';
import { Adherent } from "app/Adherent";

@Component({
  selector: 'adherents',
  templateUrl: './adherents.component.html',
  providers: [
    AdherentService,
  ],
})
export class AdherentsComponent implements OnInit {
  
  p: number = 1;
  query: String = "";
  adherentSelected: Adherent = new Adherent();
  adherents: Adherent[] = [];
  adherentsFiltered: Adherent[] = [];
  userCode: String;

  constructor(private AdherentService: AdherentService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }

  setSelected(add: Adherent){
    this.adherentSelected = add;
  }

  updateAdherent(){
    this.AdherentService.get()
    .then(adherents => {
      this.adherents = adherents;
      this.adherentsFiltered = adherents;
    }, error =>  {
      //this.message = <any>error
    });
  }

  search() {
			this.adherentsFiltered = this.adherents.filter(item => {
				return item.prenom.toLowerCase().includes(this.query.toLowerCase()) 
				|| item.nom.toLowerCase().includes(this.query.toLowerCase())
			});
		};

  delete(add: Adherent){
    this.AdherentService.delete(add, this.userCode)
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        this.notify("success","Adhérent supprimé","");
        this.updateAdherent();
      } else {
        this.notify("error","Erreur serveur", serverMessage.message);
      }
    }, error =>  {
      this.notify("error","Erreur", error);
    });
    this.userCode = "";
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
    this.updateAdherent();
  }
}

