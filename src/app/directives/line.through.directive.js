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
var LineThroughDirective = (function () {
    function LineThroughDirective(el) {
        this.el = el;
    }
    LineThroughDirective.prototype.onMouseEnter = function () {
        this.el.nativeElement.style.textDecoration = 'line-through';
    };
    LineThroughDirective.prototype.onMouseLeave = function () {
        this.el.nativeElement.style.textDecoration = 'none';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LineThroughDirective.prototype, "textDecoration", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LineThroughDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LineThroughDirective.prototype, "onMouseLeave", null);
    LineThroughDirective = __decorate([
        core_1.Directive({ selector: '[myLineThrough]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LineThroughDirective);
    return LineThroughDirective;
}());
exports.LineThroughDirective = LineThroughDirective;
//# sourceMappingURL=line.through.directive.js.map