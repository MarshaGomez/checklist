'use strict'

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './entities/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'//,
  //styleUrls: ['./signup.component.css']
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

  constructor(private router: Router, private userService: UserService){}

  onSignup(){

    if (!this.user) { return; }

    this.userService.addUser(this.user)
            .subscribe(
                user  => { 
                    //Redirect to main page
                    console.log('User: ');
                    console.log(user);
                    let link = ['/checklist'];
                    this.router.navigate(link); 
                 },
                error => { 
                  console.log(error);
                  this.errorMessage = <any>error
                  }
                );
    
  }
}
