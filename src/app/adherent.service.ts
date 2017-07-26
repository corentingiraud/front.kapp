import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { ServerMessage } from './ServerMessage';
import { Adherent } from "app/Adherent";
import { environment } from "../environments/environment";

@Injectable()
export class AdherentService {
  private apiUrl = environment.apiUrl;
 
  constructor (private http: Http) {}

  get(): Promise<Adherent[]> {
    return this.http.get(this.apiUrl+"/adherents/", { withCredentials: true })
              .toPromise()
              .then(this.extractData)
              .catch(this.handleError);
  }
  add(add: Adherent, code: any): Promise<ServerMessage> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.apiUrl+"/adherents/new?code="+code, JSON.stringify(add), options)
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

  delete(add: Adherent, code: any): Promise<ServerMessage> {
    return this.http.delete(this.apiUrl+"/adherents/"+add._id+"?code="+code, { withCredentials: true })
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
