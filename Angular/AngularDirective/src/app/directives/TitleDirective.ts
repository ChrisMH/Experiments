import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[titleDirective]"
})
export class TitleDirective implements OnInit
{
    constructor(protected element: ElementRef)
    {
    }

    ngOnInit(): void
    {
        console.log("TitleDirective.ngOnInit:", this.element.nativeElement)
    }
}