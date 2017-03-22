import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
 
@Component({  
    selector: 'confirm',
    template: ` <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" (click)="close()" >&times;</button>
                    <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                </div>
                ` + //<div class="modal-body">
                `<div>
                    
                    <li *ngFor="let checklist of checklists" style="list-style: none;" class="px-nav-box p-a-3 b-b-1" id="demo-px-nav-item">
                        <div class="col-md-12" style="margin-top: 4px;">
                            <input type="checkbox" [(ngModel)]="checklist.print" />
                            <span class="px-nav-label" style="color: #000;">{{checklist.name}}</span>
                        </div>
                    </li>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">Imprimir</button>
                    <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                </div>
                </div>`
})
export class PrintChecklistsDialogComponent extends DialogComponent {

    checklists: any[] = [];
    tasksToPrint: any[] = [];
    obj: {};

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    confirm() {
        this.obj = {
            checklistsToPrint: this.checklists,
            ok: true
        }

        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    }
}