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
var core_2 = require('angular2-cookie/core');
var issue_service_1 = require('../services/issue.service');
var ShowIssuesDialogComponent = (function (_super) {
    __extends(ShowIssuesDialogComponent, _super);
    // notes: any[] = [];
    function ShowIssuesDialogComponent(cookieService, router, dialogService, issueService) {
        _super.call(this, dialogService);
        this.cookieService = cookieService;
        this.router = router;
        this.issueService = issueService;
        this.issues = [];
    }
    ShowIssuesDialogComponent.prototype.ngOnInit = function () {
        // this.notes = noteService.getByEntity(this.taskId, 'task', this.token);
        console.log('Issues 2: ');
        console.log(this.issues);
    };
    ShowIssuesDialogComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ShowIssuesDialogComponent.prototype.confirm = function () {
        this.obj = {
            ok: true
        };
        //we pass on this.result the response to the caller
        this.result = this.obj;
        this.close();
    };
    ShowIssuesDialogComponent.prototype.deleteIssue = function (issue) {
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
    ShowIssuesDialogComponent.prototype.resolveIssue = function (issue) {
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
    ShowIssuesDialogComponent = __decorate([
        core_1.Component({
            selector: 'confirm',
            template: " <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"close()\" >&times;</button>\n                    <h4 class=\"modal-title\">{{title || 'Confirm'}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Name</th>\n                                <th>Description</th>\n                                <th>Resolved</th>\n                                <th></th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let issue of issues\">\n                                <td>\n                                    {{issue.name}}\n                                </td>\n                                <td>\n                                    {{issue.description}}\n                                </td>\n                                <td>\n                                    <input type=\"checkbox\" [checked]=\"issue.resolved\" [(ngModel)]=\"issue.resolved\" (click)= \"resolveIssue(issue)\"/>\n                                </td>\n                                <td>\n                                    <button type=\"button\" (click)=\"deleteIssue(issue)\">Delete</button>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm()\">OK</button>\n                </div>\n                </div>",
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [core_2.CookieService, router_1.Router, ng2_bootstrap_modal_1.DialogService, issue_service_1.IssueService])
    ], ShowIssuesDialogComponent);
    return ShowIssuesDialogComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.ShowIssuesDialogComponent = ShowIssuesDialogComponent;
//# sourceMappingURL=show.issues.dialog.component.js.map