import { ElementRef, Renderer2 } from "@angular/core";
export declare class CodeHighlight {
    private _el;
    private renderer;
    private platformId;
    private _highlight;
    constructor(_el: ElementRef, renderer: Renderer2, platformId: Object);
    ngAfterContentInit(): void;
    redraw(): void;
    highlight: string;
}
