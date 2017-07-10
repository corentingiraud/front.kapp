import { Component } from '@angular/core';
import { UserService } from "app/user.service";
import { ToastOptions, ToastyService, ToastyConfig } from "ng2-toasty";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ],
})
export class AppComponent {
  message: String = "";

  constructor(private router: Router, private UserService: UserService, private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    this.toastyConfig.theme = 'bootstrap';
  }
}
