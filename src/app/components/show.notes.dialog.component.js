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
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var router_1 = require('@angular/router');
var note_1 = require('../entities/note');
var core_2 = require('angular2-cookie/core');
var note_service_1 = require('../services/note.service');
var update_note_dialog_component_1 = require('./update.note.dialog.component');
var ShowNotesDialogComponent = (function (_super) {
    __extends(ShowNotesDialogComponent, _super);
    // notes: any[] = [];
    function ShowNotesDialogComponent(cookieService, router, dialogService, noteService) {
        _super.call(this, dialogService);
        this.cookieService = cookieService;
        this.router = router;
        this.noteService = noteService;
        this.notes = [];
    }
    ShowNotesDialogComponent.prototype.ngOnInit = function () {
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Notes 2: ');
        console.log(this.notes);
    };
    ShowNotesDialogComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ShowNotesDialogComponent.prototype.confirm = function () {
        this.obj = {
            ok: true
        };
        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    };
    ShowNotesDialogComponent.prototype.deleteNote = function (note) {
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
    ShowNotesDialogComponent.prototype.showUpdateNoteModal = function (note) {
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
    ShowNotesDialogComponent.prototype.updateNote = function () {
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
    ShowNotesDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Name</th>\n                                <th>Text</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let note of notes\">\n                                <td>\n                                    {{note.name}}\n                                </td>\n                                <td>\n                                    {{note.text}}\n                                </td>\n                                <td>\n                                    <button type=\"button\" (click)=\"deleteNote(note)\">Delete</button>\n                                </td>\n                                <td>\n                                    <button type=\"button\" (click)=\"showUpdateNoteModal(note)\">Update</button>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                </div>\n                </div>",
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [core_2.CookieService, router_1.Router, ng2_bootstrap_modal_1.DialogService, note_service_1.NoteService])
    ], ShowNotesDialogComponent);
    return ShowNotesDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.ShowNotesDialogComponent = ShowNotesDialogComponent;
//# sourceMappingURL=show.notes.dialog.component.js.map