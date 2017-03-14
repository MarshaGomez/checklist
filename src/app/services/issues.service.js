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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var IssuesService = (function () {
    function IssuesService(http) {
        this.http = http;
    }
    IssuesService.prototype.getByEntity = function (entityId, entity, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8084/ChecklistsAPI/api/tasks/' + entity + '/' + entityId, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    IssuesService.prototype.extractData = function (res) {
        console.log('Server Response: ');
        console.log(res);
        var body = JSON.parse(res._body);
        return body || {};
    };
    IssuesService.prototype.handleError = function (error) {
        console.log('ERROR!');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    IssuesService.prototype.add = function (issue, taskId, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            name: issue.name,
            description: issue.description,
            resolved: issue.resolved
        };
        return this.http.post('http://localhost:8084/ChecklistsAPI/api/issues/tasks/' + taskId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    IssuesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], IssuesService);
    return IssuesService;
}());
exports.IssuesService = IssuesService;
//# sourceMappingURL=issues.service.js.map