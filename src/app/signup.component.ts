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
    id: '1',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName'
  };
  errorMessage: string;

  constructor(private router: Router, private userService: UserService){}

  onSignup(){

    if (!this.user || !this.user.id) { return; }

    this.userService.addUser(this.user)
            .subscribe(
                user  => { 
                    //TODO: 
                 },
                error =>  this.errorMessage = <any>error
                );

    //Redirect to edit key page
    let link = ['/checklist'];
    this.router.navigate(link);
    
  }
}
