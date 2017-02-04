import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService} from 'angular2-cookie/core';

import { UserService } from '../services/user.service';
import { ChecklistService } from '../services/checklist.service';

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

  checklists = [];

  constructor(private cookieService:CookieService,
    private router: Router,
    private userService: UserService,
    private checklistService: ChecklistService){  }

  ngOnInit(){
      let token = this.getCookie("checklist_token");

      if(!token){
        this.router.navigate(['/login']);
      }

      console.log('Token3: ' + token);

      this.checklistService.getByOwner(token)
        .subscribe(
          res => {
            console.log('Res: ');
            console.log(res);
            this.checklists = <any>res;
          },
          error => {

          }
        );
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
