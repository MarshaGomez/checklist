import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'//,
  //styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'Login';

  constructor(private router: Router){}

  onLogin(){
    let link = ['/checklist'];
    this.router.navigate(link);
  }
}
