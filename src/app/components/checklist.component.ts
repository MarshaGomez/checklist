import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService} from 'angular2-cookie/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { UserService } from '../services/user.service';
import { ChecklistService } from '../services/checklist.service';
import { TaskService } from '../services/task.service';
import { Checklist } from '../entities/checklist';
import { Task } from '../entities/task';
import { NotesDialogComponent } from './notes.dialog.component';
import { AddTaskDialogComponent } from './add.task.dialog.component';
import { UpdateTaskDialogComponent } from './update.task.dialog.component';
import { DeleteTaskDialogComponent } from './delete.task.dialog.component';
import { DeleteChecklistDialogComponent } from './delete.checklist.dialog.component';
import { UpdateChecklistDialogComponent } from './update.checklist.dialog.component';


@Component({
  moduleId: module.id,
  selector: 'checklist',
  templateUrl: '../templates/checklist.component.html',
  styleUrls: [ '../../assets/css/demo.css', 
      '../../assets/css/pixeladmin.css', 
      '../../assets/css/frost.css' ],
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
  selectedChecklist: Checklist;
  checklistToUpdate: Checklist;

  //selectedChecklistId: string;
  //selectedChecklistName: string;

  constructor(private cookieService:CookieService,
    private router: Router,
    private userService: UserService,
    private checklistService: ChecklistService,
    private taskService: TaskService,
    private dialogService: DialogService){
      
    }
  
  ngOnInit(){
      let token = this.getCookie("checklist_token");
      this.taskToAdd = new Task();
      this.taskToUpdate = new Task();
      this.selectedChecklist = new Checklist();
      this.checklistToUpdate = new Checklist();
      if(!token){
        this.router.navigate(['/login']);
      }

      this.checklistService.getByOwner(token)
        .subscribe(
          res => {
            this.checklists = <any>res;
          },
          error => {

          }
        );

      this.taskService.getByChecklist(this.selectedChecklist.id, token)
        .subscribe(
          res => {
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
    this.selectedChecklist = checklist;
    this.taskService.getByChecklist(this.selectedChecklist.id, token)
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
    newChecklist.name = this.newChecklistName;

    this.checklistService.add(newChecklist, token)
      .subscribe(
        res => {
          console.log('Checklist added');
          this.selectedChecklist = res;
          this.checklists.push(res);
          this.newChecklistName = "";
        },
        error => {
          console.log('Add checklist error');
        }
      );
  }

  newTask(){
    if(!this.taskToAdd.name || this.taskToAdd.name == "" || !this.taskToAdd.description || this.taskToAdd.description == "" ){
      return;
    }
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    this.taskService.add(this.taskToAdd, token, this.selectedChecklist.id)
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

  showAddTaskModal() {
      let disposable = this.dialogService.addDialog(AddTaskDialogComponent, {
          title:'Add task', 
          message:'Enter name and description'})
          .subscribe((result)=>{
              if(result){
                this.taskToAdd.name = result.name;
                this.taskToAdd.description = result.description;
                this.newTask();
              }else {
                  
              }
              
          });
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
      // setTimeout(()=>{
      //     disposable.unsubscribe();
      // },10000);
  }

  showUpdateTaskModal(task:Task) {
      this.taskToUpdate = Object.assign(new Task, task);
      let disposable = this.dialogService.addDialog(UpdateTaskDialogComponent, {
          title:'Task Information',
          task: this.taskToUpdate,
          taskId: this.taskToUpdate.id, 
          name:this.taskToUpdate.name, 
          description:this.taskToUpdate.description })
          
          .subscribe((result)=>{
              if(result){
                this.taskToUpdate.name = result.name;
                this.taskToUpdate.description = result.description;
                this.updateTask();
              }else {
              }
              
          });
  }

  showDeleteTaskModal(task: Task){
    let disposable = this.dialogService.addDialog(DeleteTaskDialogComponent, {
          title:'Delete task', 
          message:'Are you sure you want to the task "' + task.name + '"', name:this.taskToUpdate.name, description:this.taskToUpdate.description })
          .subscribe((result)=>{
              if(result){
                this.deleteTask(task);
              }              
          });
  }

  showDeleteCheckListModal(checklist: Checklist){
    let disposable = this.dialogService.addDialog(DeleteChecklistDialogComponent, {
          title:'Delete checklist', 
          message:'Are you sure you want to delete the checklist "' + checklist.name + '"'})
          .subscribe((result)=>{
              if(result){
                this.deleteChecklist(checklist);
              }              
          });
  }

  showUpdateChecklistModal(checklist: Checklist) {
      this.checklistToUpdate = Object.assign(new Checklist, checklist);
      let disposable = this.dialogService.addDialog(UpdateChecklistDialogComponent, {
          title:'Update checklist', 
          message:'Enter checklist name', name:this.checklistToUpdate.name})
          .subscribe((result)=>{
              if(result){
                this.checklistToUpdate.name = result.name;
                console.log("Result" + result.name);
                this.editChecklistName();
              }else {
              }
          });
  }

  editChecklistName(){
    
    if(!this.selectedChecklist.id || this.selectedChecklist.id == "" || !this.selectedChecklist.name || this.selectedChecklist.name == "" ){
      return;
    }
    let token = this.getCookie("checklist_token");
    if(!token){
      this.router.navigate(['/login']);
    }
    
    this.checklistService.updateChecklist(this.checklistToUpdate, token)
    .subscribe(
            res => {
              for(var i = 0; i < this.checklists.length; i++) {
                if(this.checklistToUpdate.id == this.checklists[i].id){
                  this.checklists[i] = Object.assign(new Checklist, this.checklistToUpdate);
                  this.selectedChecklist = this.checklists[i];
                  break;
                }
              }
              this.checklistToUpdate.id = "";
              this.checklistToUpdate.name = "";
              this.checklistToUpdate.tasks = [];
        },
        error => {
          console.log('Update Checklist error');
        }
      );
  }
}
