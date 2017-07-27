import { Injectable }     from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private UserService: UserService, private router: Router) {}

  canActivate(): Promise<boolean>{
    return this.UserService.whoAmI()
    .then(serverMessage => {
      if(serverMessage.code === "ok" && serverMessage.message === "admin") {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }, error =>  {
      this.router.navigate(['/']);
      return false;
    });
  }
}
