import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private UserService: UserService) {}

  canActivate(): Promise<boolean>{
    return this.UserService.whoAmI()
    .then(serverMessage => {
      if(serverMessage.code === "ok") {
        return true;
      } else {
        return false;
      }
    }, error =>  {
      return false;
    });
  }
}
