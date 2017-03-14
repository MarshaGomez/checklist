import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Router } from '@angular/router';
import { Issue } from '../entities/issue';
import { CookieService} from 'angular2-cookie/core';
import { NoteService } from '../services/note.service';
import { IssueService } from '../services/issue.service';
import { UpdateIssueDialogComponent } from './update.issue.dialog.component';
 
@Component({  
    selector: 'confirm',
    template: ` <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" (click)="close()" >&times;</button>
                    <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                </div>
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                </div>
                </div>`,
    providers: [ CookieService ]
})
export class ShowIssuesDialogComponent extends DialogComponent {

    obj: {};
    issues: any[] = [];
    issueToUpdate: Issue;

    // notes: any[] = [];

    constructor(private cookieService:CookieService,
        private router: Router,
        dialogService: DialogService,
        private issueService: IssueService) {
        super(dialogService);
    }

    ngOnInit(){
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Issues 2: ');
        console.log(this.issues);
    }

    getCookie(key: string){
        return this.cookieService.get(key);
    }

    confirm() {
        this.obj = {
            ok: true
        }

        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
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

