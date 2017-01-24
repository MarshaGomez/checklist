import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { User } from '../entities/user';

@Injectable()
export class UserService{
    private usersApiUrl = 'http://localhost:8084/ChecklistsAPI/api/users/';

    constructor(private http: Http){
        
    }

    // getUser(id: number): Observable<User>{
    //     let body = { token: 'TO-DO' };
    //     let headers = new Headers({'Content-Type': 'application/json'});
    //     let options = new RequestOptions({headers: headers});

    //     return this.http.get(this.usersApiUrl + id, options)
    // }

    addUser(user: User): Observable<User>{
        let body = { 
            //token: 'TO-DO',
            id: user.id,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
        let headers = new Headers({'Content-Type': 'application/json', 'token': '1'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.usersApiUrl + 'save', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response){
        let body = res.json();
        return body || {};
    }
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}