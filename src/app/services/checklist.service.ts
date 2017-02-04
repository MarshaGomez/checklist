import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChecklistService {

  constructor(private http: Http) { }

  getByOwner(token:String){
    //token = '78db325a-7599-40dd-93f1-3d5324aeffbd';
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://localhost:8084/ChecklistsAPI/api/checklists/users', options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: any){
      console.log('Server Response: ');
      console.log(res);
      let body = JSON.parse(res._body);
      return body || {};
  }

  private handleError(error: any) {
        console.log('ERROR!');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}