import { EventEmitter } from "@angular/core";
import { ButtonHubService } from "./providers/button-hub";
import { WizardNavigationService } from "./providers/wizard-navigation";
export declare const DEFAULT_BUTTON_TYPES: any;
export declare const CUSTOM_BUTTON_TYPES: any;
export declare class WizardButton {
    navService: WizardNavigationService;
    buttonService: ButtonHubService;
    type: string;
    disabled: boolean;
    hidden: boolean;
    wasClicked: EventEmitter<string>;
    constructor(navService: WizardNavigationService, buttonService: ButtonHubService);
    private checkDefaultAndCustomType(valueToCheck, typeToLookUp);
    readonly isCancel: boolean;
    readonly isNext: boolean;
    readonly isPrevious: boolean;
    readonly isFinish: boolean;
    readonly isDanger: boolean;
    readonly isPrimaryAction: boolean;
    readonly isDisabled: boolean;
    readonly isHidden: boolean;
    click(): void;
}
