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
var Highlight = (function () {
    function Highlight(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.doneColor = "green";
        this.normalColor = "red";
    }
    Highlight.prototype.ngOnInit = function () {
        // Use renderer to render the emelemt with styles
        this.highlightItem(this.highlight);
    };
    Highlight.prototype.confirmFirst = function () {
        console.log("Onclick");
        this.highlightItem(!this.highlight); //revisar está parte porque el ngModel modifica luego del click
    };
    Highlight.prototype.highlightItem = function (highlight) {
        console.log(this.highlight);
        if (highlight) {
            this.el.nativeElement.style.color = this.doneColor;
            this.el.nativeElement.style.textDecoration = 'line-through';
        }
        else {
            this.el.nativeElement.style.color = this.normalColor;
            this.el.nativeElement.style.textDecoration = 'none';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Highlight.prototype, "highlight", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Highlight.prototype, "confirmFirst", null);
    Highlight = __decorate([
        core_1.Directive({ selector: '[highlight]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], Highlight);
    return Highlight;
}());
exports.Highlight = Highlight;
//# sourceMappingURL=highlight.directive.js.map