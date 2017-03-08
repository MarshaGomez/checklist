import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({selector: '[highlight]'})
export class Highlight {

    @Input() highlight: boolean;
  
  constructor(public el: ElementRef, public renderer: Renderer) {}

   ngOnInit(){
        // Use renderer to render the emelemt with styles
        this.highlightItem(this.highlight);
    }

    doneColor : string = "black";
    normalColor : string = "black";

    @HostListener('click', ['$event'])
    confirmFirst() {
        console.log("Onclick")
        this.highlightItem(!this.highlight);//revisar está parte porque el ngModel modifica luego del click
    }

    private highlightItem(highlight:boolean){
        console.log(this.highlight)
        if(highlight) {
            this.el.nativeElement.style.color = this.doneColor;
            this.el.nativeElement.style.textDecoration = 'line-through';
            // this.el.nativeElement.style = "style.css"
            // this.el.nativeElement.style.strike = ".strike { text-decoration: line-through; }";   
        } else{
            this.el.nativeElement.style.color = this.normalColor;
            this.el.nativeElement.style.textDecoration = 'none';
        }
    }
}