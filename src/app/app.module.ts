import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChecklistComponent,
    LineThroughDirective,
    Highlight
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    UserService,
    ChecklistService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
