import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Task } from '../entities/task';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getByChecklist(checklistId: string,  token:String){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://localhost:8084/ChecklistsAPI/api/tasks/checklists/' + checklistId, options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  delete(taskId: string, token: string){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.delete('http://localhost:8084/ChecklistsAPI/api/tasks/' + taskId, options)
        .map(
            res => {
                console.log('Server Response: ');
                console.log(res);
                return res || {};
            })
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

  add(task: Task, token:String, checklistId: string){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: task.name,
        description: task.description
    };

    return this.http.post('http://localhost:8084/ChecklistsAPI/api/tasks/checklists/' + checklistId , body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

  complete(taskId : string, token : string, completed : boolean){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
    };
    return this.http.put('http://localhost:8084/ChecklistsAPI/api/tasks/' + taskId + '/completed?completed=' + !completed , body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

  updateTask(task : Task, token : string){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: task.name,
        description: task.description
        // reminder: task.,
        // expires: task.
    };

    return this.http.put('http://localhost:8084/ChecklistsAPI/api/tasks/' + task.id , body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

}