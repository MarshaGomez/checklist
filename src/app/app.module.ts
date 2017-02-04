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

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChecklistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    UserService,
    ChecklistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
