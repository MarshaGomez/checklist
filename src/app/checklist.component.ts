import { Component } from '@angular/core';

import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'checklist',
  templateUrl: './checklist.component.html',
  //styleUrls: ['./checklist.component.css']
  providers: [ CookieService ]
})
export class ChecklistComponent {
  title = 'Checklist';

  constructor(private cookieService:CookieService){
    let token = this.getCookie("checklist_token");
    console.log('Token3: ' + token);
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
}
