import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService} from 'angular2-cookie/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'checklist',
  templateUrl: '../templates/checklist.component.html',
  //styleUrls: ['./checklist.component.css']
  providers: [ CookieService ]
})
export class ChecklistComponent {
  title = 'Checklist';
  errorMessage: string;

  tempChecklist = 
  [
      {
          "id": 1,
          "title": "Servicios por pagar",
          "tasks": [
              { "id": "1", "name": "Electrico" },
              { "id": "2", "name": "Agua" },
              { "id": "3", "name": "Otros" }
          ]
      } 
  ];

  constructor(private cookieService:CookieService,
    private router: Router,
    private userService: UserService){
    
    //TESTING
    let token = this.getCookie("checklist_token");
    console.log('Token3: ' + token);
  }

  ngOnInit(){
      let token = this.getCookie("checklist_token");
      console.log('Token3: ' + token);

      if(!token){
        this.router.navigate(['/login']);
      }
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }

  logout(){
    let email: string = this.cookieService.get("checklist_email");
    let token: string = this.cookieService.get("checklist_token");
    this.userService.logoutUser(email, token)
      .subscribe(
        res => {
          console.log('Logout response: ');
          console.log(res);
        },
        error => {
          console.log(error);
          this.errorMessage = <any>error;
        }
      );

    //remove cookie with token
    this.cookieService.remove("checklist_token");

    this.router.navigate(['/login']);
  }
}
