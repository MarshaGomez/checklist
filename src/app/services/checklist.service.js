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
var ChecklistService = (function () {
    function ChecklistService(http) {
        this.http = http;
    }
    ChecklistService.prototype.getByOwner = function (token) {
        //token = '78db325a-7599-40dd-93f1-3d5324aeffbd';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8084/ChecklistsAPI/api/checklists/users', options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChecklistService.prototype.delete = function (checklistId, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete('http://localhost:8084/ChecklistsAPI/api/checklists/' + checklistId, options)
            .map(function (res) {
            console.log('Server Response: ');
            console.log(res);
            return res || {};
        })
            .catch(this.handleError);
    };
    ChecklistService.prototype.extractData = function (res) {
        console.log('Server Response: ');
        console.log(res);
        var body = JSON.parse(res._body);
        return body || {};
    };
    ChecklistService.prototype.handleError = function (error) {
        console.log('ERROR!');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ChecklistService.prototype.add = function (checklist, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            name: checklist.title
        };
        return this.http.post('http://localhost:8084/ChecklistsAPI/api/checklists/', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChecklistService.prototype.updateChecklist = function (checklist, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            title: checklist.title
        };
        return this.http.put('http://localhost:8084/ChecklistsAPI/api/checklists/' + checklist.id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChecklistService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChecklistService);
    return ChecklistService;
}());
exports.ChecklistService = ChecklistService;
//# sourceMappingURL=checklist.service.js.map