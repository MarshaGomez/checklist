'use strict'

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';

import { User } from '../entities/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'signup',
  templateUrl: '../templates/signup.component.html',
  //styleUrls: ['./signup.component.css'],
  providers: [ CookieService ]
})
export class SignupComponent {
  title = 'Sign up';
  user: User = {
    //id: '0',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
  };
  errorMessage: string;

  constructor(private router: Router, 
    private userService: UserService, 
    private cookieService: CookieService){}

  onSignup(){

    if (!this.user) { return; }

    this.userService.addUser(this.user)
            .subscribe(
                response  => { 
                    if(!response.id){
                      console.log('Response: ');
                      console.log(response);
                      if(response["message"]){
                        this.errorMessage = response.message;
                      }
                    }
                    else{
                      //Redirect to login page
                      console.log('User: ');
                      console.log(response);
                      let link = ['/login'];
                      this.router.navigate(link);
                    } 
                 },
                error => { 
                  console.log(error);
                  this.errorMessage = <any>error
                  }
                );
    
  }
}
