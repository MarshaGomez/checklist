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
var issue_service_1 = require('../services/issue.service');
var show_issues_dialog_component_1 = require('./show.issues.dialog.component');
var add_issue_dialog_component_1 = require('./add.issue.dialog.component');
var update_issue_dialog_component_1 = require('./update.issue.dialog.component');
var update_note_dialog_component_1 = require('./update.note.dialog.component');
var UpdateTaskDialogComponent = (function (_super) {
    __extends(UpdateTaskDialogComponent, _super);
    //currentTask: Task;
    function UpdateTaskDialogComponent(dialogService, cookieService, router, noteService, issueService) {
        _super.call(this, dialogService);
        this.cookieService = cookieService;
        this.router = router;
        this.noteService = noteService;
        this.issueService = issueService;
        this.notes = [];
        this.issues = [];
    }
    UpdateTaskDialogComponent.prototype.ngOnInit = function () {
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        console.log('Token: ' + token);
        this.noteToAdd = new note_1.Note();
        this.issueToAdd = new issue_1.Issue();
        //this.currentTask = new Task();
        this.getNotes(token);
        this.getIssues(token);
    };
    UpdateTaskDialogComponent.prototype.getNotes = function (token) {
        var _this = this;
        //Get task's notes
        this.noteService.getByEntity(this.task.id, 'task', token)
            .subscribe(function (res) {
            _this.notes = res;
        }, function (error) {
            console.log('Get notes error');
        });
    };
    //Get task's issues
    UpdateTaskDialogComponent.prototype.getIssues = function (token) {
        var _this = this;
        this.issueService.getByTask(this.task.id, token)
            .subscribe(function (res) {
            _this.issues = res;
        }, function (error) {
            console.log('Get issues error');
        });
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
            console.log('Get notes error');
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
                var token = _this.getCookie("checklist_token");
                _this.getNotes(token);
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
        var _this = this;
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        var issues = [];
        this.issueService.getByTask(this.taskId, token)
            .subscribe(function (res) {
            issues = res;
            console.log('Issues by task: ');
            console.log(issues);
            var disposable = _this.dialogService.addDialog(show_issues_dialog_component_1.ShowIssuesDialogComponent, {
                title: 'Issues',
                issues: issues })
                .subscribe(function (result) {
                if (result) {
                }
                else {
                }
            });
        }, function (error) {
            console.log('Get issues error');
        });
    };
    UpdateTaskDialogComponent.prototype.showAddIssueModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(add_issue_dialog_component_1.AddIssueDialogComponent, {
            title: 'New Issue' })
            .subscribe(function (result) {
            if (result) {
                console.log("Issue test");
                console.log(result.name);
                _this.issueToAdd.name = result.name;
                _this.issueToAdd.description = result.description;
                _this.issueToAdd.resolved = false;
                _this.addIssue();
                var token = _this.getCookie("checklist_token");
                _this.getIssues(token);
            }
            else {
            }
        });
    };
    UpdateTaskDialogComponent.prototype.addIssue = function () {
        var _this = this;
        if (!this.issueToAdd.name || this.issueToAdd.name == "" || !this.issueToAdd.description || this.issueToAdd.description == "") {
            console.log("Mandatory issue fields are missing");
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.issueService.add(this.issueToAdd, this.taskId, token)
            .subscribe(function (res) {
            console.log('Issue created');
            console.log(res);
            //this.notes.push(res);
            _this.issueToAdd = new issue_1.Issue();
        }, function (error) {
            console.log('Add issue error');
        });
    };
    UpdateTaskDialogComponent.prototype.deleteNote = function (note) {
        var _this = this;
        if (!note || !note.id) {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.noteService.delete(note.id, token)
            .subscribe(function (res) {
            console.log('Note Removed');
            console.log(res);
            for (var i = 0; i < _this.notes.length; i++) {
                var noteToDelete = _this.notes[i];
                if (noteToDelete.id == note.id) {
                    _this.notes.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            console.log('Delete error');
        });
    };
    UpdateTaskDialogComponent.prototype.showUpdateNoteModal = function (note) {
        var _this = this;
        this.noteToUpdate = Object.assign(new note_1.Note, note);
        var disposable = this.dialogService.addDialog(update_note_dialog_component_1.UpdateNoteDialogComponent, {
            title: 'Update note', name: this.noteToUpdate.name, text: this.noteToUpdate.text })
            .subscribe(function (result) {
            if (result) {
                _this.noteToUpdate.name = result.name;
                _this.noteToUpdate.text = result.text;
                _this.updateNote();
            }
            else {
            }
        });
    };
    UpdateTaskDialogComponent.prototype.updateNote = function () {
        var _this = this;
        if (!this.noteToUpdate.name || this.noteToUpdate.name == "" || !this.noteToUpdate.text || this.noteToUpdate.text == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.noteService.update(this.noteToUpdate, token)
            .subscribe(function (res) {
            console.log('Note updated');
            console.log(res);
            for (var i = 0; i < _this.notes.length; i++) {
                if (_this.noteToUpdate.id == _this.notes[i].id) {
                    _this.notes[i] = Object.assign(new note_1.Note, _this.noteToUpdate);
                    break;
                }
            }
            _this.noteToUpdate = new note_1.Note();
        }, function (error) {
            console.log('Update note error');
        });
    };
    UpdateTaskDialogComponent.prototype.deleteIssue = function (issue) {
        var _this = this;
        if (!issue || !issue.id) {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.issueService.delete(issue.id, token)
            .subscribe(function (res) {
            console.log('Issue Removed');
            console.log(res);
            for (var i = 0; i < _this.issues.length; i++) {
                var issueToDelete = _this.issues[i];
                if (issueToDelete.id == issue.id) {
                    _this.issues.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            console.log('Delete issue error');
        });
    };
    UpdateTaskDialogComponent.prototype.resolveIssue = function (issue) {
        console.log('TaskId to complete' + issue.id);
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.issueService.resolve(issue.id, token, issue.resolved)
            .subscribe(function (res) {
            console.log('Issue resolved');
            console.log(res);
        }, function (error) {
            console.log('resolved issue error');
        });
    };
    UpdateTaskDialogComponent.prototype.showUpdateIssueModal = function (issue) {
        var _this = this;
        this.issueToUpdate = Object.assign(new issue_1.Issue, issue);
        var disposable = this.dialogService.addDialog(update_issue_dialog_component_1.UpdateIssueDialogComponent, {
            title: 'Update Issue', name: this.issueToUpdate.name, description: this.issueToUpdate.description })
            .subscribe(function (result) {
            if (result) {
                _this.issueToUpdate.name = result.name;
                _this.issueToUpdate.description = result.description;
                _this.updateIssue();
            }
            else {
            }
        });
    };
    UpdateTaskDialogComponent.prototype.updateIssue = function () {
        var _this = this;
        if (!this.issueToUpdate.name || this.issueToUpdate.name == "" || !this.issueToUpdate.description || this.issueToUpdate.description == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.issueService.update(this.issueToUpdate, token)
            .subscribe(function (res) {
            console.log('Issue updated');
            console.log(res);
            for (var i = 0; i < _this.issues.length; i++) {
                if (_this.issueToUpdate.id == _this.issues[i].id) {
                    _this.issues[i] = Object.assign(new issue_1.Issue, _this.issueToUpdate);
                    break;
                }
            }
            _this.issueToUpdate = new issue_1.Issue();
        }, function (error) {
            console.log('Update issue error');
        });
    };
    UpdateTaskDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <input type=\"text\" [(ngModel)]=\"name\" placeholder=\"task name\">\n                    <input type=\"text\" [(ngModel)]=\"description\" placeholder=\"task description\">\n\n                    <div>\n                        <br/>\n                        <label>Notes:</label>\n                        <div class=\"modal-body\">\n                            <table class=\"table\">\n                                <thead>\n                                    <tr>\n                                        <th>Name</th>\n                                        <th>Text</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let note of notes\">\n                                        <td>\n                                            {{note.name}}\n                                        </td>\n                                        <td>\n                                            {{note.text}}\n                                        </td>\n                                        <td>\n                                            <button type=\"button\" (click)=\"deleteNote(note)\">Delete</button>\n                                        </td>\n                                        <td>\n                                            <button type=\"button\" (click)=\"showUpdateNoteModal(note)\">Update</button>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n\n                    <div>\n                        <br/>\n                        <label>Issues:</label>\n                        <div class=\"modal-body\">\n                            <table class=\"table\">\n                                <thead>\n                                    <tr>\n                                        <th>Name</th>\n                                        <th>Description</th>\n                                        <th>Resolved</th>\n                                        <th></th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let issue of issues\">\n                                        <td>\n                                            {{issue.name}}\n                                        </td>\n                                        <td>\n                                            {{issue.description}}\n                                        </td>\n                                        <td>\n                                            <input type=\"checkbox\" [checked]=\"issue.resolved\" [(ngModel)]=\"issue.resolved\" (click)= \"resolveIssue(issue)\"/>\n                                        </td>\n                                        <td>\n                                            <button type=\"button\" (click)=\"deleteIssue(issue)\">Delete</button>\n                                        </td>\n                                        <td>\n                                            <button type=\"button\" (click)=\"showUpdateIssueModal(issue)\">Update</button>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n\n                    <div>\n                        <br/>\n                        <label>Notes:</label>\n                        <button type=\"button\" (click)=\"showNotesModal()\">Show</button>\n                        <button type=\"button\" (click)=\"showAddNoteModal()\">Add</button>\n                    </div>\n\n                    <div>\n                        <br/>\n                        <label>Issues:</label>\n                        <button type=\"button\" (click)=\"showIssuesModal()\">Show</button>\n                        <button type=\"button\" (click)=\"showAddIssueModal()\">Add</button>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                </div>\n                </div>",
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [ng2_bootstrap_modal_1.DialogService, core_2.CookieService, router_1.Router, note_service_1.NoteService, issue_service_1.IssueService])
    ], UpdateTaskDialogComponent);
    return UpdateTaskDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.UpdateTaskDialogComponent = UpdateTaskDialogComponent;
//# sourceMappingURL=update.task.dialog.component.js.map