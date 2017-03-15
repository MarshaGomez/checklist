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
import { IssueService } from '../services/issue.service';
import { ShowIssuesDialogComponent } from './show.issues.dialog.component';
import { AddIssueDialogComponent } from './add.issue.dialog.component';
import { UpdateIssueDialogComponent } from './update.issue.dialog.component';
import { UpdateNoteDialogComponent } from './update.note.dialog.component';
 
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
                        <div class="modal-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Text</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let note of notes">
                                        <td>
                                            {{note.name}}
                                        </td>
                                        <td>
                                            {{note.text}}
                                        </td>
                                        <td>
                                            <button type="button" (click)="deleteNote(note)">Delete</button>
                                        </td>
                                        <td>
                                            <button type="button" (click)="showUpdateNoteModal(note)">Update</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <br/>
                        <label>Issues:</label>
                        <div class="modal-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Resolved</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let issue of issues">
                                        <td>
                                            {{issue.name}}
                                        </td>
                                        <td>
                                            {{issue.description}}
                                        </td>
                                        <td>
                                            <input type="checkbox" [checked]="issue.resolved" [(ngModel)]="issue.resolved" (click)= "resolveIssue(issue)"/>
                                        </td>
                                        <td>
                                            <button type="button" (click)="deleteIssue(issue)">Delete</button>
                                        </td>
                                        <td>
                                            <button type="button" (click)="showUpdateIssueModal(issue)">Update</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

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

    task: Task; //This task is set by the class that creates creating this dialog component
    name: string;
    description: string;
    taskId: string;
    obj: {};

    notes: Note[] = [];
    issues: Issue[] = [];
    noteToAdd: Note;
    noteToUpdate: Note;
    issueToAdd: Issue;
    issueToUpdate: Issue;
    //currentTask: Task;

    constructor(dialogService: DialogService,
        private cookieService:CookieService,
        private router: Router,
        private noteService: NoteService,
        private issueService: IssueService) {
        super(dialogService);
    }

    ngOnInit(){
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        console.log('Token: ' + token);

        this.noteToAdd = new Note();
        this.issueToAdd = new Issue();
        //this.currentTask = new Task();

        this.getNotes(token);
        this.getIssues(token);
        
    }

    getNotes(token: string){
        //Get task's notes
        this.noteService.getByEntity(this.task.id, 'task', token)
            .subscribe(
                res => {
                    this.notes = res;
                },
                error => {
                    console.log('Get notes error');
                }
            );
    }

    //Get task's issues
    getIssues(token: string){
        this.issueService.getByTask(this.task.id, token)
            .subscribe(
                res => {
                    this.issues = res;
                },
                error => {
                    console.log('Get issues error');
                }
            );
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
                console.log('Get notes error');
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
                
                let token = this.getCookie("checklist_token");
                this.getNotes(token);
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
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }

        let issues: any[] = [];
        this.issueService.getByTask(this.taskId, token)
            .subscribe(
                res => {
                    issues = res;
                    console.log('Issues by task: ');
                    console.log(issues);

                    let disposable = this.dialogService.addDialog(ShowIssuesDialogComponent, {
                    title:'Issues', 
                    issues: issues })
                    .subscribe((result)=>{
                        if(result){

                        }else {
                            
                        }
                        
                    });
            },
            error => {
                console.log('Get issues error');
            }
        );

    }

    showAddIssueModal(){
        let disposable = this.dialogService.addDialog(AddIssueDialogComponent, {
          title:'New Issue' })
          .subscribe((result)=>{
              if(result){
                console.log("Issue test");
                console.log(result.name);
                this.issueToAdd.name = result.name;
                this.issueToAdd.description = result.description;
                this.issueToAdd.resolved = false;
                this.addIssue();

                let token = this.getCookie("checklist_token");
                this.getIssues(token);
              }else {   
              }
          });
    }

    addIssue(){
        if(!this.issueToAdd.name || this.issueToAdd.name == "" || !this.issueToAdd.description || this.issueToAdd.description == "" ){
            console.log("Mandatory issue fields are missing");
            return;
        }
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        this.issueService.add(this.issueToAdd, this.taskId, token)
            .subscribe(
                res => {
                console.log('Issue created');
                console.log(res);
                //this.notes.push(res);
                this.issueToAdd = new Issue();
            },
            error => {
                console.log('Add issue error');
            }
        );
    }

