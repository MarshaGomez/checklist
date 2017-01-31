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

    addUser(user: User){
        let body = { 
            //token: 'TO-DO',
            // id: user.id,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
        let headers = new Headers({'Content-Type': 'application/json', 'token': '1'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.usersApiUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    loginUser(email:String, password:String){
        let body = {
            email: email,
            password: password
        }
        let headers = new Headers({'Content-Type': 'application/json', 'token': '1'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.usersApiUrl + 'login', body, options)
            .map(this.returnToken)
            .catch(this.handleError);
    }

    logoutUser(id:String, token:String){
        let headers = new Headers({'Content-Type': 'application/json', 'token': token});
        let options = new RequestOptions({headers: headers});
        return this.http.get('http://localhost:8084/ChecklistsAPI/api/logout/' + id, options)
            .map(this.returnToken)
            .catch(this.handleError);
    }

    private extractData(res: any){
        console.log('Server Response: ');
        console.log(res);
        let body = JSON.parse(res._body);
        return body || {};
    }

    private returnToken(res: Response){
        return res;
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