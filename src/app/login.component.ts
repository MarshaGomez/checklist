import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'//,
  //styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login';
  userEmail: string;
  userPassword: string;
  errorMessage: string;
  tokenId: string;

  constructor(private router: Router, private userService: UserService){}

  onLogin(){
    if(!this.userEmail || !this.userPassword){
      return;
    }
    this.userService.loginUser(this.userEmail, this.userPassword)
        .subscribe(//revisar
          login => {
            this.tokenId = login.tokenId;
          },
          error => this.errorMessage = <any>error
        );


    let link = ['/checklist'];
    this.router.navigate(link);
  }
}
