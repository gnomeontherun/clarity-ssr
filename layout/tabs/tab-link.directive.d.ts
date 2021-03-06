import { ComponentFactoryResolver, ElementRef, ViewContainerRef } from "@angular/core";
import { IfActiveService } from "../../utils/conditional/if-active.service";
import { TemplateRefContainer } from "../../utils/template-ref/template-ref-container";
import { AriaService } from "./aria-service";
export declare class TabLinkDirective {
    ifActiveService: IfActiveService;
    private id;
    private ariaService;
    private el;
    private cfr;
    private viewContainerRef;
    inOverflow: boolean;
    templateRefContainer: TemplateRefContainer;
    constructor(ifActiveService: IfActiveService, id: number, ariaService: AriaService, el: ElementRef, cfr: ComponentFactoryResolver, viewContainerRef: ViewContainerRef);
    readonly ariaControls: string;
    tabLinkId: string;
    activate(): void;
    readonly active: boolean;
}
