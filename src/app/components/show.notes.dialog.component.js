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
var ShowNotesDialogComponent = (function (_super) {
    __extends(ShowNotesDialogComponent, _super);
    // notes: any[] = [];
    function ShowNotesDialogComponent(dialogService) {
        _super.call(this, dialogService);
        this.notes = [];
    }
    ShowNotesDialogComponent.prototype.ngOnInit = function () {
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Notes 2: ');
        console.log(this.notes);
    };
    ShowNotesDialogComponent.prototype.confirm = function () {
        this.obj = {
            ok: true
        };
        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    };
    ShowNotesDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Name</th>\n                                <th>Text</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let note of notes\">\n                                <td>\n                                    {{note.name}}\n                                </td>\n                                <td>\n                                    {{note.text}}\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                </div>\n                </div>"
        }), 
        __metadata('design:paramtypes', [ng2_bootstrap_modal_1.DialogService])
    ], ShowNotesDialogComponent);
    return ShowNotesDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.ShowNotesDialogComponent = ShowNotesDialogComponent;
//# sourceMappingURL=show.notes.dialog.component.js.map