import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService} from 'angular2-cookie/core';

import { UserService } from '../services/user.service';
import { ChecklistService } from '../services/checklist.service';
import { TaskService } from '../services/task.service';
import { Checklist } from '../entities/checklist';
import { Task } from '../entities/task';

@Component({
  moduleId: module.id,
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

  checklists: any[] = [];
  tasks: any[] = [];
  newChecklistName: string;
  taskToAdd : Task;
  taskToUpdate : Task;

  selectedChecklistId: string = '5c23d71f-f49c-4398-93e2-bbfcf324e916';

  constructor(private cookieService:CookieService,
    private router: Router,
    private userService: UserService,
    private checklistService: ChecklistService,
    private taskService: TaskService){
      
    }
  
  ngOnInit(){
      let token = this.getCookie("checklist_token");
      this.taskToAdd = new Task;
      this.taskToUpdate = new Task;
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

  selectChecklist(checklist: Checklist){
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    this.selectedChecklistId = checklist.id;
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

  deleteTask(task: Task){
    if(!task || !task.id){
      return;
    }

    let token = this.getCookie("checklist_token");

    if(!token){
      this.router.navigate(['/login']);
    }

    this.taskService.delete(task.id, token)
      .subscribe(
        res => {
          console.log('Removed');
          console.log(res);        

          for(var i = 0; i < this.tasks.length; i++) {
              let taskToDelete: Task = this.tasks[i];
              if(taskToDelete.id == task.id){
                this.tasks.splice(i, 1);
                break;
              }
          }
        },
        error => {
          console.log('Delete error');
        }
      );
  }

  addChecklist(){
    if(!this.newChecklistName || this.newChecklistName == ""){
      return;
    }

    let token = this.getCookie("checklist_token");

    if(!token){
      this.router.navigate(['/login']);
    }

    let newChecklist: Checklist = new Checklist();
    newChecklist.title = this.newChecklistName;

    this.checklistService.add(newChecklist, token)
      .subscribe(
        res => {
          console.log('Checklist added');
          this.checklists.push(res);
          this.newChecklistName = "";
        },
        error => {
          console.log('Add checklist error');
        }
      );
  }

  // addTask() {
  //   this.modal.prompt()
  //       .size('lg')
  //       .showClose(true)
  //       .title('A simple Alert style modal window')
  //       .body(`
  //             <br/><br/>
  //             <input type="text" [(ngModel)]="taskToAdd.name" placeholder="New task name">
  //             <br/><br/>
  //       `)
  //       .open().catch(err => alert("ERROR")) // catch error not related to the result (modal open...)
  //           .then(dialog => (<any>dialog).result) // dialog has more properties,lets just return the promise for a result. 
  //           .then(result => this.test()) // if were here ok was clicked.
  //           .catch(err => {console.log("Error modal");}); // if were here it was cancelled (click or non block click);
  // }

  newTask(){
    if(!this.taskToAdd.name || this.taskToAdd.name == "" || !this.taskToAdd.description || this.taskToAdd.description == "" ){
      return;
    }
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    this.taskService.add(this.taskToAdd, token, this.selectedChecklistId)
        .subscribe(
            res => {
              console.log('Task added');
              this.tasks.push(res);
              this.taskToAdd.id = "";
              this.taskToAdd.name = "";
              this.taskToAdd.description = "";
        },
        error => {
          console.log('New Task error');
        }
      );

  }

  completeTask(task: Task) {
    console.log('TaskId to complete' + task.id);
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    this.taskService.complete(task.id, token, task.completed)
      .subscribe(
            res => {
              console.log('Task Completed');
              console.log(res);
        },
        error => {
          console.log('Completed Task error');
        }
      );
  }

  setTaskData(task:Task){
    this.taskToUpdate = Object.assign(new Task, task);
  }

  updateTask(){
    console.log('TaskId to update ' + this.taskToUpdate.id);
    if(!this.taskToUpdate.name || this.taskToUpdate.name == "" || !this.taskToUpdate.description || this.taskToUpdate.description == "" ){
      return;
    }
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    this.taskService.updateTask(this.taskToUpdate, token)
    .subscribe(
            res => {
              console.log('Task updated');
              for(var i = 0; i < this.tasks.length; i++) {
                if(this.taskToUpdate.id == this.tasks[i].id){
                  this.tasks[i] = Object.assign(new Task, this.taskToUpdate);
                  break;
                }
              }
              this.taskToUpdate.id = "";
              this.taskToUpdate.name = "";
              this.taskToUpdate.description = "";
        },
        error => {
          console.log('Update Task error');
        }
      );
  }

}
