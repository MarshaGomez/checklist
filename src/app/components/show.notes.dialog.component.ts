import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Router } from '@angular/router';
import { Note } from '../entities/note';
import { CookieService} from 'angular2-cookie/core';
import { NoteService } from '../services/note.service';
import { UpdateNoteDialogComponent } from './update.note.dialog.component';
 
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                </div>
                </div>`,
    providers: [ CookieService ]
})
export class ShowNotesDialogComponent extends DialogComponent {

    obj: {};
    notes: any[] = [];
    noteToUpdate: Note;

    // notes: any[] = [];

    constructor(private cookieService:CookieService,
        private router: Router,
        dialogService: DialogService,
        private noteService: NoteService) {

        super(dialogService);
    }

    ngOnInit(){
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Notes 2: ');
        console.log(this.notes);
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
}