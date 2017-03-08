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
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                </div>
                </div>`
})
export class ShowNotesDialogComponent extends DialogComponent {

    obj: {};
    notes: any[] = [];

    // notes: any[] = [];

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit(){
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Notes 2: ');
        console.log(this.notes);
    }

    confirm() {
        this.obj = {
            ok: true
        }

        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    }
}