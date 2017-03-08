"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var app_routing_1 = require('./app.routing');
var app_component_1 = require('./app.component');
var signup_component_1 = require('./components/signup.component');
var login_component_1 = require('./components/login.component');
var checklist_component_1 = require('./components/checklist.component');
var user_service_1 = require('./services/user.service');
var checklist_service_1 = require('./services/checklist.service');
var task_service_1 = require('./services/task.service');
var note_service_1 = require('./services/note.service');
var line_through_directive_1 = require('./directives/line.through.directive');
var highlight_directive_1 = require('./directives/highlight.directive');
var notes_dialog_component_1 = require('./components/notes.dialog.component');
var add_task_dialog_component_1 = require('./components/add.task.dialog.component');
var update_task_dialog_component_1 = require('./components/update.task.dialog.component');
var delete_task_dialog_component_1 = require('./components/delete.task.dialog.component');
var delete_checklist_dialog_component_1 = require('./components/delete.checklist.dialog.component');
var update_checklist_dialog_component_1 = require('./components/update.checklist.dialog.component');
var add_note_dialog_component_1 = require('./components/add.note.dialog.component');
var show_notes_dialog_component_1 = require('./components/show.notes.dialog.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_modal_1.BootstrapModalModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                signup_component_1.SignupComponent,
                login_component_1.LoginComponent,
                checklist_component_1.ChecklistComponent,
                line_through_directive_1.LineThroughDirective,
                highlight_directive_1.Highlight,
                notes_dialog_component_1.NotesDialogComponent,
                add_task_dialog_component_1.AddTaskDialogComponent,
                update_task_dialog_component_1.UpdateTaskDialogComponent,
                delete_task_dialog_component_1.DeleteTaskDialogComponent,
                delete_checklist_dialog_component_1.DeleteChecklistDialogComponent,
                update_checklist_dialog_component_1.UpdateChecklistDialogComponent,
                add_note_dialog_component_1.AddNoteDialogComponent,
                show_notes_dialog_component_1.ShowNotesDialogComponent
            ],
            entryComponents: [
                notes_dialog_component_1.NotesDialogComponent,
                add_task_dialog_component_1.AddTaskDialogComponent,
                update_task_dialog_component_1.UpdateTaskDialogComponent,
                delete_task_dialog_component_1.DeleteTaskDialogComponent,
                delete_checklist_dialog_component_1.DeleteChecklistDialogComponent,
                update_checklist_dialog_component_1.UpdateChecklistDialogComponent,
                add_note_dialog_component_1.AddNoteDialogComponent,
                show_notes_dialog_component_1.ShowNotesDialogComponent
            ],
            providers: [
                user_service_1.UserService,
                checklist_service_1.ChecklistService,
                task_service_1.TaskService,
                note_service_1.NoteService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map