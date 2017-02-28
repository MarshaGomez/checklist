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
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
    }
    TaskService.prototype.getByChecklist = function (checklistId, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8084/ChecklistsAPI/api/tasks/checklists/' + checklistId, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.delete = function (taskId, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete('http://localhost:8084/ChecklistsAPI/api/tasks/' + taskId, options)
            .map(function (res) {
            console.log('Server Response: ');
            console.log(res);
            return res || {};
        })
            .catch(this.handleError);
    };
    TaskService.prototype.extractData = function (res) {
        console.log('Server Response: ');
        console.log(res);
        var body = JSON.parse(res._body);
        return body || {};
    };
    TaskService.prototype.handleError = function (error) {
        console.log('ERROR!');
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    TaskService.prototype.add = function (task, token, checklistId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            name: task.name,
            description: task.description
        };
        return this.http.post('http://localhost:8084/ChecklistsAPI/api/tasks/checklists/' + checklistId, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.complete = function (taskId, token, completed) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {};
        return this.http.put('http://localhost:8084/ChecklistsAPI/api/tasks/' + taskId + '/completed?completed=' + !completed, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.updateTask = function (task, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = {
            name: task.name,
            description: task.description
        };
        return this.http.put('http://localhost:8084/ChecklistsAPI/api/tasks/' + task.id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map