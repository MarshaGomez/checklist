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
var UpdateNoteDialogComponent = (function (_super) {
    __extends(UpdateNoteDialogComponent, _super);
    function UpdateNoteDialogComponent(dialogService) {
        _super.call(this, dialogService);
    }
    UpdateNoteDialogComponent.prototype.confirm = function () {
        this.obj = {
            name: this.name,
            text: this.text,
            ok: true
        };
        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    };
    UpdateNoteDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <input type=\"text\" [(ngModel)]=\"name\" placeholder=\"Name\">\n                    <input type=\"text\" [(ngModel)]=\"text\" placeholder=\"Text\">\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"close()\" >Cancel</button>\n                </div>\n                </div>"
        }), 
        __metadata('design:paramtypes', [ng2_bootstrap_modal_1.DialogService])
    ], UpdateNoteDialogComponent);
    return UpdateNoteDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.UpdateNoteDialogComponent = UpdateNoteDialogComponent;
//# sourceMappingURL=update.note.dialog.component.js.map