deleteNote(note: Note){
        if(!note || !note.id){
            return;
        }

        let token = this.getCookie("checklist_token");

        if(!token){
            this.router.navigate(['/login']);
        }

        this.noteService.delete(note.id, token)
            .subscribe(
                res => {
                    console.log('Note Removed');
                    console.log(res);        

                    for(var i = 0; i < this.notes.length; i++) {
                        let noteToDelete: Note = this.notes[i];
                        if(noteToDelete.id == note.id){
                            this.notes.splice(i, 1);
                            break;
                        }
                    }
                },
                error => {
                console.log('Delete error');
            }
        );
    }

    showUpdateNoteModal(note: Note){
        this.noteToUpdate = Object.assign(new Note, note);
        let disposable = this.dialogService.addDialog(UpdateNoteDialogComponent, {
          title:'Update note', name: this.noteToUpdate.name, text: this.noteToUpdate.text  })
          .subscribe((result)=>{
              if(result){
                this.noteToUpdate.name = result.name;
                this.noteToUpdate.text = result.text;
                this.updateNote();
              } else {   
              }
          });
    }

    updateNote(){
        if(!this.noteToUpdate.name || this.noteToUpdate.name == "" || !this.noteToUpdate.text || this.noteToUpdate.text == "" ){
            return;
        }
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        this.noteService.update(this.noteToUpdate, token)
            .subscribe(
                res => {
                console.log('Note updated');
                console.log(res);
                for(var i = 0; i < this.notes.length; i++) {
                if(this.noteToUpdate.id == this.notes[i].id){
                  this.notes[i] = Object.assign(new Note, this.noteToUpdate);
                  break;
                }
              }
                this.noteToUpdate = new Note();
            },
            error => {
                console.log('Update note error');
            }
        );
    }

    deleteIssue(issue: Issue){
        if(!issue || !issue.id){
            return;
        }

        let token = this.getCookie("checklist_token");

        if(!token){
            this.router.navigate(['/login']);
        }

        this.issueService.delete(issue.id, token)
            .subscribe(
                res => {
                    console.log('Issue Removed');
                    console.log(res);        

                    for(var i = 0; i < this.issues.length; i++) {
                        let issueToDelete: Issue = this.issues[i];
                        if(issueToDelete.id == issue.id){
                            this.issues.splice(i, 1);
                            break;
                        }
                    }
                },
                error => {
                console.log('Delete issue error');
            }
        );
    }

    resolveIssue(issue: Issue){
        console.log('TaskId to complete' + issue.id);
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        this.issueService.resolve(issue.id, token, issue.resolved)
        .subscribe(
                res => {
                console.log('Issue resolved');
                console.log(res);
            },
            error => {
            console.log('resolved issue error');
            }
        );
    }

    showUpdateIssueModal(issue: Issue){
        this.issueToUpdate = Object.assign(new Issue, issue);
        let disposable = this.dialogService.addDialog(UpdateIssueDialogComponent, {
          title:'Update Issue', name: this.issueToUpdate.name, description: this.issueToUpdate.description  })
          .subscribe((result)=>{
              if(result){
                this.issueToUpdate.name = result.name;
                this.issueToUpdate.description = result.description;
                this.updateIssue();
              }else {
              }
          });
    }

    updateIssue(){
        if(!this.issueToUpdate.name || this.issueToUpdate.name == "" || !this.issueToUpdate.description || this.issueToUpdate.description == "" ){
            return;
        }
        let token = this.getCookie("checklist_token");
        if(!token){
            this.router.navigate(['/login']);
        }
        this.issueService.update(this.issueToUpdate, token)
            .subscribe(
                res => {
                console.log('Issue updated');
                console.log(res);
                for(var i = 0; i < this.issues.length; i++) {
                if(this.issueToUpdate.id == this.issues[i].id){
                  this.issues[i] = Object.assign(new Issue, this.issueToUpdate);
                  break;
                }
              }
                this.issueToUpdate = new Issue();
            },
            error => {
                console.log('Update issue error');
            }
        );
    }



}