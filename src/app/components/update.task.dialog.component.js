"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require('@angular/router');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var core_2 = require('angular2-cookie/core');
var add_note_dialog_component_1 = require('./add.note.dialog.component');
var show_notes_dialog_component_1 = require('./show.notes.dialog.component');
var note_1 = require('../entities/note');
var issue_1 = require('../entities/issue');
var note_service_1 = require('../services/note.service');
var UpdateTaskDialogComponent = (function (_super) {
    __extends(UpdateTaskDialogComponent, _super);
    //currentTask: Task;
    function UpdateTaskDialogComponent(dialogService, cookieService, router, noteService) {
        _super.call(this, dialogService);
        this.cookieService = cookieService;
        this.router = router;
        this.noteService = noteService;
    }
    UpdateTaskDialogComponent.prototype.ngOnInit = function () {
        this.noteToAdd = new note_1.Note();
        this.issueToAdd = new issue_1.Issue();
        //this.currentTask = new Task();
    };
    UpdateTaskDialogComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    UpdateTaskDialogComponent.prototype.confirm = function () {
        this.obj = {
            name: this.name,
            description: this.description,
            ok: true
        };
        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    };
    UpdateTaskDialogComponent.prototype.showNotesModal = function () {
        var _this = this;
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        var notes = [];
        this.noteService.getByEntity(this.taskId, 'task', token)
            .subscribe(function (res) {
            notes = res;
            console.log('Notes 1: ');
            console.log(notes);
            var disposable = _this.dialogService.addDialog(show_notes_dialog_component_1.ShowNotesDialogComponent, {
                title: 'Notes',
                notes: notes })
                .subscribe(function (result) {
                if (result) {
                }
                else {
                }
            });
        }, function (error) {
            console.log('Add note error');
        });
    };
    UpdateTaskDialogComponent.prototype.showAddNoteModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(add_note_dialog_component_1.AddNoteDialogComponent, {
            title: 'New note' })
            .subscribe(function (result) {
            if (result) {
                _this.noteToAdd.name = result.name;
                _this.noteToAdd.text = result.text;
                _this.addNote();
            }
            else {
            }
        });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        //   setTimeout(()=>{
        //       disposable.unsubscribe();
        //   },10000);
    };
    UpdateTaskDialogComponent.prototype.addNote = function () {
        var _this = this;
        if (!this.noteToAdd.name || this.noteToAdd.name == "" || !this.noteToAdd.text || this.noteToAdd.text == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.noteService.add(this.noteToAdd, this.taskId, 'task', token)
            .subscribe(function (res) {
            console.log('Note created');
            console.log(res);
            //this.notes.push(res);
            _this.noteToAdd = new note_1.Note();
        }, function (error) {
            console.log('Add note error');
        });
    };
    UpdateTaskDialogComponent.prototype.showIssuesModal = function () {
    };
    UpdateTaskDialogComponent.prototype.showAddIssueModal = function () {
        // if(!this.issueToAdd.name || this.issueToAdd.name == "" || !this.issueToAdd.description || this.issueToAdd.description == "" ){
        //     return;
        // }
        // let token = this.getCookie("checklist_token");
        // if(!token){
        //     this.router.navigate(['/login']);
        // }
        // this.issueService.add(this.noteToAdd, this.taskId, 'task', token)
        //     .subscribe(
        //         res => {
        //         console.log('Note created');
        //         console.log(res);
        //         //this.notes.push(res);
        //         this.noteToAdd = new Note();
        //     },
        //     error => {
        //         console.log('Add note error');
        //     }
        // );
    };
    UpdateTaskDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <input type=\"text\" [(ngModel)]=\"name\" placeholder=\"task name\">\n                    <input type=\"text\" [(ngModel)]=\"description\" placeholder=\"task description\">\n\n                    <div>\n                        <br/>\n                        <label>Notes:</label>\n                        <button type=\"button\" (click)=\"showNotesModal()\">Show</button>\n                        <button type=\"button\" (click)=\"showAddNoteModal()\">Add</button>\n                    </div>\n\n                    <div>\n                        <br/>\n                        <label>Issues:</label>\n                        <button type=\"button\" (click)=\"showIssuesModal()\">Show</button>\n                        <button type=\"button\" (click)=\"showAddIssueModal()\">Add</button>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                </div>\n                </div>",
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [ng2_bootstrap_modal_1.DialogService, core_2.CookieService, router_1.Router, note_service_1.NoteService])
    ], UpdateTaskDialogComponent);
    return UpdateTaskDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.UpdateTaskDialogComponent = UpdateTaskDialogComponent;
//# sourceMappingURL=update.task.dialog.component.js.map