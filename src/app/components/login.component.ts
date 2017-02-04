import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {CookieService} from 'angular2-cookie/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'login',
  templateUrl: '../templates/login.component.html',
  //styleUrls: ['./login.component.css']
  providers: [ CookieService ]
})
export class LoginComponent {
  title = 'Login';
  userEmail: string;
  userPassword: string;
  errorMessage: string;
  tokenId: string;

  constructor(private router: Router, 
    private userService: UserService,
    private cookieService:CookieService){}

  getCookie(key: string){
    return this.cookieService.get(key);
  }

  setCookie(key: string, value: string){
    return this.cookieService.put(key, value);
  }

  onLogin(){
    // if(!this.userEmail || !this.userPassword){
    //   return;
    // }
    this.userService.loginUser(this.userEmail, this.userPassword)
        .subscribe(
          res => {
            console.log('Token: ');
            console.log(res._body);
            let token = res._body;
            this.setCookie("checklist_token", token);
            this.setCookie("checklist_email", this.userEmail);

            let token2 = this.getCookie("checklist_token");
            console.log('Token2: ' + token2);
            
            //Redirect to main page
            let link = ['/checklist'];
            this.router.navigate(link);
          },
          error => {
            console.log(error);
            this.errorMessage = <any>error;
          }
        );
  }
}
