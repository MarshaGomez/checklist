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
import { LineThroughDirective } from './directives/line.through.directive';
import { Highlight } from './directives/highlight.directive';
import { NotesDialogComponent } from './components/notes.dialog.component';
import { AddTaskDialogComponent } from './components/add.task.dialog.component';
import { UpdateTaskDialogComponent } from './components/update.task.dialog.component';
import { DeleteTaskDialogComponent } from './components/delete.task.dialog.component';

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
    DeleteTaskDialogComponent    
    ],
  entryComponents: [
    NotesDialogComponent,
    AddTaskDialogComponent,
    UpdateTaskDialogComponent,
    DeleteTaskDialogComponent
  ],
  providers: [
    UserService,
    ChecklistService,
    TaskService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
