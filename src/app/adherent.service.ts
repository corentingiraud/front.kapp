import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ServerMessage } from './ServerMessage';
import { Adherent } from "app/Adherent";

@Injectable()
export class AdherentService {
  private userURL = 'api/adherents';
 
  constructor (private http: Http) {}

  get(): Promise<Adherent[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get(this.userURL, options)
              .toPromise()
              .then(this.extractData)
              .catch(this.handleError);
  }
  add(add: Adherent, code: any): Promise<ServerMessage> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.userURL+"/new?code="+code, JSON.stringify(add), options)
      .toPromise()
      .then(this.extractData)
      .then(body => {
        let response = new ServerMessage();
        response.code = body.code;
        response.message = body.message;
        return response;
      })
      .catch(this.handleError);
  }

  delete(add: Adherent): Promise<ServerMessage> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.delete(this.userURL+"/"+add._id, options)
      .toPromise()
      .then(this.extractData)
      .then(body => {
        let response = new ServerMessage();
        response.code = body.code;
        response.message = body.message;
        return response;
      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return  body || {};
  }
 
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
  
}
