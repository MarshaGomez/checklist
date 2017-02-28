'use strict';
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
var user_1 = require('../entities/user');
var user_service_1 = require('../services/user.service');
var SignupComponent = (function () {
    function SignupComponent(router, userService, cookieService) {
        this.router = router;
        this.userService = userService;
        this.cookieService = cookieService;
        this.title = 'Sign up';
        // user: User = {
        //   //id: '0',
        //   email: 'email',
        //   password: 'password',
        //   firstName: 'firstName',
        //   lastName: 'lastName'
        // };
        this.user = new user_1.User();
    }
    SignupComponent.prototype.onSignup = function () {
        var _this = this;
        if (!this.user) {
            return;
        }
        this.userService.addUser(this.user)
            .subscribe(function (response) {
            if (!response.id) {
                console.log('Response: ');
                console.log(response);
                if (response["message"]) {
                    _this.errorMessage = response.message;
                }
            }
            else {
                //Redirect to login page
                console.log('User: ');
                console.log(response);
                var link = ['/login'];
                _this.router.navigate(link);
            }
        }, function (error) {
            console.log(error);
            _this.errorMessage = error;
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup',
            templateUrl: '../templates/signup.component.html',
            //styleUrls: ['./signup.component.css'],
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, core_2.CookieService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map