import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService} from 'angular2-cookie/core';

import { UserService } from '../services/user.service';
import { ChecklistService } from '../services/checklist.service';
import { TaskService } from '../services/task.service';
import { Checklist } from '../entities/checklist';

@Component({
  selector: 'checklist',
  templateUrl: '../templates/checklist.component.html',
  //styleUrls: ['./checklist.component.css']
  providers: [ CookieService ]
})
export class ChecklistComponent {
  title = 'Checklist';
  errorMessage: string;

  //TODO: delete, directive test
  line_through: boolean = false;

  checklists = [];
  tasks = [];

  selectedChecklistId: string = '5c23d71f-f49c-4398-93e2-bbfcf324e916';

  constructor(private cookieService:CookieService,
    private router: Router,
    private userService: UserService,
    private checklistService: ChecklistService,
    private taskService: TaskService){  }

  ngOnInit(){
      let token = this.getCookie("checklist_token");

      if(!token){
        this.router.navigate(['/login']);
      }

      console.log('Token3: ' + token);

      this.checklistService.getByOwner(token)
        .subscribe(
          res => {
            console.log('Checklists Res: ');
            console.log(res);
            this.checklists = <any>res;
          },
          error => {

          }
        );

      this.taskService.getByChecklist(this.selectedChecklistId, token)
        .subscribe(
          res => {
            console.log('Tasks Res: ');
            console.log(res);
            this.tasks = <any>res;
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

  deleteChecklist(checklist: Checklist){
    if(!checklist || !checklist.id){
      return;
    }

    console.log('Delete 1');

    let token = this.getCookie("checklist_token");

    if(!token){
      this.router.navigate(['/login']);
    }

    this.checklistService.delete(checklist.id, token)
      .subscribe(
        res => {
          console.log('Removed');
          console.log(res);        

          for(var i = 0; i < this.checklists.length; i++) {
              let checklistToDelete: Checklist = this.checklists[i];

              if(checklistToDelete.id == checklist.id){
                this.checklists.splice(i, 1);
                break;
              }
          }

          // this.checklistService.getByOwner(token)
          //   .subscribe(
          //     res2 => {
          //       this.checklists = <any>res2;
          //     },
          //     error => {

          //     }
          //   );
        },
        error => {
          console.log('Delete error');
        }
      );
  }

  

}
