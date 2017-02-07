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

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChecklistComponent,
    LineThroughDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    UserService,
    ChecklistService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
