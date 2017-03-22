import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup.component';
import { LoginComponent } from './components/login.component';
import { ChecklistComponent } from './components/checklist.component';
import { UserService } from './services/user.service';
import { ChecklistService } from './services/checklist.service';
import { TaskService } from './services/task.service';
import { NoteService } from './services/note.service';
import { IssueService } from './services/issue.service';
import { LineThroughDirective } from './directives/line.through.directive';
import { Highlight } from './directives/highlight.directive';
import { NotesDialogComponent } from './components/notes.dialog.component';
import { AddTaskDialogComponent } from './components/add.task.dialog.component';
import { UpdateTaskDialogComponent } from './components/update.task.dialog.component';
import { DeleteTaskDialogComponent } from './components/delete.task.dialog.component';
import { DeleteChecklistDialogComponent } from './components/delete.checklist.dialog.component';
import { UpdateChecklistDialogComponent } from './components/update.checklist.dialog.component';
import { AddNoteDialogComponent } from './components/add.note.dialog.component';
import { ShowNotesDialogComponent } from './components/show.notes.dialog.component';
import { ShowIssuesDialogComponent } from './components/show.issues.dialog.component';
import { AddIssueDialogComponent } from './components/add.issue.dialog.component';
import { UpdateNoteDialogComponent } from './components/update.note.dialog.component';
import { UpdateIssueDialogComponent } from './components/update.issue.dialog.component';
import { PrintChecklistsDialogComponent } from './components/print.checklists.dialog.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    routing
    ],
  declarations: [ 
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChecklistComponent,
    LineThroughDirective,
    Highlight,
    NotesDialogComponent,
    AddTaskDialogComponent,
    UpdateTaskDialogComponent,
    DeleteTaskDialogComponent,
    DeleteChecklistDialogComponent,
    UpdateChecklistDialogComponent,
    AddNoteDialogComponent,
    ShowNotesDialogComponent,
    ShowIssuesDialogComponent,
    AddIssueDialogComponent,
    UpdateNoteDialogComponent,
    UpdateIssueDialogComponent,
    PrintChecklistsDialogComponent
    ],
  entryComponents: [
    NotesDialogComponent,
    AddTaskDialogComponent,
    UpdateTaskDialogComponent,
    DeleteTaskDialogComponent,
    DeleteChecklistDialogComponent,
    UpdateChecklistDialogComponent,
    AddNoteDialogComponent,
    ShowNotesDialogComponent,
    ShowIssuesDialogComponent,
    AddIssueDialogComponent,
    UpdateNoteDialogComponent,
    UpdateIssueDialogComponent,
    PrintChecklistsDialogComponent    
  ],
  providers: [
    UserService,
    ChecklistService,
    TaskService,
    NoteService,
    IssueService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
