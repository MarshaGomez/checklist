import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { CookieService } from 'angular2-cookie/core';

import { AddNoteDialogComponent } from './add.note.dialog.component';
import { ShowNotesDialogComponent } from './show.notes.dialog.component';
import { Note } from '../entities/note';
import { Task } from '../entities/task';
import { Issue } from '../entities/issue';
import { NoteService } from '../services/note.service';
 
@Component({  
    selector: 'confirm',
    template: ` <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" (click)="close()" >&times;</button>
                    <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                </div>
                <div class="modal-body">
                    <input type="text" [(ngModel)]="name" placeholder="task name">
                    <input type="text" [(ngModel)]="description" placeholder="task description">

                    <div>
                        <br/>
                        <label>Notes:</label>
                        <button type="button" (click)="showNotesModal()">Show</button>
                        <button type="button" (click)="showAddNoteModal()">Add</button>
                    </div>

                    <div>
                        <br/>
                        <label>Issues:</label>
                        <button type="button" (click)="showIssuesModal()">Show</button>
                        <button type="button" (click)="showAddIssueModal()">Add</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                    <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                </div>
                </div>`,
    providers: [ CookieService ]
})
export class UpdateTaskDialogComponent extends DialogComponent {

    name: string;
    description: string;
    taskId: string;
    obj: {};

    // notes: any[] = [];
    noteToAdd: Note;
    issueToAdd: Issue;
    //currentTask: Task;

    constructor(dialogService: DialogService,
        private cookieService:CookieService,
        private router: Router,
        private noteService: NoteService) {

        super(dialogService);
    }

    ngOnInit(){
        this.noteToAdd = new Note();
        this.issueToAdd = new Issue();
        //this.currentTask = new Task();
    }

    getCookie(key: string){
        return this.cookieService.get(key);
    }

    confirm() {
        this.obj = {
            name: this.name,
            description: this.description,
            ok: true
        }

        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    }

    showNotesModal(){
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }

        let notes: any[] = [];
        this.noteService.getByEntity(this.taskId, 'task', token)
            .subscribe(
                res => {
                    notes = res;
                    console.log('Notes 1: ');
                    console.log(notes);

                    let disposable = this.dialogService.addDialog(ShowNotesDialogComponent, {
                    title:'Notes', 
                    notes: notes })
                    .subscribe((result)=>{
                        if(result){

                        }else {
                            
                        }
                        
                    });
            },
            error => {
                console.log('Add note error');
            }
        );

    }

    showAddNoteModal(){
        let disposable = this.dialogService.addDialog(AddNoteDialogComponent, {
          title:'New note' })
          .subscribe((result)=>{
              if(result){
                this.noteToAdd.name = result.name;
                this.noteToAdd.text = result.text;
                this.addNote();
              }else {
                  
              }
              
          });
      //We can close dialog calling disposable.unsubscribe();
      //If dialog was not closed manually close it by timeout
    //   setTimeout(()=>{
    //       disposable.unsubscribe();
    //   },10000);
    }

    addNote(){
        if(!this.noteToAdd.name || this.noteToAdd.name == "" || !this.noteToAdd.text || this.noteToAdd.text == "" ){
            return;
        }
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        this.noteService.add(this.noteToAdd, this.taskId, 'task', token)
            .subscribe(
                res => {
                console.log('Note created');
                console.log(res);
                //this.notes.push(res);
                this.noteToAdd = new Note();
            },
            error => {
                console.log('Add note error');
            }
        );
    }

    showIssuesModal(){

    }

    showAddIssueModal(){
        // if(!this.issueToAdd.name || this.issueToAdd.name == "" || !this.issueToAdd.description || this.issueToAdd.description == "" ){
        //     return;
        // }
        // let token = this.getCookie("checklist_token");
        // if(!token){
        //     this.router.navigate(['/login']);
        // }
        // this.issueService.add(this.noteToAdd, this.taskId, 'task', token)
        //     .subscribe(
        //         res => {
        //         console.log('Note created');
        //         console.log(res);
        //         //this.notes.push(res);
        //         this.noteToAdd = new Note();
        //     },
        //     error => {
        //         console.log('Add note error');
        //     }
        // );
    }
}