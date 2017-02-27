import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing 
    ],
  declarations: [ 
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChecklistComponent,
    LineThroughDirective,
    Highlight
    ],
  providers: [
    UserService,
    ChecklistService,
    TaskService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
