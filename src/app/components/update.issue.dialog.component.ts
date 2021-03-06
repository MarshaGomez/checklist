import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
 
@Component({  
    selector: 'confirm',
    template: ` <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" (click)="close()" >&times;</button>
                    <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                </div>
                <div class="modal-body">
                    <input type="text" [(ngModel)]="name" placeholder="Name">
                    <input type="text" [(ngModel)]="description" placeholder="Description">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                    <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                </div>
                </div>`
})
export class UpdateIssueDialogComponent extends DialogComponent {

    name: string;
    description: string;
    obj: {};

    constructor(dialogService: DialogService) {
        super(dialogService);
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
}