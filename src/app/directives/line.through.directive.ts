import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({ selector: '[myLineThrough]' })
export class LineThroughDirective{

    @Input() textDecoration: string;

    constructor(private el: ElementRef){
        
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.style.textDecoration = 'line-through';
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.style.textDecoration = 'none';
    }

}