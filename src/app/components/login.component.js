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
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
var user_service_1 = require('../services/user.service');
var LoginComponent = (function () {
    function LoginComponent(router, userService, cookieService) {
        this.router = router;
        this.userService = userService;
        this.cookieService = cookieService;
        this.title = 'Login';
    }
    LoginComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    LoginComponent.prototype.setCookie = function (key, value) {
        return this.cookieService.put(key, value);
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        // if(!this.userEmail || !this.userPassword){
        //   return;
        // }
        this.userService.loginUser(this.userEmail, this.userPassword)
            .subscribe(function (res) {
            console.log('Token: ');
            console.log(res._body);
            var token = res._body;
            _this.setCookie("checklist_token", token);
            _this.setCookie("checklist_email", _this.userEmail);
            var token2 = _this.getCookie("checklist_token");
            console.log('Token2: ' + token2);
            //Redirect to main page
            var link = ['/checklist'];
            _this.router.navigate(link);
        }, function (error) {
            console.log(error);
            _this.errorMessage = error;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: '../templates/login.component.html',
            //styleUrls: ['./login.component.css']
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, core_2.CookieService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map