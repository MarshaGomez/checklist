import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Issue } from '../entities/issue';

@Injectable()
export class IssueService {

  constructor(private http: Http) { }

  getByTask(taskId: string, token:String){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://localhost:8084/ChecklistsAPI/api/issues/tasks/' + taskId, options)
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

  add(issue: Issue, taskId: String, token:String){
      let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: issue.name,
        description: issue.description,
        resolved: issue.resolved
    };
    return this.http.post('http://localhost:8084/ChecklistsAPI/api/issues/tasks/' + taskId, body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

  delete(issueId: string, token: string){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.delete('http://localhost:8084/ChecklistsAPI/api/issues/' + issueId, options)
        .map(
            res => {
                console.log('Server Response: ');
                console.log(res);
                return res || {};
            })
        .catch(this.handleError);
  }

  resolve(issueId: string, token: string, resolved: boolean){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.put('http://localhost:8084/ChecklistsAPI/api/issues/' + issueId + '/resolved?resolved=' + !resolved, '', options)
        .map(
            res => {
                console.log('Server Response: ');
                console.log(res);
                return res || {};
            })
        .catch(this.handleError);
  }

  update(issue: Issue, token: string ){
      let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: issue.name,
        description: issue.description
    };

    return this.http.put('http://localhost:8084/ChecklistsAPI/api/issues/' + issue.id , body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

}