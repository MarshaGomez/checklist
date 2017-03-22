import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Checklist } from '../entities/checklist';


@Injectable()
export class ChecklistService {

  constructor(private http: Http) { }

  getByOwner(token:String){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.get('http://localhost:8084/ChecklistsAPI/api/checklists/users', options)
        .map(this.extractData)
        .catch(this.handleError);
  }

//   getByOwnerWithTasks(token:String){
//     let headers = new Headers({'Content-Type': 'application/json', 'token': token});
//     let options = new RequestOptions({headers: headers});
//     return this.http.get('http://localhost:8084/ChecklistsAPI/api/checklists/users', options)
//         .subscribe(
//             res => {
//                 let checklists: Checklist[] = res;

//                 checklists.forEach(thisChecklist => {

//                     this.taskService.getByChecklist(thisChecklist.id, token)
//                         .subscribe(
//                         res2 => {
//                             let tasks: Task[] = <Task[]>res2;
//                             thisChecklist.tasks = tasks;
//                         },
//                         error2 => {

//                         }
//                         );

//                 });
//             },
//             error => {

//             }
//         );
//   }

  delete(checklistId: string, token: string){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});
    return this.http.delete('http://localhost:8084/ChecklistsAPI/api/checklists/' + checklistId, options)
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

  add(checklist: Checklist, token:String){
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: checklist.name
    };

    return this.http.post('http://localhost:8084/ChecklistsAPI/api/checklists/', body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

  updateChecklist(checklist : Checklist, token : string){
      console.log("service");
      console.log(checklist);
    let headers = new Headers({'Content-Type': 'application/json', 'token': token});
    let options = new RequestOptions({headers: headers});

    let body = {
        name: checklist.name
    };

    return this.http.put('http://localhost:8084/ChecklistsAPI/api/checklists/' + checklist.id , body, options)
        .map(this.extractData)
        .catch(this.handleError);  
  }

}