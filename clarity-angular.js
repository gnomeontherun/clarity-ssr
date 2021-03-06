import { ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injectable, InjectionToken, Injector, Input, IterableDiffers, NgModule, NgZone, Optional, Output, PLATFORM_ID, Renderer2, SkipSelf, TemplateRef, ViewChild, ViewContainerRef, forwardRef } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT as DOCUMENT$1 } from '@angular/platform-browser';

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class IconCustomTag {
}
// No behavior
// The only purpose is to "declare" the tag in Angular
IconCustomTag.decorators = [
    { type: Directive, args: [{ selector: "clr-icon" },] },
];
/**
 * @nocollapse
 */
IconCustomTag.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const ICON_DIRECTIVES = [IconCustomTag];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrIconModule {
}
ClrIconModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [ICON_DIRECTIVES], exports: [ICON_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrIconModule.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let Point = {};
Point.RIGHT_CENTER = 0;
Point.RIGHT_TOP = 1;
Point.RIGHT_BOTTOM = 2;
Point.TOP_CENTER = 3;
Point.TOP_RIGHT = 4;
Point.TOP_LEFT = 5;
Point.BOTTOM_CENTER = 6;
Point.BOTTOM_RIGHT = 7;
Point.BOTTOM_LEFT = 8;
Point.LEFT_CENTER = 9;
Point.LEFT_TOP = 10;
Point.LEFT_BOTTOM = 11;
Point[Point.RIGHT_CENTER] = "RIGHT_CENTER";
Point[Point.RIGHT_TOP] = "RIGHT_TOP";
Point[Point.RIGHT_BOTTOM] = "RIGHT_BOTTOM";
Point[Point.TOP_CENTER] = "TOP_CENTER";
Point[Point.TOP_RIGHT] = "TOP_RIGHT";
Point[Point.TOP_LEFT] = "TOP_LEFT";
Point[Point.BOTTOM_CENTER] = "BOTTOM_CENTER";
Point[Point.BOTTOM_RIGHT] = "BOTTOM_RIGHT";
Point[Point.BOTTOM_LEFT] = "BOTTOM_LEFT";
Point[Point.LEFT_CENTER] = "LEFT_CENTER";
Point[Point.LEFT_TOP] = "LEFT_TOP";
Point[Point.LEFT_BOTTOM] = "LEFT_BOTTOM";
const POSITION_RELATIVE = "relative";
const POSITION_ABSOLUTE = "absolute";
const POSITION_FIXED = "fixed";
const OVERFLOW_SCROLL = "scroll";
const OVERFLOW_AUTO = "auto";
class Popover {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
        this.scrollableElements = [];
        this.boundOnScrollListener = this.emitScrollEvent.bind(this);
        // Browsers don't agree with what to do if some of these are not specified, so we set them all to be safe.
        element.style.position = POSITION_ABSOLUTE;
        element.style.top = 0;
        element.style.bottom = "auto";
        element.style.left = 0;
        element.style.right = "auto";
    }
    /**
     * @param {?} anchor
     * @param {?} anchorAlign
     * @param {?} popoverAlign
     * @param {?=} __3
     * @return {?}
     */
    anchor(anchor, anchorAlign, popoverAlign, { offsetX = 0, offsetY = 0, useAnchorParent = false } = {}) {
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = "static";
        const /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        const /** @type {?} */ popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        let /** @type {?} */ leftDiff = anchorRect.left - popoverRect.left + offsetX;
        let /** @type {?} */ topDiff = anchorRect.top - popoverRect.top + offsetY;
        // first, adjust positioning based on anchor's align point
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff += anchorRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff += anchorRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff += anchorRect.height;
                leftDiff += anchorRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff += anchorRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff += anchorRect.height / 2;
                leftDiff += anchorRect.width;
                break;
            default:
        }
        // second, adjust positioning based on popover's align point
        switch (popoverAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
                break;
            case Point.TOP_CENTER:
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.TOP_RIGHT:
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_TOP:
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_BOTTOM:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_LEFT:
                topDiff -= popoverRect.height;
                break;
            case Point.BOTTOM_CENTER:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width / 2;
                break;
            case Point.BOTTOM_RIGHT:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.RIGHT_BOTTOM:
                topDiff -= popoverRect.height;
                leftDiff -= popoverRect.width;
                break;
            case Point.LEFT_CENTER:
                topDiff -= popoverRect.height / 2;
                break;
            case Point.RIGHT_CENTER:
                topDiff -= popoverRect.height / 2;
                leftDiff -= popoverRect.width;
                break;
            default:
        }
        // Third, adjust with popover's margins based on the two align points.
        // Here, we make an assumption that popover is primarily positioned outside the
        // anchor with minor offset. Without this assumption, it's impossible to apply
        // the popover's margins in a predictable way. For example, assume that a popover
        // and its anchor are exactly the same size. if a popover is positioned inside the
        // anchor (which is technically possible), then it becomes impossible to know what to do
        // if the popover has a non-zero margin value all around (because applying the margin in
        // all four directions will result in no margin visually, which isn't what we want).
        // Therefore, our logic makes assumptions about margins of interest given the points,
        // and only covers the cases where popover is outside the anchor.
        const /** @type {?} */ popoverComputedStyle = getComputedStyle(this.element);
        const /** @type {?} */ marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        const /** @type {?} */ marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        const /** @type {?} */ marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        const /** @type {?} */ marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
        switch (anchorAlign) {
            case Point.LEFT_TOP:
            case Point.TOP_LEFT:
            case Point.TOP_RIGHT:
            case Point.RIGHT_TOP:
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.LEFT_BOTTOM:
            case Point.BOTTOM_LEFT:
            case Point.BOTTOM_RIGHT:
            case Point.RIGHT_BOTTOM:
                if (popoverAlign === Point.BOTTOM_LEFT || popoverAlign === Point.LEFT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.BOTTOM_RIGHT || popoverAlign === Point.RIGHT_BOTTOM) {
                    topDiff -= marginBottom;
                    leftDiff -= marginRight;
                }
                if (popoverAlign === Point.TOP_LEFT || popoverAlign === Point.LEFT_TOP) {
                    topDiff += marginTop;
                    leftDiff += marginLeft;
                }
                if (popoverAlign === Point.TOP_RIGHT || popoverAlign === Point.RIGHT_TOP) {
                    topDiff += marginTop;
                    leftDiff -= marginRight;
                }
                break;
            case Point.TOP_CENTER:
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.BOTTOM_CENTER:
                topDiff += marginTop;
                leftDiff += marginLeft;
                leftDiff -= marginRight;
                break;
            case Point.LEFT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff -= marginRight;
                break;
            case Point.RIGHT_CENTER:
                topDiff += marginTop;
                topDiff -= marginBottom;
                leftDiff += marginLeft;
                break;
            default:
        }
        this.element.style.transform = `translateX(${leftDiff}px) translateY(${topDiff}px)`;
        return this._scroll.asObservable();
    }
    /**
     * @return {?}
     */
    release() {
        this.element.style.transform = "";
        this.removeScrollEventListeners();
    }
    /**
     * @param {?} container
     * @return {?}
     */
    isPositioned(container) {
        const /** @type {?} */ position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    }
    /**
     * @return {?}
     */
    emitScrollEvent() {
        this._scroll.next();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    addScrollEventListeners(e) {
        this._scroll = new Subject$1();
        const /** @type {?} */ anchor = e;
        let /** @type {?} */ current = e;
        while (current && current !== document) {
            if (this.scrolls(current)) {
                current.addEventListener("scroll", this.boundOnScrollListener);
                this.scrollableElements.push(current);
            }
            if (current !== anchor && this.isPositioned(current)) {
                break;
            }
            current = current.parentNode;
        }
    }
    /**
     * @return {?}
     */
    removeScrollEventListeners() {
        for (const /** @type {?} */ elem of this.scrollableElements) {
            elem.removeEventListener("scroll", this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    }
    /**
     * @param {?} container
     * @return {?}
     */
    scrolls(container) {
        const /** @type {?} */ computedStyles = getComputedStyle(container);
        return computedStyles.overflowX === OVERFLOW_SCROLL || computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL || computedStyles.overflowY === OVERFLOW_AUTO;
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let openCount = 0;
const waiting = [];
class PopoverDirectiveOld {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new EventEmitter(false);
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set clrPopoverOld(open) {
        if (open) {
            if (this.popoverOptions.allowMultipleOpen) {
                this.createPopover();
            }
            else {
                if (openCount === 0) {
                    this.createPopover();
                }
                else {
                    waiting.push(() => {
                        this.createPopover();
                    });
                }
            }
        }
        else {
            this.viewContainer.clear();
            this.destroyPopover();
            if (!this.popoverOptions.allowMultipleOpen) {
                if (waiting.length > 0) {
                    const /** @type {?} */ createPopoverFn = waiting.shift();
                    createPopoverFn();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    createPopover() {
        const /** @type {?} */ embeddedViewRef = (this.viewContainer.createEmbeddedView(this.templateRef));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        const /** @type {?} */ elementNodes = embeddedViewRef.rootNodes.filter((node) => {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription =
            this._popoverInstance.anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(() => {
                this.clrPopoverOldChange.emit(false);
            });
        openCount++;
    }
    /**
     * @return {?}
     */
    destroyPopover() {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyPopover();
    }
}
PopoverDirectiveOld.decorators = [
    { type: Directive, args: [{ selector: "[clrPopoverOld]" },] },
];
/**
 * @nocollapse
 */
PopoverDirectiveOld.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
PopoverDirectiveOld.propDecorators = {
    'anchorElem': [{ type: Input, args: ["clrPopoverOldAnchor",] },],
    'anchorPoint': [{ type: Input, args: ["clrPopoverOldAnchorPoint",] },],
    'popoverPoint': [{ type: Input, args: ["clrPopoverOldPopoverPoint",] },],
    'popoverOptions': [{ type: Input, args: ["clrPopoverOldOptions",] },],
    'clrPopoverOldChange': [{ type: Output, args: ["clrPopoverOldChange",] },],
    'clrPopoverOld': [{ type: Input },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const POPOVER_DIRECTIVES = [PopoverDirectiveOld];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCommonPopoverModule {
}
ClrCommonPopoverModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrCommonPopoverModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ButtonInGroupService {
    constructor() {
        this._changes = new Subject$1();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @param {?} button
     * @return {?}
     */
    updateButtonGroup(button) {
        this._changes.next(button);
    }
}
ButtonInGroupService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ButtonInGroupService.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Button {
    /**
     * @param {?} buttonInGroupService
     */
    constructor(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = "btn";
        this._name = null;
        this._type = null;
        this._disabled = null;
        this._click = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get inMenu() {
        return this._inMenu;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set inMenu(value) {
        value = !!value;
        if (this._inMenu !== value) {
            this._inMenu = value;
            // We check if the service flag is enabled
            // and if the service exists because the service is optional
            if (this._enableService && this.buttonInGroupService) {
                this.buttonInGroupService.updateButtonGroup(this);
            }
        }
    }
    /**
     * @return {?}
     */
    get classNames() {
        return this._classNames;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set classNames(value) {
        if (typeof value === "string") {
            const /** @type {?} */ classNames = value.split(" ");
            if (classNames.indexOf("btn") === -1) {
                classNames.push("btn");
            }
            this._classNames = classNames.join(" ");
        }
    }
    /**
     * @return {?}
     */
    get name() {
        return this._name;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set name(value) {
        if (typeof value === "string") {
            this._name = value;
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        if (typeof value === "string") {
            this._type = value;
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        if (value !== null && value !== false) {
            this._disabled = "";
        }
        else {
            this._disabled = null;
        }
    }
    /**
     * @return {?}
     */
    emitClick() {
        this._click.emit(true);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._enableService = true;
    }
}
Button.decorators = [
    { type: Component, args: [{
                selector: "clr-button",
                template: `
        <ng-template #buttonProjectedRef>
            <button 
                [class]="classNames" 
                (click)="emitClick()"
                [attr.type]="type"
                [attr.name]="name"
                [attr.disabled]="disabled">
                <ng-content></ng-content>
            </button>
        </ng-template>
    `
            },] },
];
/**
 * @nocollapse
 */
Button.ctorParameters = () => [
    { type: ButtonInGroupService, decorators: [{ type: SkipSelf }, { type: Optional },] },
];
Button.propDecorators = {
    'templateRef': [{ type: ViewChild, args: ["buttonProjectedRef",] },],
    'inMenu': [{ type: Input, args: ["clrInMenu",] },],
    'classNames': [{ type: Input, args: ["class",] },],
    'name': [{ type: Input, args: ["name",] },],
    'type': [{ type: Input, args: ["type",] },],
    'disabled': [{ type: Input, args: ["disabled",] },],
    '_click': [{ type: Output, args: ["click",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const menuPositions = ["bottom-left", "bottom-right", "top-left", "top-right", "left-bottom", "left-top", "right-bottom", "right-top"];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ButtonGroup {
    /**
     * @param {?} buttonGroupNewService
     * @param {?} elementRef
     */
    constructor(buttonGroupNewService, elementRef) {
        this.buttonGroupNewService = buttonGroupNewService;
        this.elementRef = elementRef;
        this.inlineButtons = [];
        this.menuButtons = [];
        this._openMenu = false;
        this.anchorPoint = Point.BOTTOM_LEFT;
        this.popoverPoint = Point.LEFT_TOP;
        /**
         * Flag with indicates if the overflow menu toggle was clicked.
         * If true, this can save us traversing the DOM to find
         * whether the click was withing the button group toggle
         * or menu in the onMouseClick method
         */
        this._overflowMenuToggleClicked = false;
    }
    /**
     * 1. Initializes the initial Button Group View
     * 2. Subscribes to changes on the ContentChildren
     *    in case the user content projection changes
     * @return {?}
     */
    ngAfterContentInit() {
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(button => this.rearrangeButton(button));
        this.buttons.changes.subscribe(() => {
            this.initializeButtons();
        });
    }
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    rearrangeButton(button) {
        let /** @type {?} */ fromView;
        let /** @type {?} */ toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        const /** @type {?} */ index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            const /** @type {?} */ moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    }
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param {?} buttonToMove
     * @return {?}
     */
    getMoveIndex(buttonToMove) {
        const /** @type {?} */ tempArr = this.buttons.filter(button => (button.inMenu === buttonToMove.inMenu));
        return tempArr.indexOf(buttonToMove);
    }
    /**
     * Finds where each button belongs based on
     * the ContentChildren
     * @return {?}
     */
    initializeButtons() {
        const /** @type {?} */ tempInlineButtons = [];
        const /** @type {?} */ tempInMenuButtons = [];
        this.buttons.forEach((button) => {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    }
    /**
     * @return {?}
     */
    get menuPosition() {
        return this._menuPosition;
    }
    /**
     * @param {?} pos
     * @return {?}
     */
    set menuPosition(pos) {
        if (pos && (menuPositions.indexOf(pos) > -1)) {
            this._menuPosition = pos;
        }
        else {
            this._menuPosition = "bottom-left";
        }
        // set the popover values based on menu position
        switch (this._menuPosition) {
            case ("top-right"):
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case ("top-left"):
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case ("bottom-right"):
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case ("bottom-left"):
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("right-top"):
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("right-bottom"):
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case ("left-top"):
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case ("left-bottom"):
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    /**
     * @return {?}
     */
    get openMenu() {
        return this._openMenu;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set openMenu(value) {
        this._openMenu = value;
    }
    /**
     * Toggle the Dropdown Menu when the Dropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     * @return {?}
     */
    toggleMenu() {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    }
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     * @param {?} target
     * @return {?}
     */
    onMouseClick(target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            let /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
            const /** @type {?} */ host = this.elementRef.nativeElement; // Current Button Group
            if (current.classList.contains("dropdown-menu")) {
                current = current.parentNode;
                while (current) {
                    if (current === document) {
                        this.openMenu = false;
                        return;
                    }
                    // If clicked on dropdown menu and menu is in host
                    // do nothing
                    if (current === host) {
                        return;
                    }
                    current = current.parentNode;
                }
            }
            this.openMenu = false;
        }
        this._overflowMenuToggleClicked = false; // Reset the overflow menu toggle clicked flag
    }
}
ButtonGroup.decorators = [
    { type: Component, args: [{
                selector: "clr-button-group",
                template: `
      <ng-container *ngFor="let inlineButton of inlineButtons">
          <ng-template [ngTemplateOutlet]="inlineButton.templateRef"></ng-template>
      </ng-container>
      <ng-container *ngIf="menuButtons.length > 0">
          <div
              class="btn-group-overflow open"
              [ngClass]="menuPosition"
              #anchor>
              <button
                  class="btn dropdown-toggle"
                  (click)="toggleMenu()">
                  <clr-icon shape="ellipsis-horizontal"></clr-icon>
              </button>
              <div
                  class="dropdown-menu"
                  *clrPopoverOld="openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;">
                  <ng-template [ngTemplateOutlet]="ref"></ng-template>
              </div>
          </div>
      </ng-container>
      <ng-template #ref>
          <ng-container *ngFor="let menuButton of menuButtons">
              <ng-template [ngTemplateOutlet]="menuButton.templateRef"></ng-template>
          </ng-container>
      </ng-template>
    `,
                providers: [ButtonInGroupService],
                host: { "[class.btn-group]": "true" }
            },] },
];
/**
 * @nocollapse
 */
ButtonGroup.ctorParameters = () => [
    { type: ButtonInGroupService, },
    { type: ElementRef, },
];
ButtonGroup.propDecorators = {
    'buttons': [{ type: ContentChildren, args: [Button,] },],
    'menuPosition': [{ type: Input, args: ["clrMenuPosition",] },],
    'onMouseClick': [{ type: HostListener, args: ["document:click", ["$event.target"],] },],
};

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const BUTTON_GROUP_DIRECTIVES = [Button, ButtonGroup];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrButtonGroupModule {
}
ClrButtonGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrCommonPopoverModule],
                declarations: [BUTTON_GROUP_DIRECTIVES],
                exports: [BUTTON_GROUP_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrButtonGroupModule.ctorParameters = () => [];

/**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 * @abstract
 */
class LoadingListener {
    /**
     * @abstract
     * @return {?}
     */
    startLoading() { }
    /**
     * @abstract
     * @return {?}
     */
    doneLoading() { }
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Loading {
    /**
     * @param {?} listener
     */
    constructor(listener) {
        this.listener = listener;
        this._loading = false;
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        value = !!value;
        if (value === this._loading) {
            return;
        }
        this._loading = value;
        if (this.listener) {
            if (value) {
                this.listener.startLoading();
            }
            else {
                this.listener.doneLoading();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.loading = false;
    }
}
Loading.decorators = [
    { type: Directive, args: [{ selector: "[clrLoading]" },] },
];
/**
 * @nocollapse
 */
Loading.ctorParameters = () => [
    { type: LoadingListener, decorators: [{ type: Optional },] },
];
Loading.propDecorators = {
    'loading': [{ type: Input, args: ["clrLoading",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const LOADING_DIRECTIVES = [Loading];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrLoadingModule {
}
ClrLoadingModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [LOADING_DIRECTIVES], exports: [LOADING_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrLoadingModule.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class LoadingButton {
    /**
     * @return {?}
     */
    startLoading() {
        this.loading = true;
    }
    /**
     * @return {?}
     */
    doneLoading() {
        this.loading = false;
    }
}
LoadingButton.decorators = [
    { type: Component, args: [{
                selector: "button[clrLoading]",
                template: `
        <span class="spinner spinner-inline" *ngIf="loading"></span>
        <ng-content></ng-content>
    `,
                providers: [{ provide: LoadingListener, useExisting: LoadingButton }]
            },] },
];
/**
 * @nocollapse
 */
LoadingButton.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const LOADING_BUTTON_DIRECTIVES = [LoadingButton];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrLoadingButtonModule {
}
ClrLoadingButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrLoadingModule],
                declarations: [LOADING_BUTTON_DIRECTIVES],
                exports: [LOADING_BUTTON_DIRECTIVES, ClrLoadingModule]
            },] },
];
/**
 * @nocollapse
 */
ClrLoadingButtonModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrButtonModule {
}
ClrButtonModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ClrLoadingButtonModule,
                    ClrButtonGroupModule,
                ]
            },] },
];
/**
 * @nocollapse
 */
ClrButtonModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class CodeHighlight {
    /**
     * @param {?} _el
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(_el, renderer, platformId) {
        this._el = _el;
        this.renderer = renderer;
        this.platformId = platformId;
        this._highlight = "";
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.redraw();
    }
    /**
     * @return {?}
     */
    redraw() {
        // Only run Prism in browser engines
        if (this._el && this._el.nativeElement && isPlatformBrowser(this.platformId) && undefined !== Prism) {
            Prism.highlightElement(this._el.nativeElement);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set highlight(val) {
        if (val && val.trim() !== "") {
            this._highlight = val;
            this.renderer.addClass(this._el.nativeElement, this._highlight);
        }
    }
    /**
     * @return {?}
     */
    get highlight() {
        return this._highlight;
    }
}
CodeHighlight.decorators = [
    { type: Directive, args: [{ selector: "code[clr-code-highlight]" },] },
];
/**
 * @nocollapse
 */
CodeHighlight.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
CodeHighlight.propDecorators = {
    'highlight': [{ type: Input, args: ["clr-code-highlight",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CODE_HIGHLIGHT_DIRECTIVES = [CodeHighlight];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrSyntaxHighlightModule {
}
ClrSyntaxHighlightModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CODE_HIGHLIGHT_DIRECTIVES], exports: [CODE_HIGHLIGHT_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrSyntaxHighlightModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrCodeModule {
}
ClrCodeModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrSyntaxHighlightModule] },] },
];
/**
 * @nocollapse
 */
ClrCodeModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Private counter to generate unique IDs for the checkboxes, to bind the labels to them.
 */
let latestId = 0;
class Checkbox {
    constructor() {
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (latestId++).toString();
        this.name = null;
        this.disabled = false;
        this.inline = false;
        this._checked = false;
        this._indeterminate = false;
        this.indeterminateChange = new EventEmitter(false);
        this.change = new EventEmitter(false);
        this.onChangeCallback = (_) => { };
        this.onTouchedCallback = () => { };
    }
    /**
     * @return {?}
     */
    get id() {
        return `clr-checkbox-${this._id}`;
    }
    /**
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checked(value) {
        if (value !== this._checked) {
            if (this._indeterminate) {
                this.setIndeterminate(false);
            }
            this.setChecked(value);
        }
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        if (this._indeterminate !== value) {
            if (this._checked) {
                this.setChecked(false);
            }
            this.setIndeterminate(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setIndeterminate(value) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChecked(value) {
        this._checked = value;
        this.change.emit(this._checked);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    }
    /**
     * @param {?} onChange
     * @return {?}
     */
    registerOnChange(onChange) {
        this.onChangeCallback = onChange;
    }
    /**
     * @param {?} onTouched
     * @return {?}
     */
    registerOnTouched(onTouched) {
        this.onTouchedCallback = onTouched;
    }
    /**
     * @return {?}
     */
    touch() {
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    checkIndeterminateState() {
        if (!this.disabled) {
            this.toggle();
        }
    }
}
Checkbox.decorators = [
    { type: Component, args: [{
                selector: "clr-checkbox",
                template: `
        <!--
            FIXME: We are not subscribed to the change event but the click event here.
            The reason for that is because checkboxes behave differently on IE & Edge.
            https://stackoverflow.com/a/19447939
            
            To fix that, we listen to every click event and then toggle the checkbox manually
            to make it behave the same way across the browsers we support.
            
            This works for cases when users toggle the checkbox using the keyboard too:
            https://stackoverflow.com/questions/27878940/spacebar-triggering-click-event-on-checkbox
        -->
        <input type="checkbox" [id]="id" [name]="name" [checked]="checked"
               [indeterminate]="indeterminate" [disabled]="disabled"
               (blur)="touch()" (click)="checkIndeterminateState()">
        <label [attr.for]="id">
            <ng-content></ng-content>
        </label>
    `,
                host: { "[class.checkbox]": "!inline", "[class.checkbox-inline]": "inline", "[class.disabled]": "disabled" },
                /*
                 * This provider lets us declare our checkbox as a ControlValueAccessor,
                 * which allows us to use [(ngModel)] directly on our component,
                 * with all the automatic features wiring that come with it.
                 */
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Checkbox), multi: true }]
            },] },
];
/**
 * @nocollapse
 */
Checkbox.ctorParameters = () => [];
Checkbox.propDecorators = {
    '_id': [{ type: Input, args: ["id",] },],
    'name': [{ type: Input, args: ["name",] },],
    'disabled': [{ type: Input, args: ["clrDisabled",] },],
    'inline': [{ type: Input, args: ["clrInline",] },],
    'checked': [{ type: Input, args: ["clrChecked",] },],
    'indeterminate': [{ type: Input, args: ["clrIndeterminate",] },],
    'indeterminateChange': [{ type: Output, args: ["clrIndeterminateChange",] },],
    'change': [{ type: Output, args: ["clrCheckedChange",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CHECKBOX_DIRECTIVES = [Checkbox];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrFormsModule {
}
ClrFormsModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CHECKBOX_DIRECTIVES], exports: [CHECKBOX_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrFormsModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Expand {
    constructor() {
        this.expandable = 0;
        this.replace = false;
        this._loading = false;
        this._expanded = false;
        this._animate = new Subject$1();
        this._expandChange = new Subject$1();
    }
    /**
     * @return {?}
     */
    get loading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        value = !!value;
        if (value !== this._loading) {
            this._loading = value;
        }
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (value !== this._expanded) {
            this._expanded = value;
            this._animate.next();
            this._expandChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    get animate() {
        return this._animate.asObservable();
    }
    /**
     * @return {?}
     */
    get expandChange() {
        return this._expandChange.asObservable();
    }
    /**
     * @return {?}
     */
    startLoading() {
        this.loading = true;
    }
    /**
     * @return {?}
     */
    doneLoading() {
        this.loading = false;
        this._animate.next();
    }
}
Expand.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Expand.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
class IfExpanded {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} expand
     */
    constructor(template, container, expand) {
        this.template = template;
        this.container = container;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(() => {
            this.updateView();
            this.expandedChange.emit(this.expand.expanded);
        }));
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        if (typeof value === "boolean") {
            this.expand.expanded = value;
            this._expanded = value;
        }
    }
    /**
     * @return {?}
     */
    updateView() {
        if (this.expand.expanded && this.container.length !== 0) {
            return;
        }
        if (this.expand.expanded) {
            // Should we pass a context? I don't see anything useful to pass right now,
            // but we can come back to it in the future as a solution for additional features.
            this.container.createEmbeddedView(this.template);
        }
        else {
            // TODO: Move when we move the animation logic to Datagrid Row Expand
            // We clear before the animation is over. Not ideal, but doing better would involve a much heavier
            // process for very little gain. Once Angular animations are dynamic enough, we should be able to
            // get the optimal behavior.
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateView();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.expand.expandable--;
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
IfExpanded.decorators = [
    { type: Directive, args: [{ selector: "[clrIfExpanded]" },] },
];
/**
 * @nocollapse
 */
IfExpanded.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Expand, },
];
IfExpanded.propDecorators = {
    'expanded': [{ type: Input, args: ["clrIfExpanded",] },],
    'expandedChange': [{ type: Output, args: ["clrIfExpandedChange",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const EXPAND_DIRECTIVES = [IfExpanded];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrIfExpandModule {
}
ClrIfExpandModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [EXPAND_DIRECTIVES], exports: [EXPAND_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrIfExpandModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class OutsideClick {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new EventEmitter(false);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    documentClick(event) {
        const /** @type {?} */ target = event.target; // Get the element in the DOM on which the mouse was clicked
        const /** @type {?} */ host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    }
}
OutsideClick.decorators = [
    { type: Directive, args: [{ selector: "[clrOutsideClick]" },] },
];
/**
 * @nocollapse
 */
OutsideClick.ctorParameters = () => [
    { type: ElementRef, },
];
OutsideClick.propDecorators = {
    'strict': [{ type: Input, args: ["clrStrict",] },],
    'outsideClick': [{ type: Output, args: ["clrOutsideClick",] },],
    'documentClick': [{ type: HostListener, args: ["document:click", ["$event"],] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrOutsideClickModule {
}
ClrOutsideClickModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrOutsideClickModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * If we someday want to be able to render the datagrid in a webworker,
 * this is where we would test if we're in headless mode. Right now it's not testing anything, but any access
 * to native DOM elements' methods and properties in the Datagrid happens here.
 */
class DomAdapter {
    /**
     * @param {?} element
     * @return {?}
     */
    userDefinedWidth(element) {
        element.classList.add("datagrid-cell-width-zero");
        const /** @type {?} */ userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue("width"), 10);
        element.classList.remove("datagrid-cell-width-zero");
        return userDefinedWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollBarWidth(element) {
        return element.offsetWidth - element.clientWidth;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    scrollWidth(element) {
        return element.scrollWidth || 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    computedHeight(element) {
        return parseInt(getComputedStyle(element).getPropertyValue("height"), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectRight(element) {
        return parseInt(element.getBoundingClientRect().right, 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clientRectWidth(element) {
        return parseInt(element.getBoundingClientRect().width, 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    minWidth(element) {
        return parseInt(getComputedStyle(element).getPropertyValue("min-width"), 10);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    focus(element) {
        element.focus();
    }
}
DomAdapter.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DomAdapter.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridRenderOrganizer {
    constructor() {
        this.alreadySized = false;
        this.widths = [];
        this._noLayout = new Subject$1();
        this._clearWidths = new Subject$1();
        this._detectStrictWidths = new Subject$1();
        this._tableMode = new Subject$1();
        this._computeWidths = new Subject$1();
        this._alignColumns = new Subject$1();
        this.scrollbar = new Subject$1();
        this.scrollbarWidth = new Subject$1();
        this._done = new Subject$1();
    }
    /**
     * @return {?}
     */
    get noLayout() {
        return this._noLayout.asObservable();
    }
    /**
     * @return {?}
     */
    get clearWidths() {
        return this._clearWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get detectStrictWidths() {
        return this._detectStrictWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get tableMode() {
        return this._tableMode.asObservable();
    }
    /**
     * @return {?}
     */
    get computeWidths() {
        return this._computeWidths.asObservable();
    }
    /**
     * @return {?}
     */
    get alignColumns() {
        return this._alignColumns.asObservable();
    }
    /**
     * @return {?}
     */
    get done() {
        return this._done.asObservable();
    }
    /**
     * @return {?}
     */
    resize() {
        this.widths.length = 0;
        this._noLayout.next(true);
        if (this.alreadySized) {
            this._clearWidths.next();
        }
        this._detectStrictWidths.next();
        this._tableMode.next(true);
        this._computeWidths.next();
        this._tableMode.next(false);
        this._alignColumns.next();
        this._noLayout.next(false);
        this.scrollbar.next();
        this.alreadySized = true;
        this._done.next();
    }
}
DatagridRenderOrganizer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DatagridRenderOrganizer.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This is a hack that we have to write for now because of bugs and limitations in Angular,
 * please do not use this as an example.
 */
class DatagridRowExpandAnimation {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} renderer
     * @param {?} expand
     * @param {?} renderOrganizer
     */
    constructor(el, domAdapter, renderer, expand, renderOrganizer) {
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.renderOrganizer = renderOrganizer;
        if (expand) {
            expand.animate.subscribe(() => {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (this.oldHeight) {
                    setTimeout(() => this.run());
                }
                else {
                    this.animate();
                }
            });
        }
    }
    /**
     * @return {?}
     */
    animate() {
        // Check if we do have web-animations available. If not, just skip the animation.
        if (!this.el.nativeElement.animate) {
            return;
        }
        // We had an animation running, we skip to the end
        if (this.running) {
            this.running.finish();
        }
        this.oldHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        // We set the height of the element immediately to avoid a flicker before the animation starts.
        this.renderer.setStyle(this.el.nativeElement, "height", this.oldHeight + "px");
        this.renderer.setStyle(this.el.nativeElement, "overflow-y", "hidden");
        setTimeout(() => {
            if (this.expand.loading) {
                return;
            }
            this.run();
        });
    }
    /**
     * @return {?}
     */
    run() {
        this.renderer.setStyle(this.el.nativeElement, "height", null);
        // I don't like realigning the columns before the animation, since the scrollbar could appear or disappear
        // halfway, but that's a compromise we have to make for now. We can look into a smarter fix later.
        this.renderOrganizer.scrollbar.next();
        const /** @type {?} */ newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + "px", newHeight + "px"], overflowY: ["hidden", "hidden"], easing: "ease-in-out" }, { duration: 200 });
        this.running.onfinish = () => {
            this.renderer.setStyle(this.el.nativeElement, "overflow-y", null);
            delete this.running;
        };
        delete this.oldHeight;
    }
}
DatagridRowExpandAnimation.decorators = [
    { type: Directive, args: [{ selector: "clr-dg-row" },] },
];
/**
 * @nocollapse
 */
DatagridRowExpandAnimation.ctorParameters = () => [
    { type: ElementRef, },
    { type: DomAdapter, },
    { type: Renderer2, },
    { type: Expand, },
    { type: DatagridRenderOrganizer, },
];

/**
 * @abstract
 */
class CustomFilter {
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StateDebouncer {
    constructor() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject$1();
        this.nbChanges = 0;
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    changeStart() {
        this.nbChanges++;
    }
    /**
     * @return {?}
     */
    changeDone() {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    }
}
StateDebouncer.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
StateDebouncer.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Page {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Page size, a value of 0 means no pagination
         */
        this._size = 0;
        /**
         * Total items (needed to guess the last page)
         */
        this._totalItems = 0;
        /**
         * The Observable that lets other classes subscribe to page changes
         */
        this._change = new Subject$1();
        this._sizeChange = new Subject$1();
        /**
         * Current page
         */
        this._current = 1;
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        const /** @type {?} */ oldSize = this._size;
        if (size !== oldSize) {
            this._size = size;
            // Yeap. That's the formula to keep the first item from the old page still
            // displayed in the new one.
            this._current = Math.floor(oldSize / size * (this._current - 1)) + 1;
            // We always emit an event even if the current page index didn't change, because
            // the size changing means the items inside the page are different
            this._change.next(this._current);
            this._sizeChange.next(this._size);
        }
    }
    /**
     * @return {?}
     */
    get totalItems() {
        return this._totalItems;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        this._totalItems = total;
        // If we have less items than before, we might need to change the current page
        if (this.current > this.last) {
            this.current = this.last;
        }
    }
    /**
     * @return {?}
     */
    get last() {
        if (this._last) {
            return this._last;
        }
        // If the last page isn't known, we compute it from the last item's index
        if (this.size > 0 && this.totalItems) {
            return Math.ceil(this.totalItems / this.size);
        }
        return 1;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set last(page) {
        this._last = page;
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    get sizeChange() {
        return this._sizeChange.asObservable();
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set current(page) {
        if (page !== this._current) {
            this.stateDebouncer.changeStart();
            this._current = page;
            this._change.next(page);
            this.stateDebouncer.changeDone();
        }
    }
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    previous() {
        if (this.current > 1) {
            this.current--;
        }
    }
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    next() {
        if (this.current < this.last) {
            this.current++;
        }
    }
    /**
     * Index of the first item displayed on the current page, starting at 0
     * @return {?}
     */
    get firstItem() {
        if (this.size === 0) {
            return 0;
        }
        return (this.current - 1) * this.size;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0
     * @return {?}
     */
    get lastItem() {
        if (this.size === 0) {
            return this.totalItems - 1;
        }
        let /** @type {?} */ lastInPage = (this.current) * this.size - 1;
        if (this.totalItems) {
            lastInPage = Math.min(lastInPage, this.totalItems - 1);
        }
        return lastInPage;
    }
}
Page.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Page.ctorParameters = () => [
    { type: StateDebouncer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class FiltersProvider {
    /**
     * @param {?} _page
     * @param {?} stateDebouncer
     */
    constructor(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject$1();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    hasActiveFilters() {
        // We do not use getActiveFilters() because this function will be called much more often
        // and stopping the loop early might be relevant.
        for (const { filter } of this._all) {
            if (filter && filter.isActive()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    getActiveFilters() {
        const /** @type {?} */ ret = [];
        for (const { filter } of this._all) {
            if (filter && filter.isActive()) {
                ret.push(filter);
            }
        }
        return ret;
    }
    /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    add(filter) {
        const /** @type {?} */ index = this._all.length;
        const /** @type {?} */ subscription = filter.changes.subscribe(() => this.resetPageAndEmitFilterChange([filter]));
        let /** @type {?} */ hasUnregistered = false;
        const /** @type {?} */ registered = new RegisteredFilter(filter, () => {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            this._all.splice(index, 1);
            if (filter.isActive()) {
                this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    }
    /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        for (const { filter } of this._all) {
            if (filter && filter.isActive() && !filter.accepts(item)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @param {?} filters
     * @return {?}
     */
    resetPageAndEmitFilterChange(filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    }
}
FiltersProvider.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FiltersProvider.ctorParameters = () => [
    { type: Page, },
    { type: StateDebouncer, },
];
class RegisteredFilter {
    /**
     * @param {?} filter
     * @param {?} unregister
     */
    constructor(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
class DatagridFilterRegistrar {
    /**
     * @param {?} filters
     */
    constructor(filters) {
        this.filters = filters;
    }
    /**
     * @return {?}
     */
    get filter() {
        return this.registered && this.registered.filter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    setFilter(filter) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter instanceof RegisteredFilter) {
            this.registered = (filter);
        }
        else if (filter) {
            this.registered = this.filters.add(/** @type {?} */ (filter));
        }
    }
    /**
     * @return {?}
     */
    deleteFilter() {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.deleteFilter();
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Custom filter that can be added in any column to override the default object property string filter.
 * The reason this is not just an input on DatagridColumn is because we need the filter's template to be projected,
 * since it can be anything (not just a text input).
 */
class DatagridFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} _filters
     */
    constructor(_filters) {
        super(_filters);
        this.anchorPoint = Point.RIGHT_BOTTOM;
        this.popoverPoint = Point.RIGHT_TOP;
        this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set open(open) {
        const /** @type {?} */ boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set customFilter(filter) {
        this.setFilter(filter);
    }
    /**
     * Indicates if the filter is currently active
     * @return {?}
     */
    get active() {
        return !!this.filter && this.filter.isActive();
    }
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
}
DatagridFilter.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-filter",
                // We register this component as a CustomFilter, for the parent column to detect it.
                providers: [{ provide: CustomFilter, useExisting: DatagridFilter }],
                template: `
        <button #anchor class="datagrid-filter-toggle" (click)="toggle()"
            [class.datagrid-filter-open]="open" [class.datagrid-filtered]="active"
            type="button"></button>

        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
             [clrPopoverOldPopoverPoint]="popoverPoint" [clrPopoverOldOptions]="popoverOptions">
            <div class="datagrid-filter">
                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->
                <div class="datagrid-filter-close-wrapper">
                    <button type="button" class="close" 
                        aria-label="Close" (click)="open = false"
                        type="button">
                        <clr-icon aria-hidden="true" shape="close"></clr-icon>
                    </button>
                </div>
    
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
            },] },
];
/**
 * @nocollapse
 */
DatagridFilter.ctorParameters = () => [
    { type: FiltersProvider, },
];
DatagridFilter.propDecorators = {
    'open': [{ type: Input, args: ["clrDgFilterOpen",] },],
    'openChanged': [{ type: Output, args: ["clrDgFilterOpenChange",] },],
    'customFilter': [{ type: Input, args: ["clrDgFilter",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridStringFilterImpl {
    /**
     * @param {?} filterFn
     */
    constructor(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject$1();
        /**
         * Raw input value
         */
        this._rawValue = "";
        /**
         * Input value converted to lowercase
         */
        this._lowerCaseValue = "";
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._rawValue;
    }
    /**
     * @return {?}
     */
    get lowerCaseValue() {
        return this._lowerCaseValue;
    }
    /**
     * Common setter for the input value
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value) {
            value = "";
        }
        if (value !== this._rawValue) {
            this._rawValue = value;
            this._lowerCaseValue = value.toLowerCase().trim();
            this._changes.next(value);
        }
    }
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    isActive() {
        return !!this.value;
    }
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridStringFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} renderer
     * @param {?} filters
     * @param {?} domAdapter
     */
    constructor(renderer, filters, domAdapter) {
        super(filters);
        this.renderer = renderer;
        this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on a search text
     * @param {?} value
     * @return {?}
     */
    set customStringFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridStringFilterImpl(/** @type {?} */ (value)));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.filterContainer.openChanged.subscribe((open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(() => {
                    this.domAdapter.focus(this.input.nativeElement);
                });
            }
        });
    }
    /**
     * Common setter for the input value
     * @return {?}
     */
    get value() {
        return this.filter.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!this.filter) {
            return;
        }
        if (!value) {
            value = "";
        }
        if (value !== this.filter.value) {
            this.filter.value = value;
            this.filterValueChange.emit(value);
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.open = false;
    }
}
DatagridStringFilter.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-string-filter",
                providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <!--
                Even though this *ngIf looks useless because the filter container already has one,
                it prevents NgControlStatus and other directives automatically added by Angular
                on inputs with NgModel from freaking out because of their host binding changing
                mid-change detection when the input is destroyed.
            -->
            <input #input type="text" name="search" [(ngModel)]="value" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()"/>
        </clr-dg-filter>
    `
            },] },
];
/**
 * @nocollapse
 */
DatagridStringFilter.ctorParameters = () => [
    { type: Renderer2, },
    { type: FiltersProvider, },
    { type: DomAdapter, },
];
DatagridStringFilter.propDecorators = {
    'customStringFilter': [{ type: Input, args: ["clrDgStringFilter",] },],
    'input': [{ type: ViewChild, args: ["input",] },],
    'filterContainer': [{ type: ViewChild, args: [DatagridFilter,] },],
    'value': [{ type: Input, args: ["clrFilterValue",] },],
    'filterValueChange': [{ type: Output, args: ["clrFilterValueChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
class OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     */
    constructor(cdr, willyWonka) {
        this.subscription = willyWonka.chocolate.subscribe(() => {
            if (this.latestFlavor !== this.flavor) {
                cdr.detectChanges();
            }
        });
    }
    /**
     * @abstract
     * @return {?}
     */
    flavor() { }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.latestFlavor = this.flavor;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class RowActionService {
    constructor() {
        this.actionableCount = 0;
    }
    /**
     * @return {?}
     */
    register() {
        this.actionableCount++;
    }
    /**
     * @return {?}
     */
    unregister() {
        this.actionableCount--;
    }
    /**
     * false means no rows with action
     * @return {?}
     */
    get hasActionableRow() {
        return this.actionableCount > 0;
    }
}
RowActionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
RowActionService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WillyWonka {
    constructor() {
        this._chocolate = new Subject$1();
    }
    /**
     * @return {?}
     */
    get chocolate() {
        return this._chocolate.asObservable();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._chocolate.next();
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridWillyWonka extends WillyWonka {
}
DatagridWillyWonka.decorators = [
    { type: Directive, args: [{ selector: "clr-datagrid" },] },
];
/**
 * @nocollapse
 */
DatagridWillyWonka.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ActionableOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} rowActions
     */
    constructor(cdr, willyWonka, rowActions) {
        if (!willyWonka) {
            throw new Error("clr-dg-row should only be used inside of a clr-datagrid");
        }
        super(cdr, willyWonka);
        this.rowActions = rowActions;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.rowActions.hasActionableRow;
    }
}
ActionableOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: "clr-datagrid, clr-dg-row" },] },
];
/**
 * @nocollapse
 */
ActionableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: Optional },] },
    { type: RowActionService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ExpandableRowsCount {
    constructor() {
        this.expandableCount = 0;
    }
    /**
     * @return {?}
     */
    register() {
        this.expandableCount++;
    }
    /**
     * @return {?}
     */
    unregister() {
        this.expandableCount--;
    }
    /**
     * false means no rows with action
     * @return {?}
     */
    get hasExpandableRow() {
        return this.expandableCount > 0;
    }
}
ExpandableRowsCount.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ExpandableRowsCount.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ExpandableOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} expandableCount
     */
    constructor(cdr, willyWonka, expandableCount) {
        if (!willyWonka) {
            throw new Error("clr-dg-row should only be used inside of a clr-datagrid");
        }
        super(cdr, willyWonka);
        this.expandableCount = expandableCount;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.expandableCount.hasExpandableRow;
    }
}
ExpandableOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: "clr-datagrid, clr-dg-row" },] },
];
/**
 * @nocollapse
 */
ExpandableOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: Optional },] },
    { type: ExpandableRowsCount, },
];

/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 */
class NestedProperty {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
        if (prop.indexOf(".") >= 0) {
            this.splitProp = prop.split(".");
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getPropValue(item) {
        if (this.splitProp) {
            let /** @type {?} */ value = item;
            for (const /** @type {?} */ nestedProp of this.splitProp) {
                if (value == null || typeof value === "undefined" || typeof value[nestedProp] === "undefined") {
                    return undefined;
                }
                value = value[nestedProp];
            }
            return value;
        }
        else {
            return item[this.prop];
        }
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridPropertyComparator {
    /**
     * @param {?} prop
     */
    constructor(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        let /** @type {?} */ propA = this.nestedProp.getPropValue(a);
        let /** @type {?} */ propB = this.nestedProp.getPropValue(b);
        if (typeof propA === "string") {
            propA = propA.toLowerCase();
        }
        if (typeof propB === "string") {
            propB = propB.toLowerCase();
        }
        if (typeof propA === "undefined" || propA === null) {
            if (typeof propB === "undefined" || propB === null) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            if (typeof propB === "undefined" || propB === null) {
                return -1;
            }
            else if (propA < propB) {
                return -1;
            }
            else if (propA > propB) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridPropertyStringFilter {
    /**
     * @param {?} prop
     * @param {?=} exact
     */
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} item
     * @param {?} search
     * @return {?}
     */
    accepts(item, search) {
        const /** @type {?} */ propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === "undefined") {
            return false;
        }
        else if (this.exact) {
            return ("" + propValue).toLowerCase() === search;
        }
        else {
            return ("" + propValue).toLowerCase().indexOf(search) >= 0;
        }
    }
}

let SortOrder = {};
SortOrder.Unsorted = 0;
SortOrder.Asc = 1;
SortOrder.Desc = -1;
SortOrder[SortOrder.Unsorted] = "Unsorted";
SortOrder[SortOrder.Asc] = "Asc";
SortOrder[SortOrder.Desc] = "Desc";

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DragDispatcher {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new Subject$1();
        this._onDragMove = new Subject$1();
        this._onDragEnd = new Subject$1();
    }
    /**
     * @return {?}
     */
    get onDragStart() {
        return this._onDragStart;
    }
    /**
     * @return {?}
     */
    get onDragMove() {
        return this._onDragMove;
    }
    /**
     * @return {?}
     */
    get onDragEnd() {
        return this._onDragEnd;
    }
    /**
     * @return {?}
     */
    addDragListener() {
        const /** @type {?} */ handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, "mousedown", "mousemove", "mouseup"),
            this.customDragEvent(handleEl, "touchstart", "touchmove", "touchend")
        ];
    }
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    customDragEvent(element, startOnEvent, moveOnEvent, endOnEvent) {
        let /** @type {?} */ dragMoveListener;
        let /** @type {?} */ dragEndListener;
        return this._renderer.listen(element, startOnEvent, (startEvent) => {
            this.notifyDragStart(startEvent);
            dragMoveListener = this._ngZone.runOutsideAngular(() => {
                return this._renderer.listen("document", moveOnEvent, (moveEvent) => {
                    this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = this._renderer.listen("document", endOnEvent, (endEvent) => {
                // Unsubscribing from mouseMoveListener
                dragMoveListener();
                this.notifyDragEnd(endEvent);
                // Unsubscribing from itself
                dragEndListener();
            });
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragStart(event) {
        return this._onDragStart.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragMove(event) {
        return this._onDragMove.next(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notifyDragEnd(event) {
        return this._onDragEnd.next(event);
    }
    /**
     * @return {?}
     */
    destroy() {
        this._listeners.map(event => event());
    }
}
DragDispatcher.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DragDispatcher.ctorParameters = () => [
    { type: NgZone, },
    { type: Renderer2, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Sort {
    /**
     * @param {?} stateDebouncer
     */
    constructor(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Ascending order if false, descending if true
         */
        this._reverse = false;
        /**
         * The Observable that lets other classes subscribe to sort changes
         */
        this._change = new Subject$1();
    }
    /**
     * @return {?}
     */
    get comparator() {
        return this._comparator;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set comparator(value) {
        this.stateDebouncer.changeStart();
        this._comparator = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @return {?}
     */
    get reverse() {
        return this._reverse;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set reverse(value) {
        this.stateDebouncer.changeStart();
        this._reverse = value;
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * @return {?}
     */
    emitChange() {
        this._change.next(this);
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
     * optional forceReverse input parameter allows to override that toggling behavior by sorting in
     * reverse order if `true`.
     *
     *
     * \@memberof Sort
     * @param {?} sortBy
     * @param {?=} forceReverse
     * @return {?}
     */
    toggle(sortBy, forceReverse) {
        this.stateDebouncer.changeStart();
        // We modify private properties directly, to batch the change event
        if (this.comparator === sortBy) {
            this._reverse = typeof forceReverse !== "undefined" ? forceReverse || !this._reverse : !this._reverse;
        }
        else {
            this._comparator = sortBy;
            this._reverse = typeof forceReverse !== "undefined" ? forceReverse : false;
        }
        this.emitChange();
        this.stateDebouncer.changeDone();
    }
    /**
     * Clears the current sorting order
     * @return {?}
     */
    clear() {
        this.comparator = null;
    }
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    compare(a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    }
}
Sort.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Sort.ctorParameters = () => [
    { type: StateDebouncer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbCount = 0;
class DatagridColumn extends DatagridFilterRegistrar {
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} _dragDispatcher
     */
    constructor(_sort, filters, _dragDispatcher) {
        super(filters);
        this._sort = _sort;
        this._dragDispatcher = _dragDispatcher;
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = SortOrder.Unsorted;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== SortOrder.Unsorted && sort.comparator !== this._sortBy) {
                this._sortOrder = SortOrder.Unsorted;
                this.sortOrderChange.emit(this._sortOrder);
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        this.columnId = "dg-col-" + nbCount.toString(); // Approximate a GUID
        nbCount++;
        // put index here
    }
    /**
     * \@property hidden
     *
     * \@description
     * A property that allows the column to be hidden / shown with css
     * Note the default allows the DatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not initialized)
     *
     * \@default false
     *
     * @return {?}
     */
    get hidden() {
        return !!this.hideable && this.hideable.hidden;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set handleElRef(value) {
        this._dragDispatcher.handleRef = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set handleTrackerElRef(value) {
        this._dragDispatcher.handleTrackerRef = value;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    get field() {
        return this._field;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) {
        if (typeof field === "string") {
            this._field = field;
            if (!this.customFilter) {
                this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} comparator
     * @return {?}
     */
    set sortBy(comparator) {
        if (typeof comparator === "string") {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     * @return {?}
     */
    get sortable() {
        return !!this._sortBy;
    }
    /**
     * @return {?}
     */
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @param {?} value
     * @return {?}
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() {
        return this._sortOrder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
        if (typeof value === "undefined") {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case SortOrder.Unsorted:
                this._sort.clear();
                break;
            case SortOrder.Asc:
                this.sort(false);
                break;
            case SortOrder.Desc:
                this.sort(true);
                break;
        }
    }
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? SortOrder.Desc : SortOrder.Asc;
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in ascending order
     * @return {?}
     */
    get asc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === "undefined") {
            return this.sorted && !this._sort.reverse;
        }
        else {
            return this.sortOrder === SortOrder.Asc;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in descending order
     * @return {?}
     */
    get desc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === "undefined") {
            return this.sorted && this._sort.reverse;
        }
        else {
            return this.sortOrder === SortOrder.Desc;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * @param {?} custom
     * @return {?}
     */
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    /**
     * @return {?}
     */
    get filterValue() {
        return this.filter.value;
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set filterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (!newValue) {
            newValue = "";
        }
        if (newValue !== this.filter.value) {
            this.filter.value = newValue;
            this.filterValueChange.emit(newValue);
        }
    }
}
DatagridColumn.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-column",
                template: `
        <div class="datagrid-column-flex">
            <!-- I'm really not happy with that select since it's not very scalable -->
            <ng-content select="clr-dg-filter, clr-dg-string-filter"></ng-content>

            <clr-dg-string-filter
                    *ngIf="field && !customFilter"
                    [clrDgStringFilter]="registered"
                    [(clrFilterValue)]="filterValue"></clr-dg-string-filter>

            <ng-template #columnTitle><ng-content></ng-content></ng-template>

            <button class="datagrid-column-title" *ngIf="sortable" (click)="sort()" type="button">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </button>

            <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

            <div class="datagrid-column-separator">
                <button #columnHandle class="datagrid-column-handle" tabindex="-1" type="button"></button>
                <div #columnHandleTracker class="datagrid-column-handle-tracker"></div>
            </div>
        </div>
    `,
                host: { "[class.datagrid-column]": "true", "[class.datagrid-column--hidden]": "hidden" }
            },] },
];
/**
 * @nocollapse
 */
DatagridColumn.ctorParameters = () => [
    { type: Sort, },
    { type: FiltersProvider, },
    { type: DragDispatcher, },
];
DatagridColumn.propDecorators = {
    'handleElRef': [{ type: ViewChild, args: ["columnHandle",] },],
    'handleTrackerElRef': [{ type: ViewChild, args: ["columnHandleTracker",] },],
    'field': [{ type: Input, args: ["clrDgField",] },],
    'sortBy': [{ type: Input, args: ["clrDgSortBy",] },],
    'sorted': [{ type: Input, args: ["clrDgSorted",] },],
    'sortedChange': [{ type: Output, args: ["clrDgSortedChange",] },],
    'sortOrder': [{ type: Input, args: ["clrDgSortOrder",] },],
    'sortOrderChange': [{ type: Output, args: ["clrDgSortOrderChange",] },],
    'asc': [{ type: HostBinding, args: ["class.asc",] },],
    'desc': [{ type: HostBinding, args: ["class.desc",] },],
    'projectedFilter': [{ type: ContentChild, args: [CustomFilter,] },],
    'filterValue': [{ type: Input, args: ["clrFilterValue",] },],
    'filterValueChange': [{ type: Output, args: ["clrFilterValueChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Items {
    /**
     * @param {?} _filters
     * @param {?} _sort
     * @param {?} _page
     */
    constructor(_filters, _sort, _page) {
        this._filters = _filters;
        this._sort = _sort;
        this._page = _page;
        /**
         * Indicates if the data is currently loading
         */
        this.loading = false;
        /**
         * Tracking function to identify objects. Default is reference equality.
         */
        this.trackBy = (index, item) => item;
        /**
         * Whether we should use smart items for this datagrid or let the user handle
         * everything.
         */
        this._smart = false;
        /**
         * List of items currently displayed
         */
        this._displayed = [];
        /**
         * The Observable that lets other classes subscribe to items changes
         */
        this._change = new Subject$1();
        this._allChanges = new Subject$1();
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    destroy() {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    get smart() {
        return this._smart;
    }
    /**
     * @return {?}
     */
    smartenUp() {
        this._smart = true;
        /*
         * These observers trigger a chain of function: filter -> sort -> paginate
         * An observer up the chain re-triggers all the operations that follow it.
         */
        this._filtersSub = this._filters.change.subscribe(() => this._filterItems());
        this._sortSub = this._sort.change.subscribe(() => {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!this._sort.comparator) {
                this._filterItems();
            }
            else {
                this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(() => this._changePage());
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set all(items) {
        if (this.smart) {
            this._all = items;
            this.emitAllChanges();
            this._filterItems();
        }
        else {
            this._displayed = items;
            this.emitChange();
        }
    }
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    refresh() {
        if (this.smart) {
            this._filterItems();
        }
    }
    /**
     * @return {?}
     */
    get displayed() {
        // Ideally we could return an immutable array, but we don't have it in Clarity yet.
        return this._displayed;
    }
    /**
     * @return {?}
     */
    emitChange() {
        this._change.next(this.displayed);
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @return {?}
     */
    emitAllChanges() {
        if (this.smart) {
            this._allChanges.next(this._all);
        }
    }
    /**
     * @return {?}
     */
    get allChanges() {
        return this._allChanges.asObservable();
    }
    /**
     * Checks if we don't have data to process yet, to abort early operations
     * @return {?}
     */
    get uninitialized() {
        return !this._all;
    }
    /**
     * FiltersProvider items from the raw list
     * @return {?}
     */
    _filterItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter((item) => this._filters.accepts(item));
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    }
    /**
     * Sorts items in the filtered list
     * @return {?}
     */
    _sortItems() {
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort((a, b) => this._sort.compare(a, b));
        }
        this._changePage();
    }
    /**
     * Extracts the current page from the sorted list
     * @return {?}
     */
    _changePage() {
        if (this.uninitialized) {
            return;
        }
        if (this._page.size > 0) {
            this._displayed = this._filtered.slice(this._page.firstItem, this._page.lastItem + 1);
        }
        else {
            this._displayed = this._filtered;
        }
        this.emitChange();
    }
}
Items.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Items.ctorParameters = () => [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridItems {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} _items
     */
    constructor(template, _differs, _items) {
        this.template = template;
        this._differs = _differs;
        this._items = _items;
        _items.smartenUp();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set rawItems(items) {
        this._rawItems = items ? items : [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ("rawItems" in changes) {
            const /** @type {?} */ currentItems = changes.rawItems.currentValue;
            if (!this._differ && currentItems) {
                this._differ = this._differs.find(currentItems).create(this._items.trackBy);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackBy(value) {
        this._items.trackBy = value;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._differ) {
            const /** @type {?} */ changes = this._differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this._items.all = this._rawItems;
            }
        }
    }
}
DatagridItems.decorators = [
    { type: Directive, args: [{
                selector: "[clrDgItems][clrDgItemsOf]",
            },] },
];
/**
 * @nocollapse
 */
DatagridItems.ctorParameters = () => [
    { type: TemplateRef, },
    { type: IterableDiffers, },
    { type: Items, },
];
DatagridItems.propDecorators = {
    'rawItems': [{ type: Input, args: ["clrDgItemsOf",] },],
    'trackBy': [{ type: Input, args: ["clrDgItemsTrackBy",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridPlaceholder {
    /**
     * @param {?} items
     * @param {?} page
     */
    constructor(items, page) {
        this.items = items;
        this.page = page;
    }
    /**
     * Tests if the datagrid is empty, meaning it doesn't contain any items
     * @return {?}
     */
    get emptyDatagrid() {
        return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
    }
}
DatagridPlaceholder.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-placeholder",
                template: `
        <div
            class="datagrid-placeholder"
            [class.datagrid-empty]="emptyDatagrid">
                <div class="datagrid-placeholder-image" *ngIf="emptyDatagrid"></div>
                <ng-content *ngIf="emptyDatagrid"></ng-content>
        </div>
    `,
                host: { "[class.datagrid-placeholder-container]": "true" }
            },] },
];
/**
 * @nocollapse
 */
DatagridPlaceholder.ctorParameters = () => [
    { type: Items, },
    { type: Page, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * ******
 * \@class IfOpenService
 *
 * \@description
 * An injectable service used by IfOpen structural directives and the components that implemnt IfOpen in their
 * templates. It holds the value of the open state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on open value changes.
 *
 */
class IfOpenService {
    constructor() {
        /**
         * *****
         * \@property _openChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         *
         */
        this._openChange = new Subject$1();
    }
    /**
     * ******
     * \@function openChange
     *
     * \@description
     * A getter function that provides an observable for the _opened Subject.
     *
     * @return {?}
     */
    get openChange() {
        return this._openChange.asObservable();
    }
    /**
     * ******
     * \@function open
     *
     * \@description
     * A setter function that updates the current state of _open for this instance of IfOpen structural directive. And,
     * broadcasts the new value to all subscribers.
     *
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        value = !!value;
        if (this._open !== value) {
            this._open = value;
            this._openChange.next(value);
        }
    }
    /**
     * ******
     *
     * \@function open
     *
     * \@description
     * A getter that returns the current value of this IfOpen instance.
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleWithEvent(event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    }
}
IfOpenService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
IfOpenService.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const POPOVER_HOST_ANCHOR = new InjectionToken("POPOVER_HOST_ANCHOR");

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * ******
 *
 * \@class SignpostTriggerDirective
 *
 * \@Description
 * A Directive added to the Signpost Trigger button that will call the Signpost.toggle() function to hide/show the
 * SignpostContent.
 *
 */
class SignpostTriggerDirective {
    /**
     * @param {?} ifOpenService
     * @param {?} renderer
     * @param {?} el
     */
    constructor(ifOpenService, renderer, el) {
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe((isOpen) => {
            if (isOpen) {
                this.renderer.addClass(this.el.nativeElement, "active");
            }
            else {
                this.renderer.removeClass(this.el.nativeElement, "active");
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * *******
     * \@function onSignpostTriggerClick
     *
     * \@description
     * click handler for the Signpost trigger button used to hide/show SignpostContent.
     * @param {?} event
     * @return {?}
     */
    onSignpostTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
SignpostTriggerDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrSignpostTrigger]" },] },
];
/**
 * @nocollapse
 */
SignpostTriggerDirective.ctorParameters = () => [
    { type: IfOpenService, },
    { type: Renderer2, },
    { type: ElementRef, },
];
SignpostTriggerDirective.propDecorators = {
    'onSignpostTriggerClick': [{ type: HostListener, args: ["click", ["$event"],] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * ******
 *
 * \@class Signpost
 *
 * \@description
 * Class used to configure and control the state of a Signpost and its associated SignpostContent.
 * It supports the clrPosition with a 'right-middle' default.
 *
 */
class Signpost {
    constructor() {
        /**
         * *******
         * \@property useCustomTrigger
         *
         * \@description
         * Flag used to determine if we need to use the default trigger or a user supplied trigger element.
         *
         */
        this.useCustomTrigger = false;
    }
    /**
     * *******
     * \@property signPostTrigger
     *
     * \@description
     * Uses ContentChild to check for a user supplied element with the SignpostTriggerDirective on it.
     *
     * @param {?} trigger
     * @return {?}
     */
    set customTrigger(trigger$$1) {
        this.useCustomTrigger = !!trigger$$1;
    }
}
Signpost.decorators = [
    { type: Component, args: [{
                selector: "clr-signpost",
                template: `
        <ng-container *ngIf="!useCustomTrigger">
            <button
                type="button"
                class="signpost-action btn btn-small btn-link"
                clrSignpostTrigger>
                <clr-icon shape="info"></clr-icon>
            </button>
        </ng-container>
        
        <ng-content></ng-content>
    `,
                host: { "[class.signpost]": "true" },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Signpost.ctorParameters = () => [];
Signpost.propDecorators = {
    'customTrigger': [{ type: ContentChild, args: [SignpostTriggerDirective,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * \@class HideableColumnService
 *
 * \@description
 * An \@Injectable provider class that enables
 *
 * 1. Managing, track hideability of DatagridColumns
 *
 */
class HideableColumnService {
    constructor() {
        /**
         * *******
         * \@property dgHiddenColumnMap
         *
         * \@description
         * An array of DatagridHideableColumn.
         * NOTE: because we can have columns w/o the *clrDgHideableColumn directive
         * this array will have empty spaces a.k.a nulls. This is needed to be able to map
         * DatagridCells to DatagridColumns in the RowRenderer.
         *
         *
         */
        this._columnList = [];
        /**
         * *******
         *
         * \@property dgHiddenColumnMapChange
         *
         * \@description
         * A behavior subject that can broadcast updates to the column list.
         * NOTE: I am using BehaviorSubject because <clr-dg-column-toggle> is not getting the latest _columnListChange
         * on page load.
         *
         */
        this._columnListChange = new BehaviorSubject$1(this._columnList);
    }
    /**
     * *******
     *
     * \@property canHideNextColumn
     *
     * \@description
     * Service function that is called by clr-dg-column-toggle component. Use this if you need to ask if you can hide
     * a column. It acts as a guard against hiding all the columns making sure there is at least one column displayed.
     *
     * @return {?}
     */
    get canHideNextColumn() {
        const /** @type {?} */ hiddenColumns = this._columnList.filter(column => column !== undefined).filter(column => column.hidden);
        return (this._columnList.length - hiddenColumns.length > 1);
    }
    /**
     * *******
     *
     * \@property checkForAllColumnsVisible
     *
     * \@description
     * For when you need to know if the datagrid's columns are all showing.
     *
     * @return {?}
     */
    get checkForAllColumnsVisible() {
        return !this._columnList.some(column => column && column.hidden);
    }
    /**
     * ********
     * \@property columnListChange
     *
     * \@description
     * A public property that enables subscribers to hear updates to the column map.
     * Use this if you need to do something whenever the Datagrid's column list is changed (i.e *ngIf on a column).
     *
     * @return {?}
     */
    get columnListChange() {
        return this._columnListChange.asObservable();
    }
    /**
     * *******
     *
     * \@function getColumns
     *
     * \@description
     * Public function that returns the current list of columns. I needed an array of to iterate on in the RowRenderer
     * but subscribing to the _columnListChange changes did not seem like the correct way to get it.
     *
     * @return {?}
     */
    getColumns() {
        return this._columnList;
    }
    /**
     * *******
     * \@function showHiddenColumns
     *
     * \@description
     * Iterate through the current _columnList:
     * - if it has a DatagridHideableColumn and is hidden then show it.
     * - if it's DatagridHideableColumn was previously the last column visible, turn that flag off.
     *
     * @return {?}
     */
    showHiddenColumns() {
        this._columnList.forEach((column) => {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        });
    }
    /**
     * \@function updateColumnList
     *
     * \@description
     * Creates an array of DatagridHideableColumn's || null based column array passed as param.
     * Is dependent on the order in \@ContentChildren in Datagrid.
     *
     * @param {?} columns
     *
     * @return {?}
     */
    updateColumnList(columns) {
        this._columnList = columns; // clear the list
        this.updateForLastVisibleColumn(); // Update our visibility state for UI
        this._columnListChange.next(this._columnList); // Broadcast it
    }
    /**
     * *******
     *
     * \@function updateForLastVisibleColumn
     *
     * \@description
     * Gets the current visible count for all columns.
     * When it is greater than 1 it marks everything as false for the lastVisibleColumn.
     * When visible count is not > 1 (i.e) 1. , it finds the only column that is not hidden and marks it as the
     * lastVisibleColumn.
     *
     * @return {?} void
     *
     */
    updateForLastVisibleColumn() {
        // There is more than one column showing, make sure nothing is marked lastVisibleColumn
        if (this.canHideNextColumn) {
            this._columnList.map((column) => {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            });
        }
        else {
            // The visibleCount is down to only one column showing. Find it and flag it as the lastVisibleColumn
            this._columnList.map((column) => {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            });
        }
    }
    /**
     * *******
     *
     * \@function getColumnById
     *
     * \@description
     * Return a HideableColumn in this._columnList for the given id.
     *
     * @param {?} id
     *
     *
     * @return {?} HideableColumn
     *
     */
    getColumnById(id) {
        if (id) {
            return this._columnList.find(column => column && column.id === id);
        }
        return;
    }
}
HideableColumnService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
HideableColumnService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridCell {
    /**
     * @param {?} hideableColumnService
     */
    constructor(hideableColumnService) {
        this.hideableColumnService = hideableColumnService;
    }
    /**
     * \@property hidden
     *
     * \@description
     * Property used to apply a css class to this cell that hides it when hidden = true.
     *
     * @return {?}
     */
    get hidden() {
        const /** @type {?} */ column = this.hideableColumnService.getColumnById(this.id);
        return (column) ? column.hidden : false;
    }
}
DatagridCell.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-cell",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[class.datagrid-cell]": "true",
                    "[class.datagrid-cell--hidden]": "hidden",
                    "[class.datagrid-signpost-trigger]": "signpost.length > 0"
                }
            },] },
];
/**
 * @nocollapse
 */
DatagridCell.ctorParameters = () => [
    { type: HideableColumnService, },
];
DatagridCell.propDecorators = {
    'signpost': [{ type: ContentChildren, args: [Signpost,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbSelection = 0;
let SelectionType = {};
SelectionType.None = 0;
SelectionType.Single = 1;
SelectionType.Multi = 2;
SelectionType[SelectionType.None] = "None";
SelectionType[SelectionType.Single] = "Single";
SelectionType[SelectionType.Multi] = "Multi";
class Selection {
    /**
     * @param {?} _items
     * @param {?} _filters
     */
    constructor(_items, _filters) {
        this._items = _items;
        this._filters = _filters;
        this._selectionType = SelectionType.None;
        this.rowSelectionMode = false;
        /**
         * Ignore items changes in the same change detection cycle.
         */
        this.debounce = false;
        /**
         * The Observable that lets other classes subscribe to selection changes
         */
        this._change = new Subject$1();
        this.id = "clr-dg-selection" + (nbSelection++);
        this._filtersSub = this._filters.change.subscribe(() => {
            if (!this._selectable) {
                return;
            }
            this.clearSelection();
        });
        this._itemsSub = this._items.allChanges.subscribe((updatedItems) => {
            if (!this._selectable) {
                return;
            }
            let leftOver;
            if (this._items.trackBy) {
                const trackBy = this._items.trackBy;
                const updatedTracked = updatedItems.map((item, index) => trackBy(index, item));
                leftOver = this.current.filter((selected, index) => {
                    return updatedTracked.indexOf(trackBy(index, selected)) > -1;
                });
            }
            else {
                leftOver = this.current.filter(selected => updatedItems.indexOf(selected) > -1);
            }
            if (this.current.length !== leftOver.length) {
                // TODO: Discussed this with Eudes and this is fine for now.
                // But we need to figure out a different pattern for the
                // child triggering the parent change detection problem.
                // Using setTimeout for now to fix this.
                setTimeout(() => {
                    this.current = leftOver;
                }, 0);
            }
        });
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.current.length = 0;
        this.emitChange();
    }
    /**
     * @return {?}
     */
    get selectionType() {
        return this._selectionType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectionType(value) {
        if (value === this.selectionType) {
            return;
        }
        this._selectionType = value;
        if (value === SelectionType.None) {
            delete this.current;
        }
        else {
            this.current = [];
        }
    }
    /**
     * @return {?}
     */
    get _selectable() {
        return (this._selectionType === SelectionType.Multi) || (this._selectionType === SelectionType.Single);
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    destroy() {
        this._itemsSub.unsubscribe();
        this._filtersSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    get currentSingle() {
        return this._currentSingle;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentSingle(value) {
        if (value === this._currentSingle) {
            return;
        }
        this._currentSingle = value;
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        this.debounce = true;
        setTimeout(() => this.debounce = false);
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        this._current = value;
        this.emitChange();
        // Ignore items changes in the same change detection cycle.
        this.debounce = true;
        setTimeout(() => this.debounce = false);
    }
    /**
     * @return {?}
     */
    emitChange() {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    }
    /**
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    isSelected(item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    }
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    setSelected(item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                const /** @type {?} */ index = this.current.indexOf(item);
                if (index >= 0 && !selected) {
                    this.current.splice(index, 1);
                    this.emitChange();
                }
                else if (index < 0 && selected) {
                    this.current.push(item);
                    this.emitChange();
                }
                break;
            default:
                break;
        }
    }
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    isAllSelected() {
        if ((this._selectionType !== SelectionType.Multi) || !this._items.displayed) {
            return false;
        }
        const /** @type {?} */ displayedItems = this._items.displayed;
        const /** @type {?} */ nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        const /** @type {?} */ temp = displayedItems.filter(item => this.current.indexOf(item) > -1);
        return temp.length === displayedItems.length;
    }
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    toggleAll() {
        if (this._selectionType === SelectionType.None || this._selectionType === SelectionType.Single) {
            return;
        }
        /*
         * If everything is already selected, we clear.
         * If at least one row isn't selected, we select everything.
         */
        if (this.isAllSelected()) {
            this.current.length = 0;
        }
        else {
            this._items.displayed.forEach(item => {
                if (this.current.indexOf(item) < 0) {
                    this.current.push(item);
                }
            });
        }
        this.emitChange();
    }
}
Selection.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Selection.ctorParameters = () => [
    { type: Items, },
    { type: FiltersProvider, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbRow = 0;
class DatagridRow {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} globalExpandable
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    constructor(selection, rowActionService, globalExpandable, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        this.ENTER_KEY_CODE = 13;
        this.SPACE_KEY_CODE = 32;
        this._selected = false;
        this.selectedChanged = new EventEmitter(false);
        this.expandedChange = new EventEmitter(false);
        this.id = "clr-dg-row" + (nbRow++);
        this.role = selection.rowSelectionMode ? "button" : null;
    }
    /**
     * Indicates if the row is selected
     * @return {?}
     */
    get selected() {
        if (this.selection.selectionType === SelectionType.None) {
            return this._selected;
        }
        else {
            return this.selection.isSelected(this.item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (this.selection.selectionType === SelectionType.None) {
            this._selected = value;
        }
        else {
            this.selection.setSelected(this.item, value);
        }
    }
    /**
     * @param {?=} selected
     * @return {?}
     */
    toggle(selected = !this.selected) {
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.expand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.expand.expanded = value;
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
    /**
     * @return {?}
     */
    toggleSelection() {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        switch (this.selection.selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                this.selection.currentSingle = this.item;
                break;
            case SelectionType.Multi:
                this.toggle();
                break;
            default:
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keypress(event) {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        // Check to see if space or enter were pressed
        if (event.keyCode === this.ENTER_KEY_CODE || event.keyCode === this.SPACE_KEY_CODE) {
            // Prevent the default action to stop scrolling when space is pressed
            event.preventDefault();
            this.toggleSelection();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Make sure things get started
        const /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe((cellList) => {
            const /** @type {?} */ columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscription = this.hideableColumnService.columnListChange.subscribe((columnList) => {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === this.dgCells.length) {
                this.updateCellsForColumns(columnList);
            }
        });
    }
    /**
     * *******
     * \@function updateCellsForColumns
     *
     * \@description
     * 1. Maps the new columnListChange to the dgCells list by index
     * 2. Sets the hidden state on the cell
     * Take a Column list and use index to access the columns for hideable properties.
     *
     * @param {?} columnList
     * @return {?}
     */
    updateCellsForColumns(columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach((cell, index) => {
            const /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
DatagridRow.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-row",
                template: `
        <div class="datagrid-row-master datagrid-row-flex">
            <clr-dg-cell *ngIf="selection.selectionType === SELECTION_TYPE.Multi"
                         class="datagrid-select datagrid-fixed-column">
                <clr-checkbox [ngModel]="selected" (ngModelChange)="toggle($event)"></clr-checkbox>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="selection.selectionType === SELECTION_TYPE.Single"
                         class="datagrid-select datagrid-fixed-column">
                <div class="radio">
                    <input type="radio" [id]="id" [name]="selection.id + '-radio'" [value]="item"
                           [(ngModel)]="selection.currentSingle">
                    <label for="{{id}}"></label>
                </div>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="rowActionService.hasActionableRow"
                         class="datagrid-row-actions datagrid-fixed-column">
                <ng-content select="clr-dg-action-overflow"></ng-content>
            </clr-dg-cell>
            <clr-dg-cell *ngIf="globalExpandable.hasExpandableRow"
                         class="datagrid-expandable-caret datagrid-fixed-column">
                <ng-container *ngIf="expand.expandable">
                    <button (click)="toggleExpand()" *ngIf="!expand.loading" type="button">
                        <clr-icon shape="caret" [attr.dir]="expand.expanded?'down':'right'"></clr-icon>
                    </button>
                    <div class="spinner spinner-sm" *ngIf="expand.loading"></div>
                </ng-container>
            </clr-dg-cell>
            <ng-content *ngIf="!expand.replace || !expand.expanded || expand.loading"></ng-content>

            <ng-template *ngIf="expand.replace && expand.expanded && !expand.loading"
                         [ngTemplateOutlet]="detail"></ng-template>
        </div>

        <ng-template *ngIf="!expand.replace && expand.expanded && !expand.loading"
                     [ngTemplateOutlet]="detail"></ng-template>

        <!-- 
            We need the "project into template" hack because we need this in 2 different places
            depending on whether the details replace the row or not.
        -->
        <ng-template #detail>
            <ng-content select="clr-dg-row-detail"></ng-content>
        </ng-template>
    `,
                host: {
                    "[class.datagrid-row]": "true",
                    "[class.datagrid-selected]": "selected",
                    "[attr.tabindex]": "selection.rowSelectionMode ? 0 : null"
                },
                providers: [Expand, { provide: LoadingListener, useExisting: Expand }]
            },] },
];
/**
 * @nocollapse
 */
DatagridRow.ctorParameters = () => [
    { type: Selection, },
    { type: RowActionService, },
    { type: ExpandableRowsCount, },
    { type: Expand, },
    { type: HideableColumnService, },
];
DatagridRow.propDecorators = {
    'item': [{ type: Input, args: ["clrDgItem",] },],
    'role': [{ type: HostBinding, args: ["attr.role",] },],
    'selected': [{ type: Input, args: ["clrDgSelected",] },],
    'selectedChanged': [{ type: Output, args: ["clrDgSelectedChange",] },],
    'expanded': [{ type: Input, args: ["clrDgExpanded",] },],
    'expandedChange': [{ type: Output, args: ["clrDgExpandedChange",] },],
    'toggleSelection': [{ type: HostListener, args: ["click",] },],
    'keypress': [{ type: HostListener, args: ["keypress", ["$event"],] },],
    'dgCells': [{ type: ContentChildren, args: [DatagridCell,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
class StateProvider {
    /**
     * @param {?} filters
     * @param {?} sort
     * @param {?} page
     * @param {?} debouncer
     */
    constructor(filters, sort, page, debouncer) {
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.map(() => this.state);
    }
    /**
     * @return {?}
     */
    get state() {
        const /** @type {?} */ state$$1 = {};
        if (this.page.size > 0) {
            state$$1.page = { from: this.page.firstItem, to: this.page.lastItem, size: this.page.size };
        }
        if (this.sort.comparator) {
            if (this.sort.comparator instanceof DatagridPropertyComparator) {
                /*
                 * Special case for the default object property comparator,
                 * we give the property name instead of the actual comparator.
                 */
                state$$1.sort = { by: ((this.sort.comparator)).prop, reverse: this.sort.reverse };
            }
            else {
                state$$1.sort = { by: this.sort.comparator, reverse: this.sort.reverse };
            }
        }
        const /** @type {?} */ activeFilters = this.filters.getActiveFilters();
        if (activeFilters.length > 0) {
            state$$1.filters = [];
            for (const /** @type {?} */ filter of activeFilters) {
                if (filter instanceof DatagridStringFilterImpl) {
                    const /** @type {?} */ stringFilter = ((filter)).filterFn;
                    if (stringFilter instanceof DatagridPropertyStringFilter) {
                        /*
                         * Special case again for the default object property filter,
                         * we give the property name instead of the full filter object.
                         */
                        state$$1.filters.push({
                            property: ((stringFilter)).prop,
                            value: ((filter)).value
                        });
                        continue;
                    }
                }
                state$$1.filters.push(filter);
            }
        }
        return state$$1;
    }
}
StateProvider.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
StateProvider.ctorParameters = () => [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
    { type: StateDebouncer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Datagrid {
    /**
     * @param {?} columnService
     * @param {?} organizer
     * @param {?} items
     * @param {?} expandableRows
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} stateProvider
     */
    constructor(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider) {
        this.columnService = columnService;
        this.organizer = organizer;
        this.items = items;
        this.expandableRows = expandableRows;
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.stateProvider = stateProvider;
        this.SELECTION_TYPE = SelectionType;
        /**
         * Output emitted whenever the data needs to be refreshed, based on user action or external ones
         */
        this.refresh = new EventEmitter(false);
        this.selectedChanged = new EventEmitter(false);
        this.singleSelectedChanged = new EventEmitter(false);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    /**
     * Freezes the datagrid while data is loading
     * @return {?}
     */
    get loading() {
        return this.items.loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loading(value) {
        this.items.loading = value;
    }
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    dataChanged() {
        this.items.refresh();
    }
    /**
     * Array of all selected items
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        if (value) {
            this.selection.selectionType = SelectionType.Multi;
        }
        else {
            this.selection.selectionType = SelectionType.None;
        }
        this.selection.current = value;
    }
    /**
     * Selected item in single-select mode
     * @param {?} value
     * @return {?}
     */
    set singleSelected(value) {
        this.selection.selectionType = SelectionType.Single;
        if (value) {
            this.selection.currentSingle = value;
        }
        else {
            this.selection.currentSingle = null;
        }
    }
    /**
     * Selection/Deselection on row click mode
     * @param {?} value
     * @return {?}
     */
    set rowSelectionMode(value) {
        this.selection.rowSelectionMode = value;
    }
    /**
     * Indicates if all currently displayed items are selected
     * @return {?}
     */
    get allSelected() {
        return this.selection.isAllSelected();
    }
    /**
     * Selects/deselects all currently displayed items
     * @param {?} value
     * @return {?}
     */
    set allSelected(value) {
        /*
         * This is a setter but we ignore the value.
         * It's strange, but it lets us have an indeterminate state where only
         * some of the items are selected.
         */
        this.selection.toggleAll();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._subscriptions.push(this.rows.changes.subscribe(() => {
            if (!this.items.smart) {
                this.items.all = this.rows.map((row) => row.item);
            }
        }));
        if (!this.items.smart) {
            this.items.all = this.rows.map((row) => row.item);
        }
        this._subscriptions.push(this.columns.changes.subscribe((columns) => {
            this.columnService.updateColumnList(this.columns.map(col => col.hideable));
        }));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map(col => col.hideable));
    }
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    ngAfterViewInit() {
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(state$$1 => this.refresh.emit(state$$1)));
        this._subscriptions.push(this.selection.change.subscribe(s => {
            if (this.selection.selectionType === SelectionType.Single) {
                this.singleSelectedChanged.emit(s);
            }
            else if (this.selection.selectionType === SelectionType.Multi) {
                this.selectedChanged.emit(s);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    resize() {
        this.organizer.resize();
    }
}
Datagrid.decorators = [
    { type: Component, args: [{
                selector: "clr-datagrid",
                template: `
      <!--
        ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
        ~ This software is released under MIT license.
        ~ The full license information can be found in LICENSE in the root directory of this project.
        -->

      <ng-content select="clr-dg-action-bar"></ng-content>
      <div class="datagrid-overlay-wrapper">
          <div class="datagrid-scroll-wrapper">
              <div class="datagrid" #datagrid>
                  <clr-dg-table-wrapper class="datagrid-table-wrapper">
                      <div clrDgHead class="datagrid-head">
                          <div class="datagrid-row datagrid-row-flex">
                              <!-- header for datagrid where you can select multiple rows -->
                              <div class="datagrid-column datagrid-select datagrid-fixed-column"
                                   *ngIf="selection.selectionType === SELECTION_TYPE.Multi">
                              <span class="datagrid-column-title">
                                  <clr-checkbox [(ngModel)]="allSelected"></clr-checkbox>
                              </span>
                                  <div class="datagrid-column-separator"></div>
                              </div>
                              <!-- header for datagrid where you can select one row only -->
                              <div class="datagrid-column datagrid-select datagrid-fixed-column"
                                   *ngIf="selection.selectionType === SELECTION_TYPE.Single">
                                  <div class="datagrid-column-separator"></div>
                              </div>
                              <!-- header for single row action; only display if we have at least one actionable row in datagrid -->
                              <div class="datagrid-column datagrid-row-actions datagrid-fixed-column"
                                   *ngIf="rowActionService.hasActionableRow">
                                  <div class="datagrid-column-separator"></div>
                              </div>
                              <!-- header for carets; only display if we have at least one expandable row in datagrid -->
                              <div class="datagrid-column datagrid-expandable-caret datagrid-fixed-column"
                                   *ngIf="expandableRows.hasExpandableRow">
                                  <div class="datagrid-column-separator"></div>
                              </div>
                              <ng-content select="clr-dg-column"></ng-content>
                          </div>
                      </div>

                      <ng-template *ngIf="iterator"
                                   ngFor [ngForOf]="items.displayed" [ngForTrackBy]="items.trackBy"
                                   [ngForTemplate]="iterator.template"></ng-template>
                      <ng-content *ngIf="!iterator"></ng-content>

                      <!-- Custom placeholder overrides the default empty one -->
                      <ng-content select="clr-dg-placeholder"></ng-content>
                      <clr-dg-placeholder *ngIf="!placeholder"></clr-dg-placeholder>
                  </clr-dg-table-wrapper>

                  <!--
                      This is not inside the table because there is no good way of having a single column span
                      everything when using custom elements with display:table-cell.
                  -->
                  <ng-content select="clr-dg-footer"></ng-content>
              </div>
          </div>
          <div class="datagrid-spinner" *ngIf="loading">
              <div class="spinner">Loading...</div>
          </div>
      </div>
    `,
                providers: [
                    Selection, Sort, FiltersProvider, Page, Items, DatagridRenderOrganizer, RowActionService, ExpandableRowsCount,
                    HideableColumnService, StateDebouncer, StateProvider
                ],
                host: { "[class.datagrid-host]": "true" }
            },] },
];
/**
 * @nocollapse
 */
Datagrid.ctorParameters = () => [
    { type: HideableColumnService, },
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: ExpandableRowsCount, },
    { type: Selection, },
    { type: RowActionService, },
    { type: StateProvider, },
];
Datagrid.propDecorators = {
    'loading': [{ type: Input, args: ["clrDgLoading",] },],
    'refresh': [{ type: Output, args: ["clrDgRefresh",] },],
    'iterator': [{ type: ContentChild, args: [DatagridItems,] },],
    'selected': [{ type: Input, args: ["clrDgSelected",] },],
    'selectedChanged': [{ type: Output, args: ["clrDgSelectedChange",] },],
    'singleSelected': [{ type: Input, args: ["clrDgSingleSelected",] },],
    'singleSelectedChanged': [{ type: Output, args: ["clrDgSingleSelectedChange",] },],
    'rowSelectionMode': [{ type: Input, args: ["clDgRowSelection",] },],
    'placeholder': [{ type: ContentChild, args: [DatagridPlaceholder,] },],
    'columns': [{ type: ContentChildren, args: [DatagridColumn,] },],
    'rows': [{ type: ContentChildren, args: [DatagridRow,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridActionBar {
}
DatagridActionBar.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-action-bar",
                template: `
        <ng-content></ng-content>
    `,
                host: { "[class.datagrid-action-bar]": "true" }
            },] },
];
/**
 * @nocollapse
 */
DatagridActionBar.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridActionOverflow {
    /**
     * @param {?} rowActionService
     */
    constructor(rowActionService) {
        this.rowActionService = rowActionService;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        /**
         * Tracks whether the action overflow menu is open or not
         */
        this._open = false;
        this.openChanged = new EventEmitter(false);
        this.rowActionService.register();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.rowActionService.unregister();
    }
    /**
     * @return {?}
     */
    get open() {
        return this._open;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set open(open) {
        const /** @type {?} */ boolOpen = !!open;
        if (boolOpen !== this._open) {
            this._open = boolOpen;
            this.openChanged.emit(boolOpen);
        }
    }
    /**
     * Shows/hides the action overflow menu
     * @param {?} event
     * @return {?}
     */
    toggle(event) {
        this.openingEvent = event;
        this.open = !this.open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    close(event) {
        /*
         * Because this listener is added synchonously, before the event finishes bubbling up the DOM,
         * we end up firing on the very click that just opened the menu, p
         * otentially closing it immediately every time. So we just ignore it.
         */
        if (event === this.openingEvent) {
            delete this.openingEvent;
            return;
        }
        this.open = false;
    }
}
DatagridActionOverflow.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-action-overflow",
                template: `
        <button (click)="toggle($event)" class="datagrid-action-toggle" #anchor>
            <clr-icon shape="ellipsis-vertical"></clr-icon>
        </button>
        <ng-template [(clrPopoverOld)]="open" [clrPopoverOldAnchor]="anchor" [clrPopoverOldAnchorPoint]="anchorPoint"
                     [clrPopoverOldPopoverPoint]="popoverPoint">
            <div #menu class="datagrid-action-overflow" (clrOutsideClick)="close($event)" [clrStrict]="true">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `
            },] },
];
/**
 * @nocollapse
 */
DatagridActionOverflow.ctorParameters = () => [
    { type: RowActionService, },
];
DatagridActionOverflow.propDecorators = {
    'open': [{ type: Input, args: ["clrDgActionOverflowOpen",] },],
    'openChanged': [{ type: Output, args: ["clrDgActionOverflowOpenChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridColumnToggle {
    /**
     * @param {?} hideableColumnService
     */
    constructor(hideableColumnService) {
        this.hideableColumnService = hideableColumnService;
        /**
         *
         * Popover init
         */
        this.anchorPoint = Point.TOP_LEFT;
        this.popoverPoint = Point.LEFT_BOTTOM;
        this.open = false;
        /**
         * *
         * DatagridHideableColumn init
         */
        this.columns = [];
    }
    /**
     * @return {?}
     */
    get allColumnsVisible() {
        return this._allColumnsVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set allColumnsVisible(value) {
        this._allColumnsVisible = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._hideableColumnChangeSubscription = this.hideableColumnService.columnListChange.subscribe((columnList) => {
            // Reset the list of columns
            this.columns.length = 0;
            this.hideableColumnService.updateForLastVisibleColumn();
            this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach((col) => {
                if (col) {
                    this.columns.push(col);
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._hideableColumnChangeSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    }
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    toggleColumn(event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    }
    /**
     * @return {?}
     */
    toggleUI() {
        this.open = !this.open;
    }
}
DatagridColumnToggle.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-column-toggle",
                template: `
        <button
                #anchor
                (click)="toggleUI()"
                class="btn btn-sm btn-link column-toggle--action"
                type="button">
            <clr-icon shape="view-columns"></clr-icon>
        </button>
        <div class="column-switch"
             *clrPopoverOld="open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint">
            <div class="switch-header">
                Show Columns
                <button
                    class="btn btn-sm btn-link"
                    (click)="toggleUI()"
                    type="button">
                    <clr-icon
                            shape="close"></clr-icon>
                </button>
            </div>
            <ul class="switch-content list-unstyled">
                <li *ngFor="let column of columns">
                    <clr-checkbox [clrChecked]="!column.hidden"
                                  [clrDisabled]="column.lastVisibleColumn"
                                  (clrCheckedChange)="toggleColumn($event, column)">
                        <ng-template [ngTemplateOutlet]="column.template"></ng-template>
                    </clr-checkbox>
                </li>
            </ul>
            <div class="switch-footer">
                <div>
                    <button
                            class="btn btn-sm btn-link p6 text-uppercase"
                            [disabled]="allColumnsVisible"
                            (click)="selectAll()"
                            type="button">Select All
                    </button>
                </div>
                <div class="action-right">
                    <button
                            (click)="toggleUI()"
                            class="btn btn-primary"
                            type="button">
                        Ok
                    </button>
                </div>
            </div>
        </div>
    `,
                host: { "[class.column-switch-wrapper]": "true", "[class.column-switch-wrapper--active]": "open" }
            },] },
];
/**
 * @nocollapse
 */
DatagridColumnToggle.ctorParameters = () => [
    { type: HideableColumnService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridDetailRegisterer {
    /**
     * @param {?} expandableRowsCount
     */
    constructor(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    }
}
DatagridDetailRegisterer.decorators = [
    { type: Directive, args: [{ selector: "[clrIfExpanded]" },] },
];
/**
 * @nocollapse
 */
DatagridDetailRegisterer.ctorParameters = () => [
    { type: ExpandableRowsCount, decorators: [{ type: Optional },] },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridFooter {
    /**
     * @param {?} selection
     * @param {?} hideableColumnService
     * @param {?} cdr
     */
    constructor(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe((change) => {
            const /** @type {?} */ hiddenColumnsInSub = change.filter(col => col);
            if (hiddenColumnsInSub.length > 0) {
                this.activeToggler = true;
            }
        }));
        const /** @type {?} */ hiddenColumns = this.hideableColumnService.getColumns().filter(col => col);
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}
DatagridFooter.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-footer",
                template: `
        <ng-container
            *ngIf="(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)">
            <clr-checkbox [clrDisabled]="true" [clrChecked]="true" class="datagrid-foot-select">
                {{selection.current.length}}
            </clr-checkbox>
        </ng-container>
        <clr-dg-column-toggle *ngIf="activeToggler"></clr-dg-column-toggle>
        <div class="datagrid-foot-description">
            <ng-content></ng-content>
        </div>
        <ng-content select="clr-dg-pagination"></ng-content>
    `,
                host: {
                    "[class.datagrid-foot]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
DatagridFooter.ctorParameters = () => [
    { type: Selection, },
    { type: HideableColumnService, },
    { type: ChangeDetectorRef, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * \@class DatagridHideableColumn
 *
 * \@description
 * A utility class for that adds hide/show functionality to a column, its cells and enables a toggler in the
 * DatagridColumnToggle Component.
 *
 */
class DatagridHideableColumn {
    /**
     *
     * \@description
     * The init function for DatagridHideableColumn instances that does the following:
     *
     * 1. Set values for the private variables that enable a hideable column
     * 2. Broadcast the next hidden change for anyone (already) subscribed to this DatagridHideableColumn
     * TODO: Debug and verify that #2 is really necessary.
     *
     * @param {?} _template
     * @param {?} _id
     * @param {?=} _hidden
     */
    constructor(_template, _id, _hidden = false) {
        this._template = _template;
        this._id = _id;
        this._hidden = _hidden;
        /**
         * \@property hiddenChanges
         *
         * \@description
         * A stream of state changes an instance of DatagridHideableColumn will broadcast to subscribers.
         *
         */
        this.hiddenChangesState = new Subject$1();
        this.lastVisibleColumn = false;
    }
    /**
     * \@function template
     *
     * \@description
     * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
     * populate the DatagridColumnToggle UI with the correct Column name.
     *
     * @return {?}
     */
    get template() {
        return this._template;
    }
    /**
     * \@function id
     *
     * \@description
     * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
     * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
     *
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * \@function hidden
     *
     * \@description
     * A getter that returns the hidden value of a DatagridHideableColumn instance.
     * TODO: debug and make sure you really need this since we have the hiddenCHanges observable.
     *
     * @return {?}
     */
    get hidden() {
        return this._hidden;
    }
    /**
     * \@function hidden
     *
     * \@description
     * The setter for setting the hidden state of a DatagridHideableColumn instance.
     * It also broadcasts the change after its set.
     *
     * @param {?} value
     * @return {?}
     */
    set hidden(value) {
        if (this._hidden === value) {
            return;
        }
        this._hidden = value;
        this.hiddenChangesState.next(value);
    }
    /**
     * \@function hiddenChangeState
     *
     * \@description
     * An Observable for the HideableColumns hidden changes.
     *
     * @return {?}
     */
    get hiddenChangeState() {
        return this.hiddenChangesState.asObservable();
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * \@class DatagridHideableColumnDirective
 *
 * \@description
 * A structural directive meant to be used inside a clr-dg-column component.
 *
 * <clr-dg-column>
 *       <ng-container *clrDgHideableColumn="{ hidden: true }">
 *           User ID
 *       </ng-container>
 *   </clr-dg-column>
 *
 * It sets up state and properties so that columns can be manges for hide/show by a service and an internal
 * datagrid toggle component.
 *
 */
class DatagridHideableColumnDirective {
    /**
     * \@description
     * Used the DatagridColumn to get and set an id for this HiddenColumn
     *
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} dgColumn
     */
    constructor(templateRef, viewContainerRef, dgColumn) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.dgColumn = dgColumn;
        this.columnId = dgColumn.columnId;
        // Use the templateRef to create this view
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // Create instance of the utility class DatagridHideableColumn.
        // Note this is on the parent instance of DatagridColumn.
        this.dgColumn.hideable = new DatagridHideableColumn(this.templateRef, this.columnId, this._hidden);
    }
    /**
     * \@function clrDgHideableColumn
     *
     * \@description
     * Setter fn for the \@Input with the same name as this structural directive.
     * It allows the user to pre-configure the column's hide/show state. { hidden: true }
     * It's more verbose but has more Clarity.
     *
     * \@default false
     *
     *
     * \@example
     * *clrDgHideableColumn
     * *clrDgHideableColumn={hidden: false}
     * *clrDgHideableColumn={hidden: true}
     *
     * @param {?} value
     *
     * @return {?}
     */
    set clrDgHideableColumn(value) {
        this._hidden = (value && value.hidden) ? value.hidden : false;
        if (this.dgColumn.hideable) {
            this.dgColumn.hideable.hidden = (value && value.hidden) ? value.hidden : false;
        }
    }
}
DatagridHideableColumnDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrDgHideableColumn]" },] },
];
/**
 * @nocollapse
 */
DatagridHideableColumnDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: DatagridColumn, },
];
DatagridHideableColumnDirective.propDecorators = {
    'clrDgHideableColumn': [{ type: Input, args: ["clrDgHideableColumn",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridPagination {
    /**
     * @param {?} page
     */
    constructor(page) {
        this.page = page;
        this.currentChanged = new EventEmitter(false);
        /*
         * Default page size is 10.
         * The reason we set it in this constructor and not in the provider itself is because
         * we don't want pagination (page size 0) if this component isn't present in the datagrid.
         */
        page.size = 10;
    }
    /**
     * *******
     * Subscription to the Page service for page changes.
     * Note: this only emits after the datagrid is initialized/stabalized and the page changes.
     * @return {?}
     */
    ngOnInit() {
        this._pageSubscription = this.page.change.subscribe(current => this.currentChanged.emit(current));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._pageSubscription.unsubscribe();
    }
    /**
     * Page size
     * @return {?}
     */
    get pageSize() {
        return this.page.size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set pageSize(size) {
        if (typeof size === "number") {
            this.page.size = size;
        }
    }
    /**
     * Total items (needed to guess the last page)
     * @return {?}
     */
    get totalItems() {
        return this.page.totalItems;
    }
    /**
     * @param {?} total
     * @return {?}
     */
    set totalItems(total) {
        if (typeof total === "number") {
            this.page.totalItems = total;
        }
    }
    /**
     * Last page
     * @return {?}
     */
    get lastPage() {
        return this.page.last;
    }
    /**
     * @param {?} last
     * @return {?}
     */
    set lastPage(last) {
        if (typeof last === "number") {
            this.page.last = last;
        }
    }
    /**
     * Current page
     * @return {?}
     */
    get currentPage() {
        return this.page.current;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        if (typeof page === "number") {
            this.page.current = page;
        }
    }
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    previous() {
        this.page.previous();
    }
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    next() {
        this.page.next();
    }
    /**
     * Index of the first item displayed on the current page, starting at 0
     * @return {?}
     */
    get firstItem() {
        return this.page.firstItem;
    }
    /**
     * Index of the last item displayed on the current page, starting at 0
     * @return {?}
     */
    get lastItem() {
        return this.page.lastItem;
    }
    /**
     * Conditionally adds page numbers before and after the current page
     * @return {?}
     */
    get middlePages() {
        const /** @type {?} */ middlePages = [];
        if (this.page.current > 1) {
            middlePages.push(this.page.current - 1);
        }
        middlePages.push(this.page.current);
        if (this.page.current < this.page.last) {
            middlePages.push(this.page.current + 1);
        }
        return middlePages;
    }
}
DatagridPagination.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-pagination",
                template: `
        <ul class="pagination" *ngIf="page.last > 1">
            <li *ngIf="page.current > 1">
                <button 
                    class="pagination-previous" 
                    (click)="page.previous()"
                    type="button"></button>
            </li>
            <li *ngIf="page.current > 2">
                <button (click)="page.current = 1" type="button">1</button>
            </li>
            <li *ngIf="page.current > 3">...</li>
            <li *ngFor="let pageNum of middlePages" [class.pagination-current]="pageNum === page.current">
                <button 
                    *ngIf="pageNum !== page.current; else noButton" 
                    (click)="page.current = pageNum"
                    type="button">{{pageNum}}</button>
                <ng-template #noButton>{{pageNum}}</ng-template>
            </li>
            <li *ngIf="page.current < page.last - 2">...</li>
            <li *ngIf="page.current < page.last - 1">
                <button 
                    (click)="page.current = page.last"
                    type="button">{{page.last}}</button>
            </li>
            <li *ngIf="page.current < page.last">
                <button 
                    class="pagination-next" 
                    (click)="page.next()"
                    type="button"></button>
            </li>
        </ul>
    `,
                // IE10 comes to pollute even our components declaration
                styles: [`:host { display: block; }`]
            },] },
];
/**
 * @nocollapse
 */
DatagridPagination.ctorParameters = () => [
    { type: Page, },
];
DatagridPagination.propDecorators = {
    'pageSize': [{ type: Input, args: ["clrDgPageSize",] },],
    'totalItems': [{ type: Input, args: ["clrDgTotalItems",] },],
    'lastPage': [{ type: Input, args: ["clrDgLastPage",] },],
    'currentPage': [{ type: Input, args: ["clrDgPage",] },],
    'currentChanged': [{ type: Output, args: ["clrDgPageChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Generic bland container serving various purposes for Datagrid.
 * For instance, it can help span a text over multiple rows in detail view.
 */
class DatagridRowDetail {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    constructor(selection, rowActionService, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    get replace() {
        return this.expand.replace;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set replace(value) {
        this.expand.replace = !!value;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.cells.changes.subscribe((cellList) => {
            const /** @type {?} */ columnList = this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscription = this.hideableColumnService.columnListChange.subscribe((columnList) => {
            // Prevents cell updates when cols and cells array are not aligned
            if (columnList.length === this.cells.length) {
                this.updateCellsForColumns(columnList);
            }
        });
    }
    /**
     * @param {?} columnList
     * @return {?}
     */
    updateCellsForColumns(columnList) {
        this.cells.forEach((cell, index) => {
            const /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
DatagridRowDetail.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-row-detail",
                template: `
        <ng-container *ngIf="!replace">
            <clr-dg-cell class="datagrid-fixed-column"
                *ngIf="selection.selectionType === SELECTION_TYPE.Multi 
                    || selection.selectionType === SELECTION_TYPE.Single"></clr-dg-cell>
            <clr-dg-cell *ngIf="rowActionService.hasActionableRow" class="datagrid-fixed-column"></clr-dg-cell>
            <clr-dg-cell class="datagrid-fixed-column"></clr-dg-cell>
        </ng-container>
        <ng-content></ng-content>
    `,
                host: {
                    "[class.datagrid-row-flex]": "true",
                    "[class.datagrid-row-detail]": "!replace",
                    "[class.datagrid-container]": "cells.length === 0",
                }
            },] },
];
/**
 * @nocollapse
 */
DatagridRowDetail.ctorParameters = () => [
    { type: Selection, },
    { type: RowActionService, },
    { type: Expand, },
    { type: HideableColumnService, },
];
DatagridRowDetail.propDecorators = {
    'cells': [{ type: ContentChildren, args: [DatagridCell,] },],
    'replace': [{ type: Input, args: ["clrDgReplace",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridBodyRenderer {
    /**
     * @param {?} el
     * @param {?} organizer
     * @param {?} domAdapter
     */
    constructor(el, organizer, domAdapter) {
        this.el = el;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.subscription = organizer.scrollbar.subscribe(() => this.computeScrollbarWidth());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    computeScrollbarWidth() {
        this.organizer.scrollbarWidth.next(this.domAdapter.scrollBarWidth(this.el.nativeElement));
    }
}
DatagridBodyRenderer.decorators = [
    { type: Directive, args: [{ selector: "[clrDgBody]" },] },
];
/**
 * @nocollapse
 */
DatagridBodyRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const NO_LAYOUT_CLASS = "datagrid-no-layout";
const COMPUTE_WIDTH_CLASS = "datagrid-computing-columns-width";
const STRICT_WIDTH_CLASS = "datagrid-fixed-width";

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridCellRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.clearWidths.subscribe(() => this.clearWidth());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    clearWidth() {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, "width", null);
    }
    /**
     * @param {?} strict
     * @param {?} value
     * @return {?}
     */
    setWidth(strict, value) {
        if (strict) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, "width", value + "px");
    }
}
DatagridCellRenderer.decorators = [
    { type: Directive, args: [{ selector: "clr-dg-cell" },] },
];
/**
 * @nocollapse
 */
DatagridCellRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridColumnResizer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} dragDispatcher
     */
    constructor(el, renderer, organizer, domAdapter, dragDispatcher) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.dragDispatcher = dragDispatcher;
        this.columnResizeBy = 0;
        this.dragWithinMinWidth = false;
        this.resizeEmitter = new EventEmitter();
        this.subscriptions = [];
        this.columnEl = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.columnMinWidth = this.domAdapter.minWidth(this.columnEl);
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(() => this.dragStartHandler()));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe(($event) => this.dragMoveHandler($event)));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(() => this.dragEndHandler()));
    }
    /**
     * @return {?}
     */
    dragStartHandler() {
        this.renderer.setStyle(this.handleTrackerEl, "display", "block");
        this.renderer.setStyle(document.body, "cursor", "col-resize");
        this.dragDistancePositionX = 0;
        this.columnRectWidth = this.domAdapter.clientRectWidth(this.columnEl);
        this.pageStartPositionX = this.domAdapter.clientRectRight(this.columnEl);
    }
    /**
     * @param {?} moveEvent
     * @return {?}
     */
    dragMoveHandler(moveEvent) {
        const /** @type {?} */ pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, "right", -1 * this.dragDistancePositionX + "px");
    }
    /**
     * @return {?}
     */
    dragEndHandler() {
        this.renderer.setStyle(this.handleTrackerEl, "right", "0px");
        this.renderer.setStyle(this.handleTrackerEl, "display", "none");
        this.renderer.setStyle(document.body, "cursor", "auto");
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    }
    /**
     * @param {?} draggedDistance
     * @return {?}
     */
    getPositionWithinMax(draggedDistance) {
        if (draggedDistance < 0) {
            if (Math.abs(draggedDistance) < this.columnRectWidth - this.columnMinWidth) {
                if (this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = false;
                    this.renderer.removeClass(this.handleTrackerEl, "exceeded-max");
                }
                return draggedDistance;
            }
            else {
                if (!this.dragWithinMinWidth) {
                    this.dragWithinMinWidth = true;
                    this.renderer.addClass(this.handleTrackerEl, "exceeded-max");
                }
                return this.columnMinWidth - this.columnRectWidth;
            }
        }
        else {
            if (this.dragWithinMinWidth) {
                this.dragWithinMinWidth = false;
                this.renderer.removeClass(this.handleTrackerEl, "exceeded-max");
            }
            return draggedDistance;
        }
    }
}
DatagridColumnResizer.decorators = [
    { type: Directive, args: [{ selector: "clr-dg-column", providers: [DragDispatcher] },] },
];
/**
 * @nocollapse
 */
DatagridColumnResizer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DragDispatcher, },
];
DatagridColumnResizer.propDecorators = {
    'resizeEmitter': [{ type: Output, args: ["clrDgColumnResize",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridHeadRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.scrollbarWidth.subscribe(width => this.accountForScrollbar(width));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} width
     * @return {?}
     */
    accountForScrollbar(width) {
        this.renderer.setStyle(this.el.nativeElement, "padding-right", width + "px");
    }
}
DatagridHeadRenderer.decorators = [
    { type: Directive, args: [{ selector: "[clrDgHead]" },] },
];
/**
 * @nocollapse
 */
DatagridHeadRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridHeaderRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizer
     */
    constructor(el, renderer, organizer, domAdapter, columnResizer) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.subscriptions = [];
        this.widthSet = false;
        this.subscriptions.push(organizer.clearWidths.subscribe(() => this.clearWidth()));
        this.subscriptions.push(organizer.detectStrictWidths.subscribe(() => this.detectStrictWidth()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    clearWidth() {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, "width", null);
        }
    }
    /**
     * @return {?}
     */
    detectStrictWidth() {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    }
    /**
     * @return {?}
     */
    computeWidth() {
        let /** @type {?} */ width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setWidth(width) {
        if (this.strictWidth) {
            if (this.columnResizer.columnResizeBy) {
                this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
                this.columnResizer.columnResizeBy = 0;
                this.widthSet = false;
            }
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
            // We don't actually set the width if there already is a user-defined one, we just add the class
            return;
        }
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
        this.widthSet = true;
    }
}
DatagridHeaderRenderer.decorators = [
    { type: Directive, args: [{ selector: "clr-dg-column" },] },
];
/**
 * @nocollapse
 */
DatagridHeaderRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DatagridColumnResizer, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridMainRenderer {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     */
    constructor(organizer, items, page, domAdapter, el, renderer) {
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this._heightSet = false;
        this._subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this._subscriptions.push(organizer.computeWidths.subscribe(() => this.computeHeadersWidth()));
        this._subscriptions.push(this.page.sizeChange.subscribe(() => {
            if (this._heightSet) {
                this.resetDatagridHeight();
            }
        }));
        this._subscriptions.push(this.items.change.subscribe(() => this.shouldStabilizeColumns = true));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._subscriptions.push(this.headers.changes.subscribe(() => {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            this.columnsSizesStable = false;
            this.stabilizeColumns();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(() => {
                this.computeDatagridHeight();
            });
        }
    }
    /**
     * @return {?}
     */
    shouldComputeHeight() {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    }
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     * @return {?}
     */
    computeDatagridHeight() {
        const /** @type {?} */ value = this.domAdapter.computedHeight(this.el.nativeElement);
        this.renderer.setStyle(this.el.nativeElement, "height", value + "px");
        this._heightSet = true;
    }
    /**
     * @return {?}
     */
    resetDatagridHeight() {
        this.renderer.setStyle(this.el.nativeElement, "height", "");
        this._heightSet = false;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * Makes each header compute its width.
     * @return {?}
     */
    computeHeadersWidth() {
        const /** @type {?} */ nbColumns = this.headers.length;
        let /** @type {?} */ allStrict = true;
        this.headers.forEach((header, index) => {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            if (!header.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                delete header.strictWidth;
            }
            this.organizer.widths[index] = { px: header.computeWidth(), strict: !!header.strictWidth };
        });
        this.headers.forEach((header, index) => header.setWidth(this.organizer.widths[index].px));
    }
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @return {?}
     */
    stabilizeColumns() {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // change in items might have introduced/taken away the scrollbar
            // FIXME: setTimeout is needed here because:
            // When the user changes the page the following things happen:
            // 1. The array which contains the items displayed is updated to contain the items on the new page.
            // 2. An event is emitted which is subscribed to by the main renderer (this file) and this marks the
            // shouldStabilizeColumns flag to true
            // 3. While this is happening the datagrid is in the process of cleaning up the view. The view first
            // renders the new displayed items and then cleans up the old items. But there is a point where the view
            // contains the old items as well as the new items. So if the page size is 10 the view contains 20 items.
            // This causes the datagrid body to overflow.
            // Now since shouldStabilizeColumns was set to true, the scrollbar width is calculated
            // and added to the datagrid header. Adding the setTimeout gives Angular time to clean up the view so that
            // the scrollbar disappears.
            // See this: https://github.com/angular/angular/issues/19094
            // When the above issue is resolve, remove the setTimeout
            setTimeout(() => {
                this.organizer.scrollbar.next();
            });
            return;
        }
        // No point resizing if there are no rows, we wait until they are actually loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    }
}
DatagridMainRenderer.decorators = [
    { type: Directive, args: [{ selector: "clr-datagrid", providers: [DomAdapter] },] },
];
/**
 * @nocollapse
 */
DatagridMainRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: Page, },
    { type: DomAdapter, },
    { type: ElementRef, },
    { type: Renderer2, },
];
DatagridMainRenderer.propDecorators = {
    'headers': [{ type: ContentChildren, args: [DatagridHeaderRenderer,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridRowRenderer {
    /**
     * @param {?} organizer
     */
    constructor(organizer) {
        this.organizer = organizer;
        this.subscription = organizer.alignColumns.subscribe(() => this.setWidths());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setWidths() {
        if (this.organizer.widths.length !== this.cells.length) {
            return;
        }
        this.cells.forEach((cell, index) => {
            const /** @type {?} */ width = this.organizer.widths[index];
            cell.setWidth(width.strict, width.px);
        });
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.cells.changes.subscribe(() => {
            this.setWidths();
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setWidths();
    }
}
DatagridRowRenderer.decorators = [
    { type: Directive, args: [{ selector: "clr-dg-row, clr-dg-row-detail" },] },
];
/**
 * @nocollapse
 */
DatagridRowRenderer.ctorParameters = () => [
    { type: DatagridRenderOrganizer, },
];
DatagridRowRenderer.propDecorators = {
    'cells': [{ type: ContentChildren, args: [DatagridCellRenderer,] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DatagridTableRenderer {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    constructor(el, renderer, organizer) {
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.tableMode.subscribe(on => this.tableMode(on)));
        this.subscriptions.push(organizer.noLayout.subscribe(on => this.noLayout(on)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.outsideContainer.createEmbeddedView(this.projected);
    }
    /**
     * @param {?} on
     * @return {?}
     */
    tableMode(on) {
        if (on) {
            // We move stuff into the body before making it visible
            this.insideContainer.insert(this.outsideContainer.detach(0), 0);
            this.renderer.addClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
        }
        else {
            // We make stuff invisible before moving it out of the body
            this.renderer.removeClass(this.el.nativeElement, COMPUTE_WIDTH_CLASS);
            this.outsideContainer.insert(this.insideContainer.detach(0), 0);
        }
    }
    /**
     * @param {?} on
     * @return {?}
     */
    noLayout(on) {
        if (on) {
            this.renderer.addClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
    }
}
DatagridTableRenderer.decorators = [
    { type: Component, args: [{
                selector: "clr-dg-table-wrapper",
                template: `
        <ng-template #head><ng-content select="[clrDgHead]"></ng-content></ng-template>
        <ng-container #outside></ng-container>
        <div clrDgBody class="datagrid-body">
            <ng-container #inside></ng-container>
            <ng-content></ng-content>
        </div>
    `
            },] },
];
/**
 * @nocollapse
 */
DatagridTableRenderer.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatagridRenderOrganizer, },
];
DatagridTableRenderer.propDecorators = {
    'projected': [{ type: ViewChild, args: ["head",] },],
    'outsideContainer': [{ type: ViewChild, args: ["outside", { read: ViewContainerRef },] },],
    'insideContainer': [{ type: ViewChild, args: ["inside", { read: ViewContainerRef },] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const DATAGRID_DIRECTIVES = [
    // Core
    Datagrid, DatagridActionBar, DatagridActionOverflow, DatagridColumn, DatagridColumnToggle,
    DatagridHideableColumnDirective, DatagridFilter, DatagridItems, DatagridRow, DatagridRowDetail,
    DatagridDetailRegisterer, DatagridCell, DatagridFooter, DatagridPagination, DatagridPlaceholder,
    // Renderers
    DatagridMainRenderer, DatagridTableRenderer, DatagridHeadRenderer, DatagridHeaderRenderer, DatagridBodyRenderer,
    DatagridColumnResizer, DatagridRowRenderer, DatagridCellRenderer,
    // Chocolate
    DatagridWillyWonka, ActionableOompaLoompa, ExpandableOompaLoompa,
    // Animation hack
    DatagridRowExpandAnimation,
    // Built-in shortcuts
    DatagridStringFilter
];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrDatagridModule {
}
ClrDatagridModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, ClrIconModule, ClrFormsModule, FormsModule, ClrCommonPopoverModule, ClrLoadingModule,
                    ClrOutsideClickModule
                ],
                declarations: [
                    DATAGRID_DIRECTIVES,
                ],
                exports: [DATAGRID_DIRECTIVES, ClrIfExpandModule]
            },] },
];
/**
 * @nocollapse
 */
ClrDatagridModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StackBlock {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.expanded = false;
        this.expandedChange = new EventEmitter(false);
        this.expandable = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    /**
     * @return {?}
     */
    get getChangedValue() {
        return this._changed || (this._changedChildren > 0 && !this.expanded);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set setChangedValue(value) {
        this._changed = value;
        if (this.parent && this._fullyInitialized) {
            if (value) {
                this.parent._changedChildren++;
            }
            else {
                this.parent._changedChildren--;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // in order to access the parent StackBlock's properties,
        // the child StackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    }
    /**
     * @return {?}
     */
    addChild() {
        this.expandable = true;
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}
StackBlock.decorators = [
    { type: Component, args: [{
                selector: "clr-stack-block",
                template: `
        <dt class="stack-block-label" (click)="toggleExpand()">
            <ng-content select="clr-stack-label"></ng-content>
        </dt>
        <dd class="stack-block-content">
            <ng-content></ng-content>
        </dd>
        <!-- FIXME: remove this string concatenation when boolean states are supported -->
        <div [@collapse]="''+!expanded" class="stack-children">
            <ng-content select="clr-stack-block"></ng-content>
        </div>
    `,
                // Custom elements are inline by default
                styles: [`
        :host { display: block; }
    `],
                // Make sure the host has the proper class for styling purposes
                host: { "[class.stack-block]": "true" },
                animations: [trigger("collapse", [
                        state("true", style({ "height": 0, "overflow-y": "hidden" })),
                        transition("true => false", [animate("0.2s ease-in-out", style({ "height": "*", "overflow-y": "hidden" }))]),
                        transition("false => true", [style({ "height": "*", "overflow-y": "hidden" }), animate("0.2s ease-in-out")])
                    ])]
            },] },
];
/**
 * @nocollapse
 */
StackBlock.ctorParameters = () => [
    { type: StackBlock, decorators: [{ type: SkipSelf }, { type: Optional },] },
];
StackBlock.propDecorators = {
    'expanded': [{ type: HostBinding, args: ["class.stack-block-expanded",] }, { type: Input, args: ["clrSbExpanded",] },],
    'expandedChange': [{ type: Output, args: ["clrSbExpandedChange",] },],
    'expandable': [{ type: HostBinding, args: ["class.stack-block-expandable",] }, { type: Input, args: ["clrSbExpandable",] },],
    'getChangedValue': [{ type: HostBinding, args: ["class.stack-block-changed",] },],
    'setChangedValue': [{ type: Input, args: ["clrSbNotifyChange",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StackView {
    constructor() {
        /**
         * Undocumented experimental feature: inline editing.
         */
        this.editable = false;
        this.save = new EventEmitter(false);
        this._editMode = false;
        this.editingChange = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get editing() {
        return this.editable && this._editMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set editing(value) {
        if (this.editable) {
            this._editMode = value;
            this.editingChange.emit(value);
            if (!value) {
                this.save.emit(null);
            }
        }
    }
}
/**
 * End of undocumented experimental feature.
 */
StackView.decorators = [
    { type: Component, args: [{
                selector: "clr-stack-view",
                template: `
        <ng-content select="clr-stack-header"></ng-content>
        <dl class="stack-view"><ng-content></ng-content></dl>
    `,
                // Custom elements are inline by default.
                styles: [`
        :host { display: block; }
    `]
            },] },
];
/**
 * @nocollapse
 */
StackView.ctorParameters = () => [];
StackView.propDecorators = {
    'save': [{ type: Output, args: ["clrStackSave",] },],
};
class StackViewCustomTags {
}
// No behavior
// The only purpose is to "declare" the tag in Angular
StackViewCustomTags.decorators = [
    { type: Directive, args: [{ selector: "clr-stack-label, clr-stack-content" },] },
];
/**
 * @nocollapse
 */
StackViewCustomTags.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class StackHeader {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        this.stackView = stackView;
    }
}
StackHeader.decorators = [
    { type: Component, args: [{
                selector: "clr-stack-header",
                template: `
        <h4 class="stack-header">
            <span class="stack-title"><ng-content></ng-content></span>
            
            <span class="stack-actions">
                <ng-content select=".stack-action"></ng-content>
                <!-- Undocumented experimental feature: inline editing. -->
                <button *ngIf="stackView.editable" class="stack-action btn btn-sm btn-link" 
                        (click)="stackView.editing = !stackView.editing" type="button">
                        Edit
                </button>
                <!-- End of undocumented experimental feature. -->
            </span>
        </h4>
    `,
                // Custom elements are inline by default
                styles: [`
        :host { display: block; }
    `]
            },] },
];
/**
 * @nocollapse
 */
StackHeader.ctorParameters = () => [
    { type: StackView, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 */
class StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        this.stackView = stackView;
        this.modelChange = new EventEmitter(false);
        // Make the StackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe((editing) => {
            // Edit mode was closed
            if (!editing) {
                this.modelChange.emit(this.model);
            }
        });
    }
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: support more types of inputs: checkbox, radio, ...
 * TODO: Mirror input attributes from the host to the actual input: size, min, max, placeholder, ...
 */
class StackInput extends StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
        this.type = "text";
    }
}
StackInput.decorators = [
    { type: Component, args: [{
                selector: "clr-stack-input",
                inputs: ["model: clrModel", "type"],
                outputs: ["modelChange: clrModelChange"],
                template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <input [type]="type" *ngIf="stackView.editing" [(ngModel)]="model"/>
    `
            },] },
];
/**
 * @nocollapse
 */
StackInput.ctorParameters = () => [
    { type: StackView, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 *
 * TODO: Offer a a way to customize the value displayed, plain value may be unreadable.
 */
class StackSelect extends StackControl {
    /**
     * @param {?} stackView
     */
    constructor(stackView) {
        super(stackView);
        this.stackView = stackView;
    }
}
StackSelect.decorators = [
    { type: Component, args: [{
                selector: "clr-stack-select",
                inputs: ["model: clrModel"],
                outputs: ["modelChange: clrModelChange"],
                template: `
        <span *ngIf="!stackView.editing">{{model}}</span>
        <div class="select" *ngIf="stackView.editing" >
            <select [(ngModel)]="model">
                <ng-content></ng-content>
            </select>
        </div>
    `
            },] },
];
/**
 * @nocollapse
 */
StackSelect.ctorParameters = () => [
    { type: StackView, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const STACK_VIEW_DIRECTIVES = [
    StackView, StackHeader, StackBlock, StackViewCustomTags,
    /**
     * Undocumented experimental feature: inline editing.
     */
    StackInput, StackSelect
    /**
     * End of undocumented experimental feature.
     */
];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrStackViewModule {
}
ClrStackViewModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule, FormsModule], declarations: [STACK_VIEW_DIRECTIVES], exports: [STACK_VIEW_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrStackViewModule.ctorParameters = () => [];

/**
 * @abstract
 */
class AbstractTreeSelection {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    /**
     * @abstract
     * @return {?}
     */
    children() { }
    /**
     * @abstract
     * @return {?}
     */
    selectedChanged() { }
    /**
     * @abstract
     * @return {?}
     */
    indeterminateChanged() { }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this.indeterminate = false;
        this.children.forEach(child => child.parentChanged(value));
        if (this.parent) {
            this.parent.childChanged();
        }
        this.selectedChanged();
    }
    /**
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set indeterminate(value) {
        value = !!value;
        if (this._indeterminate !== value) {
            this._indeterminate = value;
            this.indeterminateChanged();
        }
    }
    /**
     * @return {?}
     */
    childChanged() {
        let /** @type {?} */ oneSelectedChild = false;
        const /** @type {?} */ previousSelectedValue = this._selected;
        const /** @type {?} */ previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        for (const /** @type {?} */ child of this.children) {
            if (child.indeterminate) {
                this._selected = false;
                this._indeterminate = true;
                break;
            }
            if (child.selected) {
                oneSelectedChild = true;
                if (this._selected === false) {
                    this._indeterminate = true;
                    break;
                }
            }
            else {
                this._selected = false;
                if (oneSelectedChild) {
                    this._indeterminate = true;
                    break;
                }
            }
        }
        if (this.parent &&
            (this._selected !== previousSelectedValue || this._indeterminate !== previousIndeterminateValue)) {
            this.parent.childChanged();
        }
        if (this.selected !== previousSelectedValue) {
            this.selectedChanged();
        }
        if (this.indeterminate !== previousIndeterminateValue) {
            this.indeterminateChanged();
        }
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    parentChanged(selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(true));
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(child => child.parentChanged(false));
            this.selectedChanged();
        }
    }
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TreeSelectionService {
    constructor() {
        this.selectable = false;
    }
}
TreeSelectionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
TreeSelectionService.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} existing
 * @return {?}
 */
function clrTreeSelectionProviderFactory(existing) {
    return existing || new TreeSelectionService();
}

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TreeNode extends AbstractTreeSelection {
    /**
     * @param {?} nodeExpand
     * @param {?} parent
     * @param {?} treeSelectionService
     */
    constructor(nodeExpand, parent, treeSelectionService) {
        super(parent);
        this.nodeExpand = nodeExpand;
        this.parent = parent;
        this.treeSelectionService = treeSelectionService;
        this._children = [];
        this.nodeSelectedChange = new EventEmitter(true);
        this.nodeIndeterminateChanged = new EventEmitter(true);
        if (this.parent) {
            this.parent.register(this);
        }
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    checkIfChildNodeRegistered(node) {
        return (this.children.indexOf(node) > -1);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    register(node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    unregister(node) {
        const /** @type {?} */ index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
    /**
     * @return {?}
     */
    activateSelection() {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeSelected(value) {
        // required for recursive trees to discard unset inputs.
        this.activateSelection();
        if (value === undefined || value === null) {
            return;
        }
        if (this.selected !== value) {
            this.selected = value;
        }
    }
    /**
     * @return {?}
     */
    selectedChanged() {
        this.nodeSelectedChange.emit(this.selected);
    }
    /**
     * @return {?}
     */
    get selectable() {
        if (this.treeSelectionService) {
            return this.treeSelectionService.selectable;
        }
        return false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nodeIndeterminate(value) {
        this.indeterminate = value;
        this.activateSelection();
    }
    /**
     * @return {?}
     */
    indeterminateChanged() {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    }
    /**
     * @return {?}
     */
    get caretDirection() {
        return (this.nodeExpand.expanded) ? "down" : "right";
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.nodeExpand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        value = !!value;
        if (this.nodeExpand.expanded !== value) {
            this.nodeExpand.expanded = value;
        }
    }
    /**
     * @return {?}
     */
    get state() {
        return (this.expanded && !this.nodeExpand.loading) ? "expanded" : "collapsed";
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.parent) {
            this.parent.unregister(this);
        }
    }
}
TreeNode.decorators = [
    { type: Component, args: [{
                selector: "clr-tree-node",
                template: `
      <div class="clr-tree-node-content-container">
          <button
              type="button"
              class="clr-treenode-caret"
              (click)="toggleExpand()"
              *ngIf="nodeExpand.expandable && !nodeExpand.loading">
              <clr-icon
                  class="clr-treenode-caret-icon"
                  shape="caret"
                  [attr.dir]="caretDirection"></clr-icon>
          </button>
          <div class="clr-treenode-spinner-container" *ngIf="nodeExpand.expandable && nodeExpand.loading">
              <span class="clr-treenode-spinner spinner">
                  Loading...
              </span>
          </div>
          <clr-checkbox
              class="clr-treenode-checkbox"
              *ngIf="selectable"
              [(ngModel)]="selected"
              [(clrIndeterminate)]="indeterminate"></clr-checkbox>
          <div class="clr-treenode-content">
              <ng-content></ng-content>
          </div>
      </div>
      <!-- FIXME: remove this string concatenation when boolean states are supported -->
      <div
          class="clr-treenode-children"
          [@childNodesState]="state">
          <ng-content select="clr-tree-node"></ng-content>
          <ng-content select="[clrIfExpanded]"></ng-content>
      </div>
    `,
                providers: [
                    Expand, { provide: LoadingListener, useExisting: Expand }, {
                        provide: TreeSelectionService,
                        useFactory: clrTreeSelectionProviderFactory,
                        deps: [[new Optional(), new SkipSelf(), TreeSelectionService]]
                    }
                ],
                animations: [trigger("childNodesState", [
                        state("expanded", style({ "height": "*", "overflow-y": "hidden" })),
                        state("collapsed", style({ "height": 0, "overflow-y": "hidden" })),
                        transition("expanded <=> collapsed", animate("0.2s ease-in-out"))
                    ])],
                host: { "class": ".clr-tree-node" }
            },] },
];
/**
 * @nocollapse
 */
TreeNode.ctorParameters = () => [
    { type: Expand, },
    { type: TreeNode, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: TreeSelectionService, },
];
TreeNode.propDecorators = {
    'nodeSelected': [{ type: Input, args: ["clrSelected",] },],
    'nodeSelectedChange': [{ type: Output, args: ["clrSelectedChange",] },],
    'nodeIndeterminate': [{ type: Input, args: ["clrIndeterminate",] },],
    'nodeIndeterminateChanged': [{ type: Output, args: ["clrIndeterminateChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const TREE_VIEW_DIRECTIVES = [TreeNode];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTreeViewModule {
}
ClrTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, FormsModule, ClrFormsModule],
                declarations: [TREE_VIEW_DIRECTIVES],
                exports: [TREE_VIEW_DIRECTIVES, ClrIfExpandModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTreeViewModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrDataModule {
}
ClrDataModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] },
];
/**
 * @nocollapse
 */
ClrDataModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let activeCounter = 0;
const IF_ACTIVE_ID = new InjectionToken("IF_ACTIVE_ID");
/**
 * @return {?}
 */
function tokenFactory() {
    return ++activeCounter;
}
const IF_ACTIVE_ID_PROVIDER = {
    provide: IF_ACTIVE_ID,
    useFactory: tokenFactory
};
/**
 * ******
 * \@class IfActiveService
 *
 * \@description
 * An injectable service used by IfActive structural directives and the components that implement IfActive in their
 * templates. It holds the value of the current state and provides an Observable that both the directive and the
 * implementing component can subscribe to in order to take action on current value changes.
 *
 */
class IfActiveService {
    constructor() {
        /**
         * *****
         * \@property _currentChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject$1();
    }
    /**
     * ******
     * \@function currentChange
     *
     * \@description
     * A getter function that provides an observable for the _current Subject.
     *
     * @return {?}
     */
    get currentChange() {
        return this._currentChange.asObservable();
    }
    /**
     * ******
     * \@function current
     *
     * \@description
     * A setter function that updates the current state of _current for this instance of IfActive structural directive.
     * And, broadcasts the new value to all subscribers.
     *
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        if (this._current !== value) {
            this._current = value;
            this._currentChange.next(value);
        }
    }
    /**
     * ******
     *
     * \@function current
     *
     * \@description
     * A getter that returns the current value of this IfActive instance.
     * @return {?}
     */
    get current() {
        return this._current;
    }
}
IfActiveService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
IfActiveService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * *******
 *
 * \@class IfActiveDirective
 *
 * \@description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfActiveService to maintain state between itself and
 * the component using it in the component template.
 *
 */
class IfActiveDirective {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} template
     * @param {?} container
     */
    constructor(ifActiveService, id, template, container) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.template = template;
        this.container = container;
        this.wasActive = false;
        /**
         * *******
         * \@property activeChange
         *
         * \@description
         * An event emitter that emits when the active property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.activeChange = new EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe((newCurrentId) => {
            this.checkAndUpdateView(newCurrentId);
        });
    }
    /**
     * @param {?} currentId
     * @return {?}
     */
    checkAndUpdateView(currentId) {
        const /** @type {?} */ isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    }
    /**
     * ******
     * \@function active
     *
     * \@description
     * A setter that updates IfActiveService.active with value.
     *
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value) {
            this.ifActiveService.current = this.id;
        }
    }
    /**
     * *****
     * \@function active
     *
     * \@description
     * A getter that returns the current IfActiveService.active value.
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
    /**
     * ******
     * \@function updateView
     *
     * \@description
     * Function that takes a any value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
IfActiveDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrIfActive]" },] },
];
/**
 * @nocollapse
 */
IfActiveDirective.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
IfActiveDirective.propDecorators = {
    'active': [{ type: Input, args: ["clrIfActive",] },],
    'activeChange': [{ type: Output, args: ["clrIfActiveChange",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * *******
 *
 * \@class IfOpenDirective
 *
 * \@description
 * A structural directive that controls whether or not the associated TemplateRef is instantiated or not.
 * It makes use of a Component instance level service: IfOpenService to maintain state between itself and the component
 * using it in the component template.
 *
 */
class IfOpenDirective {
    /**
     * @param {?} ifOpenService
     * @param {?} template
     * @param {?} container
     */
    constructor(ifOpenService, template, container) {
        this.ifOpenService = ifOpenService;
        this.template = template;
        this.container = container;
        /**
         * *******
         * \@property openChange
         *
         * \@description
         * An event emitter that emits when the open property is set to allow for 2way binding when the directive is
         * used with de-structured / de-sugared syntax.
         *
         */
        this.openChange = new EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe((change) => {
            this.updateView(change);
            this.openChange.emit(change);
        });
    }
    /**
     * ******
     * \@function open
     *
     * \@description
     * A setter that updates IfOpenService.open with value.
     *
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this.ifOpenService.open = value;
    }
    /**
     * *****
     * \@function open
     *
     * \@description
     * A getter that returns the current IfOpenService.open value.
     * @return {?}
     */
    get open() {
        return this.ifOpenService.open;
    }
    /**
     * ******
     * \@function updateView
     *
     * \@description
     * Function that takes a boolean value and either created an embedded view for the associated ViewContainerRef or,
     * Clears all views from the ViewContainerRef
     * @param {?} value
     * @return {?}
     */
    updateView(value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
IfOpenDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrIfOpen]" },] },
];
/**
 * @nocollapse
 */
IfOpenDirective.ctorParameters = () => [
    { type: IfOpenService, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
IfOpenDirective.propDecorators = {
    'open': [{ type: Input, args: ["clrIfOpen",] },],
    'openChange': [{ type: Output, args: ["clrIfOpenChange",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const CONDITIONAL_DIRECTIVES = [IfActiveDirective, IfOpenDirective];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrConditionalModule {
}
ClrConditionalModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrConditionalModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class RootDropdownService {
    constructor() {
        this._changes = new Subject$1();
    }
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * @return {?}
     */
    closeMenus() {
        this._changes.next(false);
    }
}
RootDropdownService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
RootDropdownService.ctorParameters = () => [];
/**
 * @param {?} existing
 * @return {?}
 */
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
const ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new Optional(), new SkipSelf(), RootDropdownService]]
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Dropdown {
    /**
     * @param {?} parent
     * @param {?} ifOpenService
     * @param {?} dropdownService
     */
    constructor(parent, ifOpenService, dropdownService) {
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.isMenuClosable = true;
        this._subscription = dropdownService.changes.subscribe(value => this.ifOpenService.open = value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
Dropdown.decorators = [
    { type: Component, args: [{
                selector: "clr-dropdown",
                template: "<ng-content></ng-content>",
                host: {
                    "[class.dropdown]": "true",
                    // FIXME: remove this as soon as we stop supporting this old <div class="dropdown-menu"> syntax
                    "[class.open]": "ifOpenService.open"
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Dropdown.ctorParameters = () => [
    { type: Dropdown, decorators: [{ type: SkipSelf }, { type: Optional },] },
    { type: IfOpenService, },
    { type: RootDropdownService, },
];
Dropdown.propDecorators = {
    'isMenuClosable': [{ type: Input, args: ["clrCloseMenuOnItemClick",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DropdownItem {
    /**
     * @param {?} dropdown
     * @param {?} el
     * @param {?} _dropdownService
     */
    constructor(dropdown, el, _dropdownService) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
    }
    /**
     * @return {?}
     */
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains("disabled")) {
            this._dropdownService.closeMenus();
        }
    }
}
DropdownItem.decorators = [
    { type: Directive, args: [{ selector: "[clrDropdownItem]", host: { "[class.dropdown-item]": "true" } },] },
];
/**
 * @nocollapse
 */
DropdownItem.ctorParameters = () => [
    { type: Dropdown, },
    { type: ElementRef, },
    { type: RootDropdownService, },
];
DropdownItem.propDecorators = {
    'onDropdownItemClick': [{ type: HostListener, args: ["click",] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
class AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        this.closeOnOutsideClick = false;
        this.el = injector.get(ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe((change) => {
            change ? this.anchor() : this.release();
        });
        if (this.ifOpenService.open) {
            this.anchor();
        }
    }
    /**
     * @return {?}
     */
    anchor() {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    }
    /**
     * @return {?}
     */
    release() {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance.anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(() => {
                // if a scroll event is detected, close the popover
                this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.release();
        this.subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    get isOffScreen() {
        return this.ifOpenService.open ? false : true;
    }
    /**
     * @return {?}
     */
    attachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            this.hostListener = this.renderer.listen(this.el.nativeElement, "click", event => this.ignore = event);
            this.documentListener = this.renderer.listen("document", "click", event => {
                if (event === this.ignore) {
                    delete this.ignore;
                }
                else {
                    this.ifOpenService.open = false;
                }
            });
        }
    }
    /**
     * @return {?}
     */
    detachOutsideClickListener() {
        if (this.closeOnOutsideClick) {
            if (this.hostListener) {
                this.hostListener();
                delete this.hostListener;
            }
            if (this.documentListener) {
                this.documentListener();
                delete this.documentListener;
            }
        }
    }
}
AbstractPopover.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AbstractPopover.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: SkipSelf },] },
];
AbstractPopover.propDecorators = {
    'isOffScreen': [{ type: HostBinding, args: ["class.is-off-screen",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DropdownMenu extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     * @param {?} nested
     */
    constructor(injector, parentHost, nested) {
        if (!parentHost) {
            throw new Error("clr-dropdown-menu should only be used inside of a clr-dropdown");
        }
        super(injector, parentHost);
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            this.anchorPoint = Point.BOTTOM_LEFT;
            this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            this.anchorPoint = Point.RIGHT_TOP;
            this.popoverPoint = Point.LEFT_TOP;
        }
        this.popoverOptions.allowMultipleOpen = true;
        this.closeOnOutsideClick = true;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // set the popover values based on menu position
        switch (position) {
            case ("top-right"):
                this.anchorPoint = Point.TOP_RIGHT;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case ("top-left"):
                this.anchorPoint = Point.TOP_LEFT;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case ("bottom-right"):
                this.anchorPoint = Point.BOTTOM_RIGHT;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case ("bottom-left"):
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("right-top"):
                this.anchorPoint = Point.RIGHT_TOP;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("right-bottom"):
                this.anchorPoint = Point.RIGHT_BOTTOM;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case ("left-top"):
                this.anchorPoint = Point.LEFT_TOP;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case ("left-bottom"):
                this.anchorPoint = Point.LEFT_BOTTOM;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            default:
                this.anchorPoint = Point.BOTTOM_LEFT;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
}
DropdownMenu.decorators = [
    { type: Component, args: [{
                selector: "clr-dropdown-menu",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[class.dropdown-menu]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
DropdownMenu.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
    { type: DropdownMenu, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
DropdownMenu.propDecorators = {
    'position': [{ type: Input, args: ["clrPosition",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class DropdownTrigger {
    /**
     * @param {?} dropdown
     * @param {?} ifOpenService
     */
    constructor(dropdown, ifOpenService) {
        this.dropdown = dropdown;
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifOpenService.open;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDropdownTriggerClick(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
DropdownTrigger.decorators = [
    { type: Directive, args: [{
                // We support both selectors for legacy reasons
                selector: "[clrDropdownTrigger],[clrDropdownToggle]",
                host: {
                    "[class.dropdown-toggle]": "isRootLevelToggle",
                    "[class.dropdown-item]": "!isRootLevelToggle",
                    "[class.expandable]": "!isRootLevelToggle",
                    "[class.active]": "active"
                }
            },] },
];
/**
 * @nocollapse
 */
DropdownTrigger.ctorParameters = () => [
    { type: Dropdown, },
    { type: IfOpenService, },
];
DropdownTrigger.propDecorators = {
    'onDropdownTriggerClick': [{ type: HostListener, args: ["click", ["$event"],] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const DROPDOWN_DIRECTIVES = [Dropdown, DropdownMenu, DropdownTrigger, DropdownItem];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrDropdownModule {
}
ClrDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [DROPDOWN_DIRECTIVES],
                exports: [DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrDropdownModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// TODO: alert-* types are deprecated and should be removed before 1.0!
const ALERT_TYPES = ["alert-info", "alert-warning", "alert-danger", "alert-success", "info", "warning", "danger", "success"];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class AlertIconAndTypesService {
    constructor() {
        this.defaultIconShape = "info-circle";
        this._alertIconShape = "";
        this._alertType = "info";
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this._alertType;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        if (ALERT_TYPES.indexOf(val) > -1) {
            this._alertType = val;
        }
    }
    /**
     * @return {?}
     */
    get alertIconShape() {
        if ("" === this._alertIconShape) {
            return this.iconInfoFromType(this._alertType).shape;
        }
        return this._alertIconShape;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertIconShape(val) {
        if (!val) {
            this._alertIconShape = "";
        }
        else if (val !== this._alertIconShape) {
            this._alertIconShape = val;
        }
    }
    /**
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    iconInfoFromType(type, classOrShape = "shape") {
        const /** @type {?} */ returnObj = { shape: "", cssClass: "" };
        switch (type) {
            case "warning":
            case "alert-warning":
                returnObj.shape = "exclamation-triangle";
                returnObj.cssClass = "alert-warning";
                break;
            case "danger":
            case "alert-danger":
                returnObj.shape = "exclamation-circle";
                returnObj.cssClass = "alert-danger";
                break;
            case "success":
            case "alert-success":
                returnObj.shape = "check-circle";
                returnObj.cssClass = "alert-success";
                break;
            default:
                returnObj.shape = this.defaultIconShape;
                returnObj.cssClass = "alert-info";
                break;
        }
        return returnObj;
    }
}
AlertIconAndTypesService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AlertIconAndTypesService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// providers
class Alert {
    /**
     * @param {?} iconService
     */
    constructor(iconService) {
        this.iconService = iconService;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new EventEmitter(false);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set alertType(val) {
        this.iconService.alertType = val;
    }
    /**
     * @return {?}
     */
    get alertType() {
        return this.iconService.alertType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set alertIconShape(value) {
        this.iconService.alertIconShape = value;
    }
    /**
     * @return {?}
     */
    get alertClass() {
        return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        this._closedChanged.emit(true);
    }
    /**
     * @return {?}
     */
    open() {
        this._closed = false;
        this._closedChanged.emit(false);
    }
}
Alert.decorators = [
    { type: Component, args: [{ selector: "clr-alert", providers: [AlertIconAndTypesService], template: `
  <!--
    ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
    ~ This software is released under MIT license.
    ~ The full license information can be found in LICENSE in the root directory of this project.
    -->

  <div
      *ngIf="!_closed"
      class="alert"
      [ngClass]="alertClass"
      [class.alert-sm]="isSmall"
      [class.alert-app-level]="isAppLevel">
      <div class="alert-items">
          <ng-content></ng-content>
      </div>
      <button type="button" class="close" aria-label="Close" *ngIf="closable" (click)="close()">
          <clr-icon aria-hidden="true" shape="close"></clr-icon>
      </button>
  </div>
` },] },
];
/**
 * @nocollapse
 */
Alert.ctorParameters = () => [
    { type: AlertIconAndTypesService, },
];
Alert.propDecorators = {
    'isSmall': [{ type: Input, args: ["clrAlertSizeSmall",] },],
    'closable': [{ type: Input, args: ["clrAlertClosable",] },],
    'isAppLevel': [{ type: Input, args: ["clrAlertAppLevel",] },],
    '_closed': [{ type: Input, args: ["clrAlertClosed",] },],
    '_closedChanged': [{ type: Output, args: ["clrAlertClosedChange",] },],
    'alertType': [{ type: Input, args: ["clrAlertType",] },],
    'alertIconShape': [{ type: Input, args: ["clrAlertIcon",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class AlertItem {
    /**
     * @param {?} iconService
     */
    constructor(iconService) {
        this.iconService = iconService;
    }
}
AlertItem.decorators = [
    { type: Component, args: [{
                // the .alert-item selector is deprecated; the :not clause is to allow us to use static
                // examples in demos on the demo-app and website
                selector: ".alert-item:not(.static), clr-alert-item",
                template: `
        <div class="alert-icon-wrapper">
            <clr-icon class="alert-icon" [attr.shape]="iconService.alertIconShape"></clr-icon>
        </div>
        <ng-content></ng-content>
    `,
                host: { "class": "alert-item" }
            },] },
];
/**
 * @nocollapse
 */
AlertItem.ctorParameters = () => [
    { type: AlertIconAndTypesService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const ALERT_DIRECTIVES = [Alert, AlertItem];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrAlertModule {
}
ClrAlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [ALERT_DIRECTIVES],
                exports: [ALERT_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrAlertModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrEmphasisModule {
}
ClrEmphasisModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrAlertModule] },] },
];
/**
 * @nocollapse
 */
ClrEmphasisModule.ctorParameters = () => [];

class ClrResponsiveNavCodes {
}
ClrResponsiveNavCodes.NAV_LEVEL_1 = 1;
ClrResponsiveNavCodes.NAV_LEVEL_2 = 2;
ClrResponsiveNavCodes.NAV_CLOSE_ALL = "NAV_CLOSE_ALL";
ClrResponsiveNavCodes.NAV_OPEN = "NAV_OPEN";
ClrResponsiveNavCodes.NAV_CLOSE = "NAV_CLOSE";
ClrResponsiveNavCodes.NAV_TOGGLE = "NAV_TOGGLE";
ClrResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU = "open-hamburger-menu";
ClrResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU = "open-overflow-menu";
ClrResponsiveNavCodes.NAV_CLASS_TRIGGER_1 = "header-hamburger-trigger";
ClrResponsiveNavCodes.NAV_CLASS_TRIGGER_2 = "header-overflow-trigger";
ClrResponsiveNavCodes.NAV_CLASS_LEVEL_1 = "clr-nav-level-1";
ClrResponsiveNavCodes.NAV_CLASS_LEVEL_2 = "clr-nav-level-2";

class ClrResponsiveNavControlMessage {
    /**
     * @param {?} _controlCode
     * @param {?} _navLevel
     */
    constructor(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    /**
     * @return {?}
     */
    get controlCode() {
        return this._controlCode;
    }
    /**
     * @return {?}
     */
    get navLevel() {
        return this._navLevel;
    }
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new Subject$1();
        this.controlNavSubject = new Subject$1();
        this.closeAllNavs(); // We start with all navs closed
    }
    /**
     * @return {?}
     */
    get registeredNavs() {
        return this.registerNavSubject.asObservable();
    }
    /**
     * @return {?}
     */
    get navControl() {
        return this.controlNavSubject.asObservable();
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    registerNav(navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    isNavRegistered(navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error("Multiple clr-nav-level " + navLevel +
                " attributes found. Please make sure that only one exists");
            return true;
        }
        return false;
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    unregisterNav(navLevel) {
        const /** @type {?} */ index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    sendControlMessage(controlCode, navLevel) {
        const /** @type {?} */ message = new ClrResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    /**
     * @return {?}
     */
    closeAllNavs() {
        const /** @type {?} */ message = new ClrResponsiveNavControlMessage(ClrResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
}
ClrResponsiveNavigationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ClrResponsiveNavigationService.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class MainContainer {
    /**
     * @param {?} elRef
     * @param {?} responsiveNavService
     */
    constructor(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: (message) => {
                this.processMessage(message);
            }
        });
    }
    /**
     * @param {?} message
     * @return {?}
     */
    processMessage(message) {
        let /** @type {?} */ navClass = ClrResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
        if (message.controlCode === ClrResponsiveNavCodes.NAV_CLOSE_ALL) {
            this._classList.remove(ClrResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU);
            this._classList.remove(ClrResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU);
        }
        else if (message.navLevel === ClrResponsiveNavCodes.NAV_LEVEL_1) {
            this.controlNav(message.controlCode, navClass);
        }
        else if (message.navLevel === ClrResponsiveNavCodes.NAV_LEVEL_2) {
            navClass = ClrResponsiveNavCodes.NAV_CLASS_OVERFLOW_MENU;
            this.controlNav(message.controlCode, navClass);
        }
    }
    /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    controlNav(controlCode, navClass) {
        if (controlCode === ClrResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ClrResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ClrResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
MainContainer.decorators = [
    { type: Directive, args: [{ selector: "clr-main-container", host: { "[class.main-container]": "true" } },] },
];
/**
 * @nocollapse
 */
MainContainer.ctorParameters = () => [
    { type: ElementRef, },
    { type: ClrResponsiveNavigationService, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const LAYOUT_DIRECTIVES = [MainContainer];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrMainContainerModule {
}
ClrMainContainerModule.decorators = [
    { type: NgModule, args: [{ imports: [CommonModule, ClrIconModule], declarations: [LAYOUT_DIRECTIVES], exports: [LAYOUT_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrMainContainerModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} existing
 * @return {?}
 */
function clrResponsiveNavigationProvider(existing) {
    return existing || new ClrResponsiveNavigationService();
}

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class MainContainerWillyWonka extends WillyWonka {
}
MainContainerWillyWonka.decorators = [
    { type: Directive, args: [{ selector: "clr-main-container" },] },
];
/**
 * @nocollapse
 */
MainContainerWillyWonka.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class NavDetectionOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} responsiveNavService
     */
    constructor(cdr, willyWonka, responsiveNavService) {
        if (!willyWonka) {
            throw new Error("clr-header should only be used inside of a clr-main-container");
        }
        super(cdr, willyWonka);
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.responsiveNavService.responsiveNavList.reduce((sum, navLevel) => sum + navLevel, 0);
    }
}
NavDetectionOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: "clr-header" },] },
];
/**
 * @nocollapse
 */
NavDetectionOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: MainContainerWillyWonka, decorators: [{ type: Optional },] },
    { type: ClrResponsiveNavigationService, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Header {
    /**
     * @param {?} responsiveNavService
     */
    constructor(responsiveNavService) {
        this.responsiveNavService = responsiveNavService;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: (navLevelList) => {
                this.initializeNavTriggers(navLevelList);
            }
        });
    }
    /**
     * @return {?}
     */
    get responsiveNavCodes() {
        return ClrResponsiveNavCodes;
    }
    /**
     * @return {?}
     */
    resetNavTriggers() {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    }
    /**
     * @param {?} navList
     * @return {?}
     */
    initializeNavTriggers(navList) {
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error("More than 2 Nav Levels detected.");
            return;
        }
        navList.forEach((navLevel) => {
            if (navLevel === ClrResponsiveNavCodes.NAV_LEVEL_1) {
                this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ClrResponsiveNavCodes.NAV_LEVEL_2) {
                this.isNavLevel2OnPage = true;
            }
        });
    }
    /**
     * @return {?}
     */
    closeOpenNav() {
        this.responsiveNavService.closeAllNavs();
    }
    /**
     * @param {?} navLevel
     * @return {?}
     */
    toggleNav(navLevel) {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_TOGGLE, navLevel);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
Header.decorators = [
    { type: Component, args: [{
                selector: "clr-header",
                template: `
        <button
            type="button"
            *ngIf="isNavLevel1OnPage"
            class="header-hamburger-trigger"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_1)">
            <span></span>
        </button>
        <ng-content></ng-content>
        <button
            type="button"
            *ngIf="isNavLevel2OnPage"
            class="header-overflow-trigger"
            (click)="toggleNav(responsiveNavCodes.NAV_LEVEL_2)">
            <span></span>
        </button>
        <div class="header-backdrop" (click)="closeOpenNav()"></div>
    `,
                host: { "[class.header]": "true" }
            },] },
];
/**
 * @nocollapse
 */
Header.ctorParameters = () => [
    { type: ClrResponsiveNavigationService, },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class NavLevelDirective {
    /**
     * @param {?} responsiveNavService
     * @param {?} elementRef
     */
    constructor(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.level !== ClrResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ClrResponsiveNavCodes.NAV_LEVEL_2) {
            console.error("Nav Level can only be 1 or 2");
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    }
    /**
     * @param {?} level
     * @return {?}
     */
    addNavClass(level) {
        const /** @type {?} */ navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ClrResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ClrResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ClrResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ClrResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    }
    /**
     * @return {?}
     */
    get level() {
        return this._level;
    }
    /**
     * @return {?}
     */
    get responsiveNavCodes() {
        return ClrResponsiveNavCodes;
    }
    /**
     * @return {?}
     */
    open() {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_OPEN, this.level);
    }
    /**
     * @return {?}
     */
    close() {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_CLOSE, this.level);
    }
    /**
     * @param {?} target
     * @return {?}
     */
    onMouseClick(target) {
        let /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
        const /** @type {?} */ navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
        // Start checking if current and navHost are equal.
        // If not traverse to the parentNode and check again.
        while (current) {
            if (current === navHost) {
                return;
            }
            else if (current.classList.contains("nav-link")) {
                this.close();
                return;
            }
            current = current.parentNode;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.responsiveNavService.unregisterNav(this.level);
    }
}
NavLevelDirective.decorators = [
    { type: Directive, args: [{ selector: "[clr-nav-level]" },] },
];
/**
 * @nocollapse
 */
NavLevelDirective.ctorParameters = () => [
    { type: ClrResponsiveNavigationService, },
    { type: ElementRef, },
];
NavLevelDirective.propDecorators = {
    '_level': [{ type: Input, args: ["clr-nav-level",] },],
    'onMouseClick': [{ type: HostListener, args: ["click", ["$event.target"],] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const NAVIGATION_DIRECTIVES = [Header, NavLevelDirective, NavDetectionOompaLoompa, MainContainerWillyWonka];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrNavigationModule {
}
ClrNavigationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [NAVIGATION_DIRECTIVES],
                providers: [{
                        provide: ClrResponsiveNavigationService,
                        useFactory: clrResponsiveNavigationProvider,
                        deps: [[new Optional(), new SkipSelf(), ClrResponsiveNavigationService]]
                    }],
                exports: [NAVIGATION_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrNavigationModule.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TemplateRefContainer {
}
TemplateRefContainer.decorators = [
    { type: Component, args: [{
                template: `
      <ng-template>
        <ng-content></ng-content>
      </ng-template>
    `,
            },] },
];
/**
 * @nocollapse
 */
TemplateRefContainer.ctorParameters = () => [];
TemplateRefContainer.propDecorators = {
    'template': [{ type: ViewChild, args: [TemplateRef,] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];

/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTemplateRefModule {
}
ClrTemplateRefModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TEMPLATE_REF_DIRECTIVES],
                entryComponents: [TEMPLATE_REF_DIRECTIVES],
                exports: [TEMPLATE_REF_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrTemplateRefModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TabsWillyWonka extends WillyWonka {
}
TabsWillyWonka.decorators = [
    { type: Directive, args: [{ selector: "clr-tabs" },] },
];
/**
 * @nocollapse
 */
TabsWillyWonka.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ActiveOompaLoompa extends OompaLoompa {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} id
     * @param {?} ifActive
     */
    constructor(cdr, willyWonka, id, ifActive) {
        if (!willyWonka) {
            throw new Error("clrTabLink and clr-tab-content should only be used inside of a clr-tabs");
        }
        super(cdr, willyWonka);
        this.ifActive = ifActive;
        this.id = id;
    }
    /**
     * @return {?}
     */
    get flavor() {
        return this.ifActive.current === this.id;
    }
}
ActiveOompaLoompa.decorators = [
    { type: Directive, args: [{ selector: "[clrTabLink], clr-tab-content" },] },
];
/**
 * @nocollapse
 */
ActiveOompaLoompa.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: TabsWillyWonka, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: IfActiveService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class AriaService {
}
AriaService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AriaService.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbTabContentComponents = 0;
class TabContent {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     */
    constructor(ifActiveService, id, ariaService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        if (!this.tabContentId) {
            this.tabContentId = "clr-tab-content-" + (nbTabContentComponents++);
        }
    }
    /**
     * @return {?}
     */
    get ariaLabelledBy() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @return {?}
     */
    get tabContentId() {
        return this.ariaService.ariaControls;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabContentId(id) {
        this.ariaService.ariaControls = id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
TabContent.decorators = [
    { type: Component, args: [{
                selector: "clr-tab-content",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[id]": "tabContentId",
                    "[attr.aria-labelledby]": "ariaLabelledBy",
                    "[attr.aria-hidden]": "!active",
                    "[attr.data-hidden]": "!active",
                    "role": "tabpanel"
                }
            },] },
];
/**
 * @nocollapse
 */
TabContent.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
];
TabContent.propDecorators = {
    'templateRef': [{ type: ViewChild, args: ["tabContentProjectedRef",] },],
    'tabContentId': [{ type: Input, args: ["id",] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let nbTabLinkComponents = 0;
class TabLinkDirective {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} el
     * @param {?} cfr
     * @param {?} viewContainerRef
     */
    constructor(ifActiveService, id, ariaService, el, cfr, viewContainerRef) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        this.el = el;
        this.cfr = cfr;
        this.viewContainerRef = viewContainerRef;
        if (!this.tabLinkId) {
            this.tabLinkId = "clr-tab-link-" + (nbTabLinkComponents++);
        }
        // Tab links can be rendered in one of two places: in the main area or inside the overflow dropdown menu.
        // Here, we create a container so that its template can be used to create embeddedView on the fly.
        // See TabsService's renderView() method and how it's used in Tabs class for an example.
        const factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer =
            this.viewContainerRef.createComponent(factory, 1, undefined, [[this.el.nativeElement]]).instance;
    }
    /**
     * @return {?}
     */
    get ariaControls() {
        return this.ariaService.ariaControls;
    }
    /**
     * @return {?}
     */
    get tabLinkId() {
        return this.ariaService.ariaLabelledBy;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    set tabLinkId(id) {
        this.ariaService.ariaLabelledBy = id;
    }
    /**
     * @return {?}
     */
    activate() {
        this.ifActiveService.current = this.id;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
TabLinkDirective.decorators = [
    { type: Directive, args: [{
                selector: "[clrTabLink]",
                host: {
                    "[id]": "tabLinkId",
                    "[attr.aria-selected]": "active",
                    "[attr.aria-controls]": "ariaControls",
                    "role": "presentation",
                    "[class.btn]": "true",
                    "[class.btn-link]": "!inOverflow",
                    "[class.nav-link]": "!inOverflow",
                    "[class.nav-item]": "!inOverflow",
                    "[class.active]": "active"
                }
            },] },
];
/**
 * @nocollapse
 */
TabLinkDirective.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
];
TabLinkDirective.propDecorators = {
    'inOverflow': [{ type: Input, args: ["clrTabLinkInOverflow",] },],
    'tabLinkId': [{ type: Input, args: ["id",] },],
    'activate': [{ type: HostListener, args: ["click",] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TabsService {
    constructor() {
        this._children = [];
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    register(tab) {
        this._children.push(tab);
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children;
    }
    /**
     * @return {?}
     */
    get activeTab() {
        return this.children.find((tab) => {
            return tab.active;
        });
    }
    /**
     * @return {?}
     */
    get overflowTabs() {
        return this.children.filter((tab) => {
            return tab.tabLink.inOverflow === true;
        });
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    unregister(tab) {
        const /** @type {?} */ index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }
}
TabsService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
TabsService.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Tab {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} tabsService
     */
    constructor(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabsService.unregister(this);
    }
    /**
     * @return {?}
     */
    get active() {
        return this.ifActiveService.current === this.id;
    }
}
Tab.decorators = [
    { type: Component, args: [{
                selector: "clr-tab",
                template: `
        <ng-content></ng-content>
    `,
                providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
            },] },
];
/**
 * @nocollapse
 */
Tab.ctorParameters = () => [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TabsService, },
];
Tab.propDecorators = {
    'tabLink': [{ type: ContentChild, args: [TabLinkDirective,] },],
    'tabContent': [{ type: ContentChild, args: [TabContent,] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TabOverflowContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        super(injector, parentHost);
        this.anchorPoint = Point.BOTTOM_RIGHT;
        this.popoverPoint = Point.RIGHT_TOP;
        this.closeOnOutsideClick = true;
    }
}
TabOverflowContent.decorators = [
    { type: Component, args: [{
                selector: "clr-tab-overflow-content",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[class.dropdown-menu]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
TabOverflowContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: SkipSelf },] },
];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Tabs {
    /**
     * @param {?} ifActiveService
     * @param {?} ifOpenService
     * @param {?} tabsService
     */
    constructor(ifActiveService, ifOpenService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
    }
    /**
     * @return {?}
     */
    get activeTabInOverflow() {
        return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (typeof this.ifActiveService.current === "undefined") {
            this.tabLinkDirectives.first.activate();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleOverflow(event) {
        this.ifOpenService.toggleWithEvent(event);
    }
}
Tabs.decorators = [
    { type: Component, args: [{
                selector: "clr-tabs",
                template: `        
        <ul class="nav" role="tablist">
            <!--tab links-->
            <ng-container *ngFor="let link of tabLinkDirectives">
                <ng-container *ngIf="!link.inOverflow"
                              [ngTemplateOutlet]="link.templateRefContainer.template">
                </ng-container>
            </ng-container>
            <ng-container *ngIf="tabsService.overflowTabs.length > 0">
                <div class="tabs-overflow bottom-right" [class.open]="ifOpenService.open" 
                     (click)="toggleOverflow($event)">
                    <li role="presentation" class="nav-item">
                        <button class="btn btn-link nav-link dropdown-toggle" [class.active]="activeTabInOverflow">
                            <clr-icon shape="ellipsis-horizontal" [class.is-info]="ifOpenService.open"></clr-icon>
                        </button>
                    </li>
                    <!--tab links in overflow menu-->
                    <clr-tab-overflow-content>
                        <ng-container *ngFor="let link of tabLinkDirectives">
                            <ng-container *ngIf="link.inOverflow"
                                          [ngTemplateOutlet]="link.templateRefContainer.template">
                            </ng-container>
                        </ng-container>
                    </clr-tab-overflow-content>
                </div>
            </ng-container>
        </ul>
        <!--tab content-->
        <ng-content></ng-content>
    `,
                providers: [IfActiveService, IfOpenService, TabsService]
            },] },
];
/**
 * @nocollapse
 */
Tabs.ctorParameters = () => [
    { type: IfActiveService, },
    { type: IfOpenService, },
    { type: TabsService, },
];
Tabs.propDecorators = {
    'tabLinkDirectives': [{ type: ContentChildren, args: [TabLinkDirective, { descendants: true },] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const TABS_DIRECTIVES = [TabContent, Tab, Tabs, TabOverflowContent, TabLinkDirective, TabsWillyWonka, ActiveOompaLoompa];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTabsModule {
}
ClrTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule, ClrConditionalModule, ClrIconModule, ClrTemplateRefModule],
                declarations: [TABS_DIRECTIVES],
                exports: [TABS_DIRECTIVES, ClrConditionalModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTabsModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavGroupRegistrationService {
    constructor() {
        this.navGroupCount = 0;
    }
    /**
     * @return {?}
     */
    registerNavGroup() {
        this.navGroupCount++;
    }
    /**
     * @return {?}
     */
    unregisterNavGroup() {
        this.navGroupCount--;
    }
}
VerticalNavGroupRegistrationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
VerticalNavGroupRegistrationService.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavIconService {
    constructor() {
        this._icons = 0;
    }
    /**
     * @return {?}
     */
    get hasIcons() {
        return this._icons > 0;
    }
    /**
     * @return {?}
     */
    registerIcon() {
        this._icons++;
    }
    /**
     * @return {?}
     */
    unregisterIcon() {
        this._icons--;
    }
}
VerticalNavIconService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
VerticalNavIconService.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavService {
    constructor() {
        this._animateOnCollapsed = new Subject$1();
        this._collapsedChanged = new Subject$1();
        this._collapsed = false;
        this._collapsible = false;
    }
    /**
     * @return {?}
     */
    get animateOnCollapsed() {
        return this._animateOnCollapsed.asObservable();
    }
    /**
     * @return {?}
     */
    get collapsedChanged() {
        return this._collapsedChanged.asObservable();
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        value = !!value;
        if (this.collapsible && (this._collapsed !== value)) {
            this.updateCollapseBehavior(value);
        }
    }
    /**
     * @return {?}
     */
    get collapsible() {
        return this._collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsible(value) {
        value = !!value;
        if (this._collapsible !== value) {
            if (!value && this.collapsed) {
                this.updateCollapseBehavior(false);
            }
            this._collapsible = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    updateCollapseBehavior(value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    }
}
VerticalNavService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
VerticalNavService.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNav {
    /**
     * @param {?} _navService
     * @param {?} _navIconService
     * @param {?} _navGroupRegistrationService
     */
    constructor(_navService, _navIconService, _navGroupRegistrationService) {
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._collapsedChanged = new EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(value => {
            this._collapsedChanged.emit(value);
        });
    }
    /**
     * @return {?}
     */
    get collapsible() {
        return this._navService.collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsible(value) {
        this._navService.collapsible = value;
    }
    /**
     * @return {?}
     */
    get collapsed() {
        return this._navService.collapsed;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collapsed(value) {
        this._navService.collapsed = value;
    }
    /**
     * @return {?}
     */
    get hasNavGroups() {
        return this._navGroupRegistrationService.navGroupCount > 0;
    }
    /**
     * @return {?}
     */
    get hasIcons() {
        return this._navIconService.hasIcons;
    }
    /**
     * @return {?}
     */
    toggleByButton() {
        this.collapsed = !this.collapsed;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sub.unsubscribe();
    }
}
VerticalNav.decorators = [
    { type: Component, args: [{
                selector: "clr-vertical-nav",
                template: `
      <button type="button" class="nav-trigger"
              [class.on-collapse]="collapsed"
              (click)="toggleByButton()"
              *ngIf="collapsible">
          <clr-icon shape="angle-double" class="nav-trigger-icon" [attr.dir]="(this.collapsed) ? 'right' : 'left'"></clr-icon>
      </button>
      <!-- Click handler on .nav-content is bad but required :-( -->
      <div class="nav-content">
          <ng-content></ng-content>
          <button (click)="collapsed = false" class="nav-btn" *ngIf="collapsible && collapsed"></button>
      </div>
    `,
                providers: [VerticalNavService, VerticalNavIconService, VerticalNavGroupRegistrationService],
                host: {
                    "class": "clr-vertical-nav",
                    "[class.is-collapsed]": "collapsed",
                    "[class.has-nav-groups]": "hasNavGroups",
                    "[class.has-icons]": "hasIcons"
                }
            },] },
];
/**
 * @nocollapse
 */
VerticalNav.ctorParameters = () => [
    { type: VerticalNavService, },
    { type: VerticalNavIconService, },
    { type: VerticalNavGroupRegistrationService, },
];
VerticalNav.propDecorators = {
    'collapsible': [{ type: Input, args: ["clrVerticalNavCollapsible",] },],
    'collapsed': [{ type: Input, args: ["clrVerticalNavCollapsed",] },],
    '_collapsedChanged': [{ type: Output, args: ["clrVerticalNavCollapsedChange",] },],
};

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavGroupService {
    constructor() {
        this._expandChange = new Subject$1();
    }
    /**
     * @return {?}
     */
    get expandChange() {
        return this._expandChange.asObservable();
    }
    /**
     * @return {?}
     */
    expand() {
        this._expandChange.next(true);
    }
}
VerticalNavGroupService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
VerticalNavGroupService.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const EXPANDED_STATE = "expanded";
const COLLAPSED_STATE = "collapsed";
class VerticalNavGroup {
    /**
     * @param {?} _itemExpand
     * @param {?} _navGroupRegistrationService
     * @param {?} _navGroupService
     * @param {?} _navService
     */
    constructor(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService) {
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.wasExpanded = false;
        this.expandedChange = new EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(value => {
            if (value && this.expandAnimationState === COLLAPSED_STATE) {
                if (this._navService.collapsed) {
                    this._navService.collapsed = false;
                }
                this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && this.expandAnimationState === EXPANDED_STATE) {
                this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe((goingToCollapse) => {
            if (goingToCollapse && this.expanded) {
                this.wasExpanded = true;
                this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && this.wasExpanded) {
                this.expandGroup();
                this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe((expand) => {
            if (expand && !this.expanded) {
                this.expandGroup();
            }
        }));
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._itemExpand.expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        if (this._itemExpand.expanded !== value) {
            this._itemExpand.expanded = value;
            this.expandedChange.emit(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set userExpandedInput(value) {
        value = !!value;
        if (this.expanded !== value) {
            // We have to call toggleExpand because some cases require animations to occur first
            // Directly setting the Expand service value skips the animation and can result in
            // nodes in the DOM but the nav group still being collapsed
            this.toggleExpand();
        }
    }
    /**
     * @return {?}
     */
    expandGroup() {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    }
    /**
     * @return {?}
     */
    collapseGroup() {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    expandAnimationDone($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    }
    /**
     * @return {?}
     */
    get expandAnimationState() {
        return this._expandAnimationState;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expandAnimationState(value) {
        if (value !== this._expandAnimationState) {
            this._expandAnimationState = value;
        }
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        if (this.expanded) {
            this.collapseGroup();
        }
        else {
            // If nav is collasped, first open the nav
            if (this._navService.collapsed) {
                this._navService.collapsed = false;
            }
            // then expand the nav group
            this.expandGroup();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this._navGroupRegistrationService.unregisterNavGroup();
    }
}
VerticalNavGroup.decorators = [
    { type: Component, args: [{
                selector: "clr-vertical-nav-group",
                template: `
      <div class="nav-group-content">
          <ng-content select="[clrVerticalNavLink]"></ng-content>
          <button
              class="nav-group-trigger"
              type="button"
              (click)="toggleExpand()">
              <ng-content select="[clrVerticalNavIcon]"></ng-content>
              <div class="nav-group-text">
                  <ng-content></ng-content>
              </div>
              <clr-icon shape="caret"
                        class="nav-group-trigger-icon"
                        [attr.dir]="(this.expanded) ? 'down' : 'right'">
              </clr-icon>
          </button>
      </div>
      <!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->
      <div class="nav-group-children"
           [@clrExpand]="expandAnimationState"
           (@clrExpand.done)="expandAnimationDone($event)">
          <ng-content select="[clrIfExpanded], clr-vertical-nav-group-children"></ng-content>
      </div>
    `,
                providers: [Expand, VerticalNavGroupService],
                animations: [trigger("clrExpand", [
                        state(EXPANDED_STATE, style({ "height": "*" })),
                        state(COLLAPSED_STATE, style({ "height": 0, "overflow-y": "hidden", "visibility": "hidden" })),
                        transition(`${EXPANDED_STATE} <=> ${COLLAPSED_STATE}`, animate("0.2s ease-in-out"))
                    ])],
                host: { "class": "nav-group" }
            },] },
];
/**
 * @nocollapse
 */
VerticalNavGroup.ctorParameters = () => [
    { type: Expand, },
    { type: VerticalNavGroupRegistrationService, },
    { type: VerticalNavGroupService, },
    { type: VerticalNavService, },
];
VerticalNavGroup.propDecorators = {
    'expanded': [{ type: HostBinding, args: ["class.is-expanded",] },],
    'userExpandedInput': [{ type: Input, args: ["clrVerticalNavGroupExpanded",] },],
    'expandedChange': [{ type: Output, args: ["clrVerticalNavGroupExpandedChange",] },],
};

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavGroupChildren {
}
VerticalNavGroupChildren.decorators = [
    { type: Component, args: [{
                selector: "clr-vertical-nav-group-children",
                template: `
        <ng-content></ng-content>
    `
            },] },
];
/**
 * @nocollapse
 */
VerticalNavGroupChildren.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavIcon {
    /**
     * @param {?} _verticalNavIconService
     */
    constructor(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._verticalNavIconService.unregisterIcon();
    }
}
VerticalNavIcon.decorators = [
    { type: Directive, args: [{ selector: "[clrVerticalNavIcon]", host: { "class": "nav-icon" } },] },
];
/**
 * @nocollapse
 */
VerticalNavIcon.ctorParameters = () => [
    { type: VerticalNavIconService, },
];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class VerticalNavLink {
    /**
     * @param {?} _navGroupService
     */
    constructor(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    /**
     * @return {?}
     */
    expandParentNavGroup() {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    }
}
VerticalNavLink.decorators = [
    { type: Component, args: [{
                selector: "[clrVerticalNavLink]",
                template: `
        <ng-content select="[clrVerticalNavIcon]"></ng-content>
        <span class="nav-text">
            <ng-content></ng-content>    
        </span>
    `,
                host: { "class": "nav-link" }
            },] },
];
/**
 * @nocollapse
 */
VerticalNavLink.ctorParameters = () => [
    { type: VerticalNavGroupService, decorators: [{ type: Optional },] },
];
VerticalNavLink.propDecorators = {
    'expandParentNavGroup': [{ type: HostListener, args: ["click",] },],
};

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const VERTICAL_NAV_DIRECTIVES = [VerticalNav, VerticalNavLink, VerticalNavGroup, VerticalNavGroupChildren, VerticalNavIcon];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrVerticalNavModule {
}
ClrVerticalNavModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrIfExpandModule],
                declarations: [VERTICAL_NAV_DIRECTIVES],
                exports: [VERTICAL_NAV_DIRECTIVES, ClrIfExpandModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrVerticalNavModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrLayoutModule {
}
ClrLayoutModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] },
];
/**
 * @nocollapse
 */
ClrLayoutModule.ctorParameters = () => [];

/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class FocusTrapTracker {
    constructor() {
        this._previousFocusTraps = [];
    }
    /**
     * @return {?}
     */
    get current() {
        return this._current;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set current(value) {
        this._previousFocusTraps.push(this._current);
        this._current = value;
    }
    /**
     * @return {?}
     */
    activatePreviousTrapper() {
        this._current = this._previousFocusTraps.pop();
    }
}
FocusTrapTracker.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
FocusTrapTracker.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class FocusTrapDirective {
    /**
     * @param {?} elementRef
     * @param {?} injector
     * @param {?} focusTrapsTracker
     * @param {?} platformId
     */
    constructor(elementRef, injector, focusTrapsTracker, platformId) {
        this.elementRef = elementRef;
        this.focusTrapsTracker = focusTrapsTracker;
        this.platformId = platformId;
        this.document = injector.get(DOCUMENT);
        this.focusTrapsTracker.current = this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onFocusIn(event) {
        const /** @type {?} */ nativeElement = this.elementRef.nativeElement;
        if (this.focusTrapsTracker.current === this && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this._previousActiveElement = (document.activeElement);
            const /** @type {?} */ nativeElement = this.elementRef.nativeElement;
            nativeElement.setAttribute("tabindex", "0");
        }
    }
    /**
     * @return {?}
     */
    setPreviousFocus() {
        if (this._previousActiveElement && this._previousActiveElement.focus) {
            this._previousActiveElement.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    }
}
FocusTrapDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrFocusTrap]" },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
    { type: FocusTrapTracker, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
FocusTrapDirective.propDecorators = {
    'onFocusIn': [{ type: HostListener, args: ["document:focusin", ["$event"],] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];

/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrFocusTrapModule {
}
ClrFocusTrapModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [FocusTrapTracker],
                declarations: [FOCUS_TRAP_DIRECTIVES],
                exports: [FOCUS_TRAP_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrFocusTrapModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ScrollingService {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    stopScrolling() {
        this._document.body.classList.add("no-scrolling");
    }
    /**
     * @return {?}
     */
    resumeScrolling() {
        if (this._document.body.classList.contains("no-scrolling")) {
            this._document.body.classList.remove("no-scrolling");
        }
    }
}
ScrollingService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScrollingService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT$1,] },] },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const GHOST_PAGE_ANIMATION = {
    STATES: { NO_PAGES: "inactive", ALL_PAGES: "ready", NEXT_TO_LAST_PAGE: "penultimateGhost", LAST_PAGE: "lastGhost" },
    TRANSITIONS: { IN: "100ms ease-out", OUT: "100ms ease-in" }
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Modal {
    /**
     * @param {?} _scrollingService
     */
    constructor(_scrollingService) {
        this._scrollingService = _scrollingService;
        this._open = false;
        this._openChanged = new EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = false;
        this.skipAnimation = "false";
        // presently this is only used by wizards
        this.ghostPageState = "hidden";
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get sizeClass() {
        if (this.size) {
            return "modal-" + this.size;
        }
        else {
            return "";
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty("_open")) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._scrollingService.resumeScrolling();
    }
    /**
     * @return {?}
     */
    open() {
        if (this._open === true) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    }
    /**
     * @return {?}
     */
    close() {
        if (this.stopClose) {
            this.altClose.emit(false);
            return;
        }
        if (!this.closable || this._open === false) {
            return;
        }
        this._open = false;
        // todo: remove this after animation bug is fixed https://github.com/angular/angular/issues/15798
        // this was handled by the fadeDone event below, but that AnimationEvent is not firing in Angular 4.0.
        this._openChanged.emit(false);
        // SPECME
        this.focusTrap.setPreviousFocus(); // Handles moving focus back to the element that had it before.
    }
    /**
     * @param {?} e
     * @return {?}
     */
    fadeDone(e) {
        if (e.toState === "void") {
            this._openChanged.emit(false);
        }
    }
}
Modal.decorators = [
    { type: Component, args: [{
                selector: "clr-modal",
                viewProviders: [ScrollingService],
                template: `

      <!--
        ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
        ~ This software is released under MIT license.
        ~ The full license information can be found in LICENSE in the root directory of this project.
        -->

      <div clrFocusTrap class="modal" *ngIf="_open">
          <!--fixme: revisit when ngClass works with exit animation-->
          <div [@fadeDown]="skipAnimation" (@fadeDown.done)="fadeDone($event)"
               class="modal-dialog"
               [class.modal-sm]="size == 'sm'"
               [class.modal-lg]="size == 'lg'"
               [class.modal-xl]="size == 'xl'"
               role="dialog" aria-hidden="true">

              <div class="modal-outer-wrapper">
                  <div class="modal-content-wrapper">
                      <!-- only used in wizards -->
                      <ng-content select=".modal-nav"></ng-content>

                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" aria-label="Close"
                                      *ngIf="closable" (click)="close()">
                                  <clr-icon aria-hidden="true" shape="close"></clr-icon>
                              </button>
                              <ng-content select=".modal-title"></ng-content>
                          </div>
                          <ng-content select=".modal-body"></ng-content>
                          <ng-content select=".modal-footer"></ng-content>
                      </div>
                  </div>
                  <div class="modal-ghost-wrapper">
                      <div [@ghostPageOneState]="ghostPageState" class="modal-ghost modal-ghost-1"></div>
                      <div [@ghostPageTwoState]="ghostPageState" class="modal-ghost modal-ghost-2"></div>
                  </div>
              </div>
          </div>

          <div [@fade] class="modal-backdrop"
               aria-hidden="true"
               (click)="staticBackdrop || close()"></div>
      </div>
    `,
                styles: [`
        :host { display: inline-block; }
    `],
                animations: [
                    trigger("fadeDown", [
                        transition("* => false", [style({ opacity: 0, transform: "translate(0, -25%)" }), animate("0.2s ease-in-out")]),
                        transition("false => *", [animate("0.2s ease-in-out", style({ opacity: 0, transform: "translate(0, -25%)" }))])
                    ]),
                    trigger("fade", [
                        transition("void => *", [style({ opacity: 0 }), animate("0.2s ease-in-out", style({ opacity: 0.85 }))]),
                        transition("* => void", [animate("0.2s ease-in-out", style({ opacity: 0 }))])
                    ]),
                    trigger("ghostPageOneState", [
                        state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, style({ left: "-24px" })),
                        state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, style({ left: "0" })),
                        state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, style({ left: "-24px" })),
                        state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, style({ left: "-24px" })),
                        transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT))
                    ]),
                    // TODO: USE TRANSFORM, NOT LEFT...
                    trigger("ghostPageTwoState", [
                        state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, style({ left: "-24px", top: "24px", bottom: "24px" })),
                        state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, style({ left: "24px" })),
                        state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, style({ left: "0px", top: "24px", bottom: "24px", background: "#bbb" })),
                        state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, style({ left: "-24px", top: "24px", bottom: "24px" })),
                        transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + " => *", animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT))
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
Modal.ctorParameters = () => [
    { type: ScrollingService, },
];
Modal.propDecorators = {
    'focusTrap': [{ type: ViewChild, args: [FocusTrapDirective,] },],
    '_open': [{ type: Input, args: ["clrModalOpen",] },],
    '_openChanged': [{ type: Output, args: ["clrModalOpenChange",] },],
    'closable': [{ type: Input, args: ["clrModalClosable",] },],
    'size': [{ type: Input, args: ["clrModalSize",] },],
    'staticBackdrop': [{ type: Input, args: ["clrModalStaticBackdrop",] },],
    'skipAnimation': [{ type: Input, args: ["clrModalSkipAnimation",] },],
    'ghostPageState': [{ type: Input, args: ["clrModalGhostPageState",] },],
    'bypassScrollService': [{ type: Input, args: ["clrModalOverrideScrollService",] },],
    'stopClose': [{ type: Input, args: ["clrModalPreventClose",] },],
    'altClose': [{ type: Output, args: ["clrModalAlternateClose",] },],
    'close': [{ type: HostListener, args: ["body:keyup.escape",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const MODAL_DIRECTIVES = [Modal];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrModalModule {
}
ClrModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [MODAL_DIRECTIVES],
                exports: [MODAL_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrModalModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const SIGNPOST_POSITIONS = {
    "top-left": { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_RIGHT, offsetY: -10, offsetX: 0 },
    "top-middle": { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_CENTER, offsetY: -10, offsetX: 0 },
    "top-right": { anchorPoint: Point.TOP_CENTER, popoverPoint: Point.BOTTOM_LEFT, offsetY: -10, offsetX: 0 },
    "right-top": { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_BOTTOM, offsetY: 2, offsetX: 14 },
    "right-middle": { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
    "right-bottom": { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_TOP, offsetY: -1, offsetX: 14 },
    "bottom-right": { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_LEFT, offsetY: 9, offsetX: -1 },
    "bottom-middle": { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_CENTER, offsetY: 9, offsetX: 12 },
    "bottom-left": { anchorPoint: Point.BOTTOM_CENTER, popoverPoint: Point.TOP_RIGHT, offsetY: 9, offsetX: 0 },
    "left-bottom": { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_TOP, offsetY: 0, offsetX: -14 },
    "left-middle": { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_CENTER, offsetY: 4, offsetX: -14 },
    "left-top": { anchorPoint: Point.LEFT_CENTER, popoverPoint: Point.RIGHT_BOTTOM, offsetY: 0, offsetX: -14 },
    "default": { anchorPoint: Point.RIGHT_CENTER, popoverPoint: Point.LEFT_CENTER, offsetY: 6, offsetX: 14 },
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// aka where the arrow / pointer is at in relation to the anchor
const POSITIONS = [
    "top-left",
    "top-middle",
    "top-right",
    "right-top",
    "right-middle",
    "right-bottom",
    "bottom-right",
    "bottom-middle",
    "bottom-left",
    "left-bottom",
    "left-middle",
    "left-top",
];
class SignpostContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        if (!parentHost) {
            throw new Error("clr-signpost-content should only be used inside of a clr-signpost");
        }
        super(injector, parentHost);
        // Defaults
        this.position = "right-middle";
        this.closeOnOutsideClick = true;
    }
    /**
     * *******
     * \@function close
     *
     * \@description
     * Close function that uses the signpost instance to toggle the state of the content popover.
     *
     * @return {?}
     */
    close() {
        this.ifOpenService.open = false;
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * ******
     * \@function set position
     *
     * \@description
     * A setter for the position of the SignpostContent popover. This is a combination of the following:
     * - anchorPoint - where on the trigger to anchor the SignpostContent
     * - popoverPoint - where on the SignpostContent container to align with the anchorPoint
     * - offsetY - where on the Y axis to align the SignpostContent so it meets specs
     * - offsetX - where on the X axis to align the SignpostContent so it meets specs
     * There are 12 possible positions to place a SignpostContent container:
     * - top-left
     * - top-middle
     * - top-right
     * - right-top
     * - right-middle
     * - right-bottom
     * - bottom-right
     * - bottom-middle
     * - bottom-left
     * - left-bottom
     * - left-middle
     * - left-top
     *
     * I think of it as follows for 'top-left' -> CONTAINER_SIDE-SIDE_POSITION. In this case CONTAINER_SIDE is 'top'
     * meaning the top of the trigger icon (above the icon that hides/shows) the SignpostContent. And, SIDE_POSITION is
     * 'left' meaning two things: 1) the SignpostContent container extends to the left and 2) the 'arrow/pointer'
     * linking the SingpostContent to the trigger points down at the horizontal center of the trigger icon.
     *
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, this.position);
        if (position && (POSITIONS.indexOf(position) > -1)) {
            this._position = position;
        }
        else {
            this._position = "right-middle";
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, this.position);
        const /** @type {?} */ setPosition = SIGNPOST_POSITIONS[this.position];
        this.anchorPoint = setPosition.anchorPoint;
        this.popoverPoint = setPosition.popoverPoint;
        this.popoverOptions.offsetY = setPosition.offsetY;
        this.popoverOptions.offsetX = setPosition.offsetX;
    }
}
SignpostContent.decorators = [
    { type: Component, args: [{
                selector: "clr-signpost-content",
                template: `
        <div class="signpost-flex-wrap">
            <div class="popover-pointer"></div>
            <div class="signpost-content-header">
                <button type="button" class="signpost-action close" aria-label="Close" (click)="close()">
                    <clr-icon aria-hidden="true" shape="close"></clr-icon>
                </button>
            </div>
            <div class="signpost-content-body">
                <ng-content></ng-content>
            </div>
        </div>
    `,
                host: { "[class.signpost-content]": "true" }
            },] },
];
/**
 * @nocollapse
 */
SignpostContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
];
SignpostContent.propDecorators = {
    'position': [{ type: Input, args: ["clrPosition",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const SIGNPOST_DIRECTIVES = [Signpost, SignpostContent, SignpostTriggerDirective];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrSignpostModule {
}
ClrSignpostModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule, ClrIconModule],
                declarations: [SIGNPOST_DIRECTIVES],
                exports: [SIGNPOST_DIRECTIVES, ClrConditionalModule],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
ClrSignpostModule.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class Tooltip {
}
Tooltip.decorators = [
    { type: Component, args: [{
                selector: "clr-tooltip",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[class.tooltip]": "true",
                },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Tooltip.ctorParameters = () => [];

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const POSITIONS$1 = ["bottom-left", "bottom-right", "top-left", "top-right", "right", "left"];
const SIZES = ["xs", "sm", "md", "lg"];
class TooltipContent extends AbstractPopover {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    constructor(injector, parentHost) {
        if (!parentHost) {
            throw new Error("clr-tooltip-content should only be used inside of a clr-tooltip");
        }
        super(injector, parentHost);
        // Defaults
        this.position = "right";
        this.size = "sm";
    }
    /**
     * @return {?}
     */
    get position() {
        return this._position;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, "tooltip-" + this.position);
        if (position && (POSITIONS$1.indexOf(position) > -1)) {
            this._position = position;
        }
        else {
            this._position = "right";
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, "tooltip-" + this.position);
        // set the popover values based on direction
        switch (position) {
            case ("top-right"):
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.LEFT_BOTTOM;
                break;
            case ("top-left"):
                this.anchorPoint = Point.TOP_CENTER;
                this.popoverPoint = Point.RIGHT_BOTTOM;
                break;
            case ("bottom-right"):
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("bottom-left"):
                this.anchorPoint = Point.BOTTOM_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            case ("right"):
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
            case ("left"):
                this.anchorPoint = Point.LEFT_CENTER;
                this.popoverPoint = Point.RIGHT_TOP;
                break;
            default:
                this.anchorPoint = Point.RIGHT_CENTER;
                this.popoverPoint = Point.LEFT_TOP;
                break;
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        // Ugh
        this.renderer.removeClass(this.el.nativeElement, "tooltip-" + this.size);
        if (size && (SIZES.indexOf(size) > -1)) {
            this._size = size;
        }
        else {
            this._size = "sm";
        }
        // Ugh
        this.renderer.addClass(this.el.nativeElement, "tooltip-" + this.size);
    }
}
TooltipContent.decorators = [
    { type: Component, args: [{
                selector: "clr-tooltip-content",
                template: `
        <ng-content></ng-content>
    `,
                host: {
                    "[class.tooltip-content]": "true",
                    // I'm giving up on animation, they did not work before and will not work now.
                    // Too many conflicts with Clarity UI.
                    "[style.opacity]": "1"
                }
            },] },
];
/**
 * @nocollapse
 */
TooltipContent.ctorParameters = () => [
    { type: Injector, },
    { type: ElementRef, decorators: [{ type: Optional }, { type: Inject, args: [POPOVER_HOST_ANCHOR,] },] },
];
TooltipContent.propDecorators = {
    'position': [{ type: Input, args: ["clrPosition",] },],
    'size': [{ type: Input, args: ["clrSize",] },],
};

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class TooltipTrigger {
    /**
     * @param {?} ifOpenService
     */
    constructor(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    /**
     * @return {?}
     */
    showTooltip() {
        this.ifOpenService.open = true;
    }
    /**
     * @return {?}
     */
    hideTooltip() {
        this.ifOpenService.open = false;
    }
}
TooltipTrigger.decorators = [
    { type: Directive, args: [{ selector: "[clrTooltipTrigger]", host: { "[attr.tabindex]": "0" } },] },
];
/**
 * @nocollapse
 */
TooltipTrigger.ctorParameters = () => [
    { type: IfOpenService, },
];
TooltipTrigger.propDecorators = {
    'showTooltip': [{ type: HostListener, args: ["mouseenter",] }, { type: HostListener, args: ["focus",] },],
    'hideTooltip': [{ type: HostListener, args: ["mouseleave",] }, { type: HostListener, args: ["blur",] },],
};

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const TOOLTIP_DIRECTIVES = [Tooltip, TooltipTrigger, TooltipContent];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrTooltipModule {
}
ClrTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrCommonPopoverModule],
                declarations: [TOOLTIP_DIRECTIVES],
                exports: [TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTooltipModule.ctorParameters = () => [];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrPopoverModule {
}
ClrPopoverModule.decorators = [
    { type: NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] },
];
/**
 * @nocollapse
 */
ClrPopoverModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardPageButtonsDirective {
    /**
     * @param {?} pageButtonsTemplateRef
     */
    constructor(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
}
WizardPageButtonsDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrPageButtons]" },] },
];
/**
 * @nocollapse
 */
WizardPageButtonsDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardPageHeaderActionsDirective {
    /**
     * @param {?} pageHeaderActionsTemplateRef
     */
    constructor(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
}
WizardPageHeaderActionsDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrPageHeaderActions]" },] },
];
/**
 * @nocollapse
 */
WizardPageHeaderActionsDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardPageNavTitleDirective {
    /**
     * @param {?} pageNavTitleTemplateRef
     */
    constructor(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
}
WizardPageNavTitleDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrPageNavTitle]" },] },
];
/**
 * @nocollapse
 */
WizardPageNavTitleDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardPageTitleDirective {
    /**
     * @param {?} pageTitleTemplateRef
     */
    constructor(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
}
WizardPageTitleDirective.decorators = [
    { type: Directive, args: [{ selector: "[clrPageTitle]" },] },
];
/**
 * @nocollapse
 */
WizardPageTitleDirective.ctorParameters = () => [
    { type: TemplateRef, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ButtonHubService {
    constructor() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject$1();
        this._nextBtnClicked = new Subject$1();
        this._dangerBtnClicked = new Subject$1();
        this._cancelBtnClicked = new Subject$1();
        this._finishBtnClicked = new Subject$1();
        this._customBtnClicked = new Subject$1();
    }
    /**
     * @return {?}
     */
    get previousBtnClicked() {
        return this._previousBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get nextBtnClicked() {
        return this._nextBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get dangerBtnClicked() {
        return this._dangerBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get cancelBtnClicked() {
        return this._cancelBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get finishBtnClicked() {
        return this._finishBtnClicked.asObservable();
    }
    /**
     * @return {?}
     */
    get customBtnClicked() {
        return this._customBtnClicked.asObservable();
    }
    /**
     * @param {?} buttonType
     * @return {?}
     */
    buttonClicked(buttonType) {
        if ("previous" === buttonType) {
            this._previousBtnClicked.next();
        }
        else if ("next" === buttonType) {
            this._nextBtnClicked.next();
        }
        else if ("finish" === buttonType) {
            this._finishBtnClicked.next();
        }
        else if ("danger" === buttonType) {
            this._dangerBtnClicked.next();
        }
        else if ("cancel" === buttonType) {
            this._cancelBtnClicked.next();
        }
        else {
            this._customBtnClicked.next(buttonType);
        }
    }
}
ButtonHubService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ButtonHubService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * PageCollectionService manages the collection of pages assigned to the wizard and offers
 * a number of functions useful across the wizards providers and subcomponents -- all related
 * to essentially lookups on the collection of pages.
 *
 * The easiest way to access PageCollectionService is via the wizard. The
 * following example would allow you to access your instance of the wizard from your host
 * component and thereby access the page collection via YourHostComponent.wizard.pageCollection.
 *
 * \@example
 * <clr-wizard #wizard ...>
 *
 * \@example
 * export class YourHostComponent {
 *   \@ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 * The heart of the page collection is the query list of pages, which it is assigned as a
 * reference to the Wizard.pages QueryList when the wizard is created.
 *
 * @export
 * \@class PageCollectionService
 */
class PageCollectionService {
    constructor() {
        /**
         *
         *
         * \@memberof PageCollectionService
         */
        this._pagesReset = new Subject$1();
    }
    /**
     * Converts the PageCollectionService.pages QueryList to an array and returns it.
     *
     * Useful for many instances when you would prefer a QueryList to act like an array.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesAsArray() {
        return this.pages ? this.pages.toArray() : [];
    }
    /**
     * Returns the length of the pages query list.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesCount() {
        return this.pages ? this.pages.length : 0;
    }
    /**
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get penultimatePage() {
        const /** @type {?} */ pageCount = this.pagesCount;
        if (pageCount < 2) {
            return;
        }
        return this.pagesAsArray[pageCount - 2];
    }
    /**
     * Returns the last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get lastPage() {
        const /** @type {?} */ pageCount = this.pagesCount;
        if (pageCount < 1) {
            return;
        }
        return this.pagesAsArray[pageCount - 1];
    }
    /**
     * Returns the first page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get firstPage() {
        if (!this.pagesCount) {
            return;
        }
        return this.pagesAsArray[0];
    }
    /**
     * Used mostly internally, but accepts a string ID and returns a WizardPage
     * object that matches the ID passed. Note that IDs here should include the prefix
     * "clr-wizard-page-".
     *
     * Returns the next-to-last page in the query list of pages. Operates as a getter
     * so that it isn't working with stale data.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @param {?} id
     * @return {?}
     */
    getPageById(id) {
        const /** @type {?} */ foundPages = this.pages.filter((page) => id === page.id);
        return this.checkResults(foundPages, id);
    }
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} index
     * @return {?}
     */
    getPageByIndex(index) {
        const /** @type {?} */ pageCount = this.pagesCount;
        const /** @type {?} */ pagesLastIndex = (pageCount > 1) ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error("Cannot retrieve page with index of " + index);
        }
        if (index > pagesLastIndex) {
            throw new Error("Page index is greater than length of pages array.");
        }
        return this.pagesAsArray[index];
    }
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getPageIndex(page) {
        const /** @type {?} */ index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error("Requested page cannot be found in collection of pages.");
        }
        return index;
    }
    /**
     * Consolidates guard logic that prevents a couple of unfortunate edge cases with
     * look ups on the collection of pages.
     *
     * \@memberof PageCollectionService
     * @param {?} results
     * @param {?} requestedPageId
     * @return {?}
     *
     */
    checkResults(results, requestedPageId) {
        const /** @type {?} */ foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error("More than one page has the requested id " + requestedPageId + ".");
        }
        else if (foundPagesCount < 1) {
            throw new Error("No page can be found with the id " + requestedPageId + ".");
        }
        else {
            return results[0];
        }
    }
    /**
     * Accepts two numeric indexes and returns an array of wizard page objects that include
     * all wizard pages in the page collection from the first index to the second.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    pageRange(start, end) {
        let /** @type {?} */ pages = [];
        if (start < 0 || end < 0) {
            return [];
        }
        if (start === null || typeof start === undefined || isNaN(start)) {
            return [];
        }
        if (end === null || typeof end === undefined || isNaN(end)) {
            return [];
        }
        if (end > this.pagesCount) {
            end = this.pagesCount;
        }
        pages = this.pagesAsArray;
        if ((end - start) === 0) {
            // just return the one page they want
            return [this.getPageByIndex(start)];
        }
        // slice end does not include item referenced by end index, which is weird for users
        // incrementing end index here to correct that so users and other methods
        // don't have to think about it
        end = end + 1;
        // slice does not return the last one in the range but it does include the first one
        // does not modify original array
        return pages.slice(start, end);
    }
    /**
     * Accepts two wizard page objects and returns those page objects with all other page
     * objects between them in the page collection. It doesn't care which page is ahead of the
     * other in the parameters. It will be smart enough to figure that out  on its own.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @param {?} otherPage
     * @return {?}
     */
    getPageRangeFromPages(page, otherPage) {
        const /** @type {?} */ pageIndex = this.getPageIndex(page);
        const /** @type {?} */ otherPageIndex = this.getPageIndex(otherPage);
        let /** @type {?} */ startIndex;
        let /** @type {?} */ endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately before it in the page collection. Returns null if there is
     * no page before the page it is passed.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getPreviousPage(page) {
        const /** @type {?} */ myPageIndex = this.getPageIndex(page);
        const /** @type {?} */ previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    }
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    previousPageIsCompleted(page) {
        let /** @type {?} */ previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    }
    /**
     * Takes a wizard page object as a parameter and returns the wizard page object of
     * the page immediately after it in the page collection. Returns null if there is
     * no page after the page it is passed.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getNextPage(page) {
        const /** @type {?} */ myPageIndex = this.getPageIndex(page);
        const /** @type {?} */ nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    }
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    getStepItemIdForPage(page) {
        const /** @type {?} */ pageId = page.id;
        const /** @type {?} */ pageIdParts = pageId.split("-").reverse();
        pageIdParts[1] = "step";
        return pageIdParts.reverse().join("-");
    }
    /**
     * Generally only used internally to mark that a specific page has been "committed".
     * This involves marking the page complete and firing the WizardPage.onCommit
     * (clrWizardPageOnCommit) output. Takes the wizard page object that you intend to
     * mark completed as a parameter.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    commitPage(page) {
        const /** @type {?} */ pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    }
    /**
     * An observable that the navigation service listens to in order to know when
     * the page collection completed states have been reset to false so that way it
     * can also reset the navigation to make the first page in the page collection
     * current/active.
     *
     * \@readonly
     * \@memberof PageCollectionService
     * @return {?}
     */
    get pagesReset() {
        return this._pagesReset.asObservable();
    }
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    reset() {
        this.pagesAsArray.forEach((page) => {
            page.completed = false;
        });
        this._pagesReset.next(true);
    }
    /**
     * Rolls through all the pages in the page collection to make sure there are no
     * incomplete pages sandwiched between completed pages in the workflow. Identifies
     * the first incomplete page index and sets all pages behind it to a completed
     * state of false.
     *
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    updateCompletedStates() {
        const /** @type {?} */ firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach((page, index) => {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    }
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    findFirstIncompletePageIndex() {
        let /** @type {?} */ returnIndex = null;
        this.pagesAsArray.forEach((page, index) => {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    }
    /**
     * @return {?}
     */
    findFirstIncompletePage() {
        const /** @type {?} */ myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    }
}
PageCollectionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
PageCollectionService.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Performs navigation functions for a wizard and manages the current page. Presented as a
 * separate service to encapsulate the behavior of navigating and completing the wizard so
 * that it can be shared across the wizard and its sub-components.
 *
 * The easiest way to access the navigation service is there a reference on your wizard. The
 * Following example would allow you to access your instance of the wizard from your host
 * component and thereby access the navigation service via YourHostComponent.wizard.navService.
 *
 * \@example
 * <clr-wizard #wizard ...>
 *
 * \@example
 * export class YourHostComponent {
 *   \@ViewChild("wizard") wizard: Wizard;
 *   ...
 * }
 *
 * @export
 * \@class WizardNavigationService
 */
class WizardNavigationService {
    /**
     * Creates an instance of WizardNavigationService. Also sets up subscriptions
     * that listen to the button service to determine when a button has been clicked
     * in the wizard. Is also responsible for taking action when the page collection
     * requests that navigation be reset to its pristine state.
     *
     *
     * \@memberof WizardNavigationService
     * @param {?} pageCollection
     * @param {?} buttonService
     */
    constructor(pageCollection, buttonService) {
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._currentChanged = new Subject$1();
        /**
         * A Boolean flag used by the WizardPage to avoid a race condition when pages are
         * loading and there is no current page defined.
         *
         * \@memberof WizardNavigationService
         */
        this.navServiceLoaded = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.forceForward (clrWizardForceForwardNavigation) input. When true,
         * navigating backwards in the stepnav menu will reset any skipped pages' completed
         * state to false.
         *
         * This is useful when a wizard executes validation on a page-by-page basis when
         * the next button is clicked.
         *
         * \@memberof WizardNavigationService
         */
        this.forceForwardNavigation = false;
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._movedToNextPage = new Subject$1();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._wizardFinished = new Subject$1();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject$1();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._cancelWizard = new Subject$1();
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopCancel (clrWizardPreventDefaultCancel) input. When true, the cancel
         * routine is subverted and must be reinstated in the host component calling Wizard.close()
         * at some point.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardHasAltCancel = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNext (clrWizardPreventDefaultNext) input. When true, the next and finish
         * routines are subverted and must be reinstated in the host component calling Wizard.next(),
         * Wizard.forceNext(), Wizard.finish(), or Wizard.forceFinish().
         *
         * \@memberof WizardNavigationService
         */
        this.wizardHasAltNext = false;
        /**
         * A boolean flag shared across the Wizard subcomponents that follows the value
         * of the Wizard.stopNavigation (clrWizardPreventNavigation) input. When true, all
         * navigational elements in the wizard are disabled.
         *
         * This is intended to freeze the wizard in place. Events are not fired so this is
         * not a way to implement alternate functionality for navigation.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardStopNavigation = false;
        /**
         * A boolean flag shared with the stepnav items that prevents user clicks on
         * stepnav items from navigating the wizard.
         *
         * \@memberof WizardNavigationService
         */
        this.wizardDisableStepnav = false;
        /**
         *
         * \@ignore
         * \@memberof WizardNavigationService
         */
        this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
        /**
         *
         * \@ignore
         * \@memberof WizardNavigationService
         */
        this._hideWizardGhostPages = true;
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(() => {
            const currentPage = this.currentPage;
            if (this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage("next");
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage("danger");
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(() => {
            this.checkAndCommitCurrentPage("finish");
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe((type) => {
            if (!this.wizardStopNavigation) {
                this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(() => {
            if (this.wizardStopNavigation) {
                return;
            }
            if (this.currentPage.preventDefault) {
                this.currentPage.pageOnCancel.emit(this.currentPage);
            }
            else {
                this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(() => {
            this.setFirstPageCurrent();
        });
    }
    /**
     *
     * \@ignore
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    ngOnDestroy() {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    }
    /**
     * An Observable that is predominantly used amongst the subcomponents and services
     * of the wizard. It is recommended that users listen to the WizardPage.onLoad
     * (clrWizardPageOnLoad) output instead of this Observable.
     *
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageChanged() {
        // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
        // A BREAKING CHANGE SO AWAITING MINOR RELEASE
        return this._currentChanged.asObservable();
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageTitle() {
        // when the querylist of pages is empty. this is the first place it fails...
        if (!this.currentPage) {
            return null;
        }
        return this.currentPage.title;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the first
     * page in the Wizard.
     *
     * This is helpful for determining whether a page is navigable.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsFirst() {
        return this.pageCollection.firstPage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * next to last page in the Wizard.
     *
     * This is used to determine the animation state of ghost pages.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsNextToLast() {
        return this.pageCollection.penultimatePage === this.currentPage;
    }
    /**
     * Returns a Boolean that tells you whether or not the current page is the
     * last page in the Wizard.
     *
     * This is used to determine the animation state of ghost pages as well as
     * which buttons should display in the wizard footer.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPageIsLast() {
        return this.pageCollection.lastPage === this.currentPage;
    }
    /**
     * Returns the WizardPage object of the current page or null.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get currentPage() {
        if (!this._currentPage) {
            return null;
        }
        return this._currentPage;
    }
    /**
     * Accepts a WizardPage object, since that object to be the current/active
     * page in the wizard, and emits the WizardPage.onLoad (clrWizardPageOnLoad)
     * event for that page.
     *
     * Note that all of this work is bypassed if the WizardPage object is already
     * the current page.
     *
     * \@memberof WizardNavigationService
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        if (this._currentPage !== page && !this.wizardStopNavigation) {
            this._currentPage = page;
            page.onLoad.emit(page.id);
            this._currentChanged.next(page);
        }
    }
    /**
     * (DEPRECATED) A legacy means of setting the current page in the wizard.
     * Deprecated in 0.9.4. Accepts a WizardPage object as a parameter and then
     * tries to set that page to be the current page in the wizard.
     *
     *
     * \@memberof WizardNavigationService
     * @param {?} page
     * @return {?}
     */
    setCurrentPage(page) {
        this.currentPage = page;
    }
    /**
     * An observable used internally to alert the wizard that forward navigation
     * has occurred. It is recommended that you use the Wizard.onMoveNext
     * (clrWizardOnNext) output instead of this one.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get movedToNextPage() {
        return this._movedToNextPage.asObservable();
    }
    /**
     * An observable used internally to alert the wizard that the nav service
     * has approved completion of the wizard.
     *
     * It is recommended that you use the Wizard.wizardFinished (clrWizardOnFinish)
     * output instead of this one.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get wizardFinished() {
        return this._wizardFinished.asObservable();
    }
    /**
     * This is a public function that can be used to programmatically advance
     * the user to the next page.
     *
     * When invoked, this method will move the wizard to the next page after
     * successful validation. Note that this method goes through all checks
     * and event emissions as if Wizard.next(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.next(false).
     *
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    next() {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage("finish");
            return;
        }
        this.checkAndCommitCurrentPage("next");
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    }
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    forceNext() {
        const /** @type {?} */ currentPage = this.currentPage;
        const /** @type {?} */ nextPage = this.pageCollection.getNextPage(currentPage);
        // catch errant null or undefineds that creep in
        if (!nextPage) {
            throw new Error("The wizard has no next page to go to.");
        }
        if (this.wizardStopNavigation) {
            return;
        }
        if (!currentPage.completed) {
            // this is a state that alt next flows can get themselves in...
            this.pageCollection.commitPage(currentPage);
        }
        this.currentPage = nextPage;
    }
    /**
     * Accepts a button/action type as a parameter. Encapsulates all logic for
     * event emissions, state of the current page, and wizard and page level overrides.
     *
     * Avoid calling this function directly unless you really know what you're doing.
     *
     *
     * \@memberof WizardNavigationService
     * @param {?} buttonType
     * @return {?}
     */
    checkAndCommitCurrentPage(buttonType) {
        const /** @type {?} */ currentPage = this.currentPage;
        let /** @type {?} */ iAmTheLastPage;
        let /** @type {?} */ isNext;
        let /** @type {?} */ isDanger;
        let /** @type {?} */ isDangerNext;
        let /** @type {?} */ isDangerFinish;
        let /** @type {?} */ isFinish;
        if (!currentPage.readyToComplete || this.wizardStopNavigation) {
            return;
        }
        iAmTheLastPage = this.currentPageIsLast;
        isNext = buttonType === "next";
        isDanger = buttonType === "danger";
        isDangerNext = isDanger && !iAmTheLastPage;
        isDangerFinish = isDanger && iAmTheLastPage;
        isFinish = buttonType === "finish" || isDangerFinish;
        if (isFinish && !iAmTheLastPage) {
            return;
        }
        currentPage.primaryButtonClicked.emit(buttonType);
        if (isFinish) {
            currentPage.finishButtonClicked.emit(currentPage);
        }
        else if (isDanger) {
            currentPage.dangerButtonClicked.emit();
        }
        else if (isNext) {
            currentPage.nextButtonClicked.emit();
        }
        if (currentPage.stopNext || currentPage.preventDefault) {
            currentPage.onCommit.emit(currentPage.id);
            return;
        }
        // order is very important with these emitters!
        if (isFinish) {
            // mark page as complete
            if (!this.wizardHasAltNext) {
                this.pageCollection.commitPage(currentPage);
            }
            this._wizardFinished.next();
        }
        if (this.wizardHasAltNext) {
            this.pageCollection.commitPage(currentPage);
            if (isNext || isDangerNext) {
                this._movedToNextPage.next(true);
            }
            // jump out here, no matter what type we're looking at
            return;
        }
        if (isNext || isDangerNext) {
            this.forceNext();
        }
    }
    /**
     * This is a public function that can be used to programmatically conclude
     * the wizard.
     *
     * When invoked, this method will  initiate the work involved with finalizing
     * and finishing the wizard workflow. Note that this method goes through all
     * checks and event emissions as if Wizard.finish(false) had been called.
     *
     * In most cases, it makes more sense to use Wizard.finish(false).
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    finish() {
        this.checkAndCommitCurrentPage("finish");
    }
    /**
     * Notifies the wizard when backwards navigation has occurred via the
     * previous button.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get movedToPreviousPage() {
        return this._movedToPreviousPage.asObservable();
    }
    /**
     * Programmatically moves the wizard to the page before the current page.
     *
     * In most instances, it makes more sense to call Wizard.previous()
     * which does the same thing.
     *
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    previous() {
        let /** @type {?} */ previousPage;
        if (this.currentPageIsFirst || this.wizardStopNavigation) {
            return;
        }
        previousPage = this.pageCollection.getPreviousPage(this.currentPage);
        if (!previousPage) {
            return;
        }
        this._movedToPreviousPage.next(true);
        if (this.forceForwardNavigation) {
            this.currentPage.completed = false;
        }
        this.currentPage = previousPage;
    }
    /**
     * Notifies the wizard that a user is trying to cancel it.
     *
     * \@readonly
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get notifyWizardCancel() {
        return this._cancelWizard.asObservable();
    }
    /**
     * Allows a hook into the cancel workflow of the wizard from the nav service. Note that
     * this route goes through all checks and event emissions as if a cancel button had
     * been clicked.
     *
     * In most cases, users looking for a hook into the cancel routine are actually looking
     * for a way to close the wizard from their host component because they have prevented
     * the default cancel action.
     *
     * In this instance, it is recommended that you use Wizard.close() to avoid any event
     * emission loop resulting from an event handler calling back into routine that will
     * again evoke the events it handles.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    cancel() {
        this._cancelWizard.next();
    }
    /**
     * Performs all required checks to determine if a user can navigate to a page. Checking at each
     * point if a page is navigable -- completed where the page immediately after the last completed
     * page.
     *
     * Takes two parameters. The first one must be either the WizardPage object or the ID of the
     * WizardPage object that you want to make the current page.
     *
     * The second parameter is optional and is a Boolean flag for "lazy completion". What this means
     * is the Wizard will mark all pages between the current page and the page you want to navigate
     * to as completed. This is useful for informational wizards that do not require user action,
     * allowing an easy means for users to jump ahead.
     *
     * To avoid checks on navigation, use WizardPage.makeCurrent() instead.
     *
     * \@memberof WizardNavigationService
     * @param {?} pageToGoToOrId
     * @param {?=} lazyComplete
     * @return {?}
     *
     */
    goTo(pageToGoToOrId, lazyComplete = false) {
        let /** @type {?} */ pageToGoTo;
        let /** @type {?} */ currentPage;
        let /** @type {?} */ myPages;
        let /** @type {?} */ pagesToCheck;
        let /** @type {?} */ okayToMove = true;
        let /** @type {?} */ goingForward;
        let /** @type {?} */ currentPageIndex;
        let /** @type {?} */ goToPageIndex;
        myPages = this.pageCollection;
        pageToGoTo = (typeof pageToGoToOrId === "string") ? myPages.getPageById(pageToGoToOrId) : pageToGoToOrId;
        currentPage = this.currentPage;
        // no point in going to the current page. you're there already!
        // also hard block on any navigation when stopNavigation is true
        if (pageToGoTo === currentPage || this.wizardStopNavigation) {
            return;
        }
        currentPageIndex = myPages.getPageIndex(currentPage);
        goToPageIndex = myPages.getPageIndex(pageToGoTo);
        goingForward = (goToPageIndex > currentPageIndex);
        pagesToCheck = myPages.getPageRangeFromPages(this.currentPage, pageToGoTo);
        okayToMove = lazyComplete || this.canGoTo(pagesToCheck);
        if (!okayToMove) {
            return;
        }
        if (goingForward && lazyComplete) {
            pagesToCheck.forEach((page) => {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach((page) => {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    }
    /**
     * Accepts a range of WizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     *
     * \@memberof WizardNavigationService
     * @param {?} pagesToCheck
     * @return {?}
     */
    canGoTo(pagesToCheck) {
        let /** @type {?} */ okayToMove = true;
        const /** @type {?} */ myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        let /** @type {?} */ previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach((page) => {
            let /** @type {?} */ previousPage;
            if (!okayToMove) {
                return;
            }
            if (page.completed) {
                // default is true. just jump out instead of complicating it.
                return;
            }
            // so we know our page is not completed...
            previousPage = myPages.getPageIndex(page) > 0 ? myPages.getPreviousPage(page) : null;
            previousPagePasses = (previousPage === null) || (previousPage.completed === true);
            // we are false if not the current page AND previous page is not completed
            // (but must have a previous page)
            if (!page.current && !previousPagePasses) {
                okayToMove = false;
            }
            // falls through to true as default
        });
        return okayToMove;
    }
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    setLastEnabledPageCurrent() {
        const /** @type {?} */ allPages = this.pageCollection.pagesAsArray;
        let /** @type {?} */ lastCompletedPageIndex = null;
        allPages.forEach((page, index) => {
            if (page.completed) {
                lastCompletedPageIndex = index;
            }
        });
        if (lastCompletedPageIndex === null) {
            // always is at least the first item...
            lastCompletedPageIndex = 0;
        }
        else if ((lastCompletedPageIndex + 1) < allPages.length) {
            lastCompletedPageIndex = lastCompletedPageIndex + 1;
        }
        this.currentPage = allPages[lastCompletedPageIndex];
    }
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    setFirstPageCurrent() {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    }
    /**
     *
     * \@ignore
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get wizardGhostPageState() {
        return this._wizardGhostPageState;
    }
    /**
     *
     * \@ignore
     *
     * \@memberof WizardNavigationService
     * @param {?} value
     * @return {?}
     */
    set wizardGhostPageState(value) {
        if (this.hideWizardGhostPages) {
            this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
        }
        else {
            this._wizardGhostPageState = value;
        }
    }
    /**
     *
     * \@ignore
     * \@memberof WizardNavigationService
     * @return {?}
     */
    get hideWizardGhostPages() {
        return this._hideWizardGhostPages;
    }
    /**
     *
     * \@ignore
     *
     * \@memberof WizardNavigationService
     * @param {?} value
     * @return {?}
     */
    set hideWizardGhostPages(value) {
        this._hideWizardGhostPages = value;
    }
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    updateNavigation() {
        let /** @type {?} */ toSetCurrent;
        let /** @type {?} */ currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    }
}
WizardNavigationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WizardNavigationService.ctorParameters = () => [
    { type: PageCollectionService, },
    { type: ButtonHubService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class HeaderActionService {
    /**
     * @param {?} navService
     */
    constructor(navService) {
        this.navService = navService;
    }
    /**
     * @return {?}
     */
    get wizardHasHeaderActions() {
        const /** @type {?} */ wizardHdrActions = this.wizardHeaderActions;
        if (!wizardHdrActions) {
            return false;
        }
        return wizardHdrActions.toArray().length > 0;
    }
    /**
     * @return {?}
     */
    get currentPageHasHeaderActions() {
        return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
    }
    /**
     * @return {?}
     */
    get showWizardHeaderActions() {
        return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
    }
    /**
     * @return {?}
     */
    get displayHeaderActionsWrapper() {
        return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
    }
}
HeaderActionService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
HeaderActionService.ctorParameters = () => [
    { type: WizardNavigationService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let wizardHeaderActionIndex = 0;
class WizardHeaderAction {
    constructor() {
        // title is explanatory text added to the header action
        this.title = "";
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new EventEmitter(false);
    }
    /**
     * @return {?}
     */
    get id() {
        return `clr-wizard-header-action-${this._id}`;
    }
    /**
     * @return {?}
     */
    click() {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    }
}
WizardHeaderAction.decorators = [
    { type: Component, args: [{
                selector: "clr-wizard-header-action",
                template: `
        <button 
            type="button"
            class="btn clr-wizard-header-action btn-link"
            [id]="id"
            [class.disabled]="disabled"
            (click)="click()"
            [title]="title">
            <ng-content></ng-content>
        </button>
    `,
                host: { "class": "clr-wizard-header-action-wrapper" }
            },] },
];
/**
 * @nocollapse
 */
WizardHeaderAction.ctorParameters = () => [];
WizardHeaderAction.propDecorators = {
    'title': [{ type: Input, args: ["title",] },],
    '_id': [{ type: Input, args: ["id",] },],
    'disabled': [{ type: Input, args: ["clrWizardHeaderActionDisabled",] },],
    'headerActionClicked': [{ type: Output, args: ["actionClicked",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
let wizardPageIndex = 0;
/**
 * The WizardPage component is responsible for displaying the content of each step
 * in the wizard workflow.
 *
 * WizardPage component has hooks into the navigation service (WizardPage.navService),
 * page collection (WizardPage.pageCollection), and button service
 * (WizardPage.buttonService). These three providers are shared across the components
 * within each instance of a Wizard.
 *
 * @export
 * \@class WizardPage
 */
class WizardPage {
    /**
     * Creates an instance of WizardPage.
     *
     *
     * \@memberof WizardPage
     * @param {?} navService
     * @param {?} pageCollection
     * @param {?} buttonService
     */
    constructor(navService, pageCollection, buttonService) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         * \@ignore
         * \@memberof WizardPage
         */
        this._nextStepDisabled = false;
        /**
         * Emits when the value of WizardPage.nextStepDisabled changes.
         * Should emit the new value of nextStepDisabled.
         *
         * \@memberof WizardPage
         */
        this.nextStepDisabledChange = new EventEmitter();
        /**
         * \@ignore
         * \@memberof WizardPage
         */
        this._previousStepDisabled = false;
        /**
         * Emits when the value of WizardPage.previousStepDisabled changes.
         * Should emit the new value of previousStepDisabled.
         *
         * \@memberof WizardPage
         */
        this.previousStepDisabledChange = new EventEmitter();
        /**
         * Overrides all actions from the page level, so you can use an alternate function for
         * validation or data-munging with a WizardPage.onCommit (clrWizardPageOnCommit output),
         * WizardPage.onCancel (clrWizardPageOnCancel output), or one
         * of the granular page-level button click event emitters.
         *
         * \@memberof WizardPage
         */
        this.preventDefault = false;
        /**
         *
         * \@ignore
         *
         * \@memberof WizardPage
         */
        this._stopCancel = false;
        /**
         *
         * \@ignore
         * \@memberof WizardPage
         */
        this.stopCancelChange = new EventEmitter();
        /**
         *
         *
         * \@ignore
         * \@memberof WizardPage
         */
        this._stopNext = false;
        /**
         * An event emitter carried over from a legacy version of WizardPage.
         * Fires an event on WizardPage whenever the next or finish buttons
         * are clicked and the page is the current page of the Wizard.
         *
         * Note that this does not automatically emit an event when a custom
         * button is used in place of a next or finish button.
         *
         * \@memberof WizardPage
         */
        this.onCommit = new EventEmitter(false);
        /**
         * Emits an event when WizardPage becomes the current page of the
         * Wizard.
         *
         * \@memberof WizardPage
         */
        this.onLoad = new EventEmitter();
        /**
         * Emits an event when the WizardPage invokes the cancel routine for the wizard.
         *
         * Can be used in conjunction with the WizardPage.stopCancel
         * (clrWizardPagePreventDefaultCancel) or WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) inputs to implement custom cancel
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before cancelling the wizard.
         *
         * Note that this requires you to call Wizard.close() from the host component.
         * This constitues a full replacement of the cancel functionality.
         *
         * \@memberof WizardPage
         */
        this.pageOnCancel = new EventEmitter();
        /**
         * Emits an event when the finish button is clicked and the WizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom finish
         * functionality at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to complete
         * the wizard.
         *
         * Note that this requires you to call Wizard.finish() or Wizard.forceFinish()
         * from the host component. This combination creates a full replacement of
         * the finish functionality.
         *
         * \@memberof WizardPage
         */
        this.finishButtonClicked = new EventEmitter();
        /**
         * Emits an event when the previous button is clicked and the WizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom backwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * backwards in the wizard.
         *
         * Note that this requires you to call Wizard.previous()
         * from the host component. This combination creates a full replacement of
         * the backwards navigation functionality.
         *
         * \@memberof WizardPage
         */
        this.previousButtonClicked = new EventEmitter();
        /**
         * Emits an event when the next button is clicked and the WizardPage is
         * the wizard's current page.
         *
         * Can be used in conjunction with the WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * navigation at the page level. This is useful if you would like to do
         * validation, save data, or warn users before allowing them to go
         * to the next page in the wizard.
         *
         * Note that this requires you to call Wizard.forceNext() or Wizard.next()
         * from the host component. This combination creates a full replacement of
         * the forward navigation functionality.
         *
         * \@memberof WizardPage
         */
        this.nextButtonClicked = new EventEmitter();
        /**
         * Emits an event when a danger button is clicked and the WizardPage is
         * the wizard's current page. By default, a danger button will act as
         * either a "next" or "finish" button depending on if the WizardPage is the
         * last page or not.
         *
         * Can be used in conjunction with the WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level when the danger button is clicked.
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * \@memberof WizardPage
         */
        this.dangerButtonClicked = new EventEmitter();
        /**
         * Emits an event when a next, finish, or danger button is clicked and the
         * WizardPage is the wizard's current page.
         *
         * Can be used in conjunction with the WizardPage.preventDefault
         * (clrWizardPagePagePreventDefault) input to implement custom forwards
         * or finish navigation at the page level, regardless of the type of
         * primary button.
         *
         * This is useful if you would like to do validation, save data, or warn
         * users before allowing them to go to the next page in the wizard or
         * finish the wizard.
         *
         * Note that this requires you to call Wizard.finish(), Wizard.forceFinish(),
         * Wizard.forceNext() or Wizard.next() from the host component. This
         * combination creates a full replacement of the forward navigation and
         * finish functionality.
         *
         * \@memberof WizardPage
         */
        this.primaryButtonClicked = new EventEmitter();
        this.customButtonClicked = new EventEmitter();
        /**
         * An input value that is used internally to generate the WizardPage ID as
         * well as the step nav item ID.
         *
         * Typed as any because it should be able to accept numbers as well as
         * strings. Passing an index for wizard whose pages are created with an
         * ngFor loop is a common use case.
         *
         * \@memberof WizardPage
         */
        this._id = (wizardPageIndex++).toString();
        /**
         *
         * \@ignore
         * \@memberof WizardPage
         */
        this._complete = false;
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the next page.
     *
     * Useful for in-page validation because it prevents forward navigation
     * and visibly disables the next button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using WizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get nextStepDisabled() {
        return this._nextStepDisabled;
    }
    /**
     * Sets whether the page should allow forward navigation.
     *
     * \@memberof WizardPage
     * @param {?} val
     * @return {?}
     */
    set nextStepDisabled(val) {
        const /** @type {?} */ valBool = !!val;
        if (valBool !== this._nextStepDisabled) {
            this._nextStepDisabled = valBool;
            this.nextStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that tells whether or not the wizard should be allowed
     * to move to the previous page.
     *
     * Useful for in-page validation because it prevents backward navigation
     * and visibly disables the previous button.
     *
     * Does not require that you re-implement navigation routines like you
     * would if you were using WizardPage.preventDefault or
     * Wizard.preventDefault.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get previousStepDisabled() {
        return this._previousStepDisabled;
    }
    /**
     * Sets whether the page should allow backward navigation.
     *
     * \@memberof WizardPage
     * @param {?} val
     * @return {?}
     */
    set previousStepDisabled(val) {
        const /** @type {?} */ valBool = !!val;
        if (valBool !== this._previousStepDisabled) {
            this._previousStepDisabled = valBool;
            this.previousStepDisabledChange.emit(valBool);
        }
    }
    /**
     * A getter that retrieves whether the page is preventing the cancel action.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Overrides the cancel action from the page level. Allows you to use an
     * alternate function for validation or data-munging before cancelling the
     * wizard when combined with the WizardPage.onCancel
     * (the clrWizardPageOnCancel output).
     *
     * Requires that you manually close the wizard from your host component,
     * usually with a call to Wizard.forceNext() or wizard.next();
     *
     * \@memberof WizardPage
     * @param {?} val
     * @return {?}
     */
    set stopCancel(val) {
        const /** @type {?} */ valBool = !!val;
        if (valBool !== this._stopCancel) {
            this._stopCancel = valBool;
            this.stopCancelChange.emit(valBool);
        }
    }
    /**
     * A getter that tells you whether the page is preventing the next action.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Overrides forward navigation from the page level. Allows you to use an
     * alternate function for validation or data-munging before moving the
     * wizard to the next pagewhen combined with the WizardPage.onCommit
     * (clrWizardPageOnCommit) or WizardPage.nextButtonClicked
     * (clrWizardPageNext) outputs.
     *
     * Requires that you manually tell the wizard to navigate forward from
     * the hostComponent, usually with a call to Wizard.forceNext() or
     * wizard.next();
     *
     * \@memberof WizardPage
     * @param {?} val
     * @return {?}
     */
    set stopNext(val) {
        const /** @type {?} */ valBool = !!val;
        if (valBool !== this._stopNext) {
            this._stopNext = valBool;
        }
    }
    /**
     * A read-only getter that generates an ID string for the wizard page from
     * either the value passed to the WizardPage "id" input or a wizard page
     * counter shared across all wizard pages in the application.
     *
     * Note that the value passed into the ID input Will be prefixed with
     * "clr-wizard-page-".
     *
     * \@readonly
     *
     * \@memberof WizardPage
     * @return {?}
     */
    get id() {
        // covers things like null, undefined, false, and empty string
        // while allowing zero to pass
        const /** @type {?} */ idIsNonZeroFalsy = (!this._id && this._id !== 0);
        // in addition to non-zero falsy we also want to make sure _id is not a negative
        // number.
        if (idIsNonZeroFalsy || this._id < 0) {
            // guard here in the event that input becomes undefined or null by accident
            this._id = (wizardPageIndex++).toString();
        }
        return `clr-wizard-page-${this._id}`;
    }
    /**
     * A read-only getter that serves as a convenience for those who would rather
     * not think in the terms of !WizardPage.nextStepDisabled. For some use cases,
     * WizardPage.readyToComplete is more logical and declarative.
     *
     * \@readonly
     *
     * \@memberof WizardPage
     * @return {?}
     */
    get readyToComplete() {
        return !this.nextStepDisabled;
    }
    /**
     * A page is marked as completed if it is both readyToComplete and completed,
     * as in the next or finish action has been executed while this page was current.
     *
     * Note there is and open question about how to handle pages that are marked
     * complete but who are no longer readyToComplete. This might indicate an error
     * state for the WizardPage. Currently, the wizard does not acknowledge this state
     * and only returns that the page is incomplete.
     *
     * \@memberof WizardPage
     * @return {?}
     */
    get completed() {
        return this._complete && this.readyToComplete;
        // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
        // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
        // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
        // FIRST QUESTION: AM I GREY OR COLORED?
        // SECOND QUESTION: AM I GREEN OR RED?
    }
    /**
     * A WizardPage can be manually set to completed using this boolean setter.
     * It is recommended that users rely on the convenience functions in the wizard
     * and navigation service instead of manually setting pages’ completion state.
     *
     * \@memberof WizardPage
     * @param {?} value
     * @return {?}
     */
    set completed(value) {
        this._complete = value;
    }
    /**
     * Checks with the navigation service to see if it is the current page.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get current() {
        return this.navService.currentPage === this;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return !this.enabled;
    }
    /**
     * A read-only getter that returns whether or not the page is navigable
     * in the wizard. A wizard page can be navigated to if it is completed
     * or the page before it is completed.
     *
     * This getter handles the logic for enabling or disabling the links in
     * the step nav on the left Side of the wizard.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get enabled() {
        return this.current || this.completed || this.previousCompleted;
    }
    /**
     * A read-only getter that returns whether or not the page before this
     * WizardPage is completed. This is useful for determining whether or not
     * a page is navigable if it is not current or already completed.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get previousCompleted() {
        const /** @type {?} */ previousPage = this.pageCollection.getPreviousPage(this);
        if (!previousPage) {
            return true;
        }
        return previousPage.completed;
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get title() {
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get navTitle() {
        if (this.pageNavTitle) {
            return this.pageNavTitle.pageNavTitleTemplateRef;
        }
        return this.pageTitle.pageTitleTemplateRef;
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get headerActions() {
        if (!this._headerActions) {
            return;
        }
        return this._headerActions.pageHeaderActionsTemplateRef;
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get hasHeaderActions() {
        return !!this._headerActions;
    }
    /**
     *
     * \@ignore
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get buttons() {
        if (!this._buttons) {
            return;
        }
        return this._buttons.pageButtonsTemplateRef;
    }
    /**
     * A read-only getter that returns a boolean that says whether or
     * not the WizardPage includes buttons. Used to determine if the
     * Wizard should override the default button set defined as
     * its direct children.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get hasButtons() {
        return !!this._buttons;
    }
    /**
     * Uses the nav service to make the WizardPage the current page in the
     * wizard. Bypasses all checks but still emits the WizardPage.onLoad
     * (clrWizardPageOnLoad) output.
     *
     * In most cases, it is better to use the default navigation functions
     * in Wizard.
     *
     * \@memberof WizardPage
     * @return {?}
     */
    makeCurrent() {
        this.navService.currentPage = this;
    }
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * \@memberof WizardPage
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    }
    /**
     * A read-only getter that returns the id used by the step nav item associated with the page.
     *
     * WizardPage needs this ID string for aria information.
     *
     * \@readonly
     * \@memberof WizardPage
     * @return {?}
     */
    get stepItemId() {
        return this.pageCollection.getStepItemIdForPage(this);
    }
}
WizardPage.decorators = [
    { type: Component, args: [{
                selector: "clr-wizard-page",
                template: "<ng-content></ng-content>",
                host: {
                    "[id]": "id",
                    "role": "tabpanel",
                    "[attr.aria-hidden]": "!current",
                    "[attr.aria-labelledby]": "stepItemId",
                    "[class.active]": "current",
                    "[class.clr-wizard-page]": "true"
                }
            },] },
];
/**
 * @nocollapse
 */
WizardPage.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
];
WizardPage.propDecorators = {
    'pageTitle': [{ type: ContentChild, args: [WizardPageTitleDirective,] },],
    'pageNavTitle': [{ type: ContentChild, args: [WizardPageNavTitleDirective,] },],
    '_buttons': [{ type: ContentChild, args: [WizardPageButtonsDirective,] },],
    '_headerActions': [{ type: ContentChild, args: [WizardPageHeaderActionsDirective,] },],
    'nextStepDisabled': [{ type: Input, args: ["clrWizardPageNextDisabled",] },],
    'nextStepDisabledChange': [{ type: Output, args: ["clrWizardPageNextDisabledChange",] },],
    'previousStepDisabled': [{ type: Input, args: ["clrWizardPagePreviousDisabled",] },],
    'previousStepDisabledChange': [{ type: Output, args: ["clrWizardPagePreviousDisabledChange",] },],
    'preventDefault': [{ type: Input, args: ["clrWizardPagePreventDefault",] },],
    'stopCancel': [{ type: Input, args: ["clrWizardPagePreventDefaultCancel",] },],
    'stopCancelChange': [{ type: Output, args: ["clrWizardPagePreventDefaultCancelChange",] },],
    'stopNext': [{ type: Input, args: ["clrWizardPagePreventDefaultNext",] },],
    'onCommit': [{ type: Output, args: ["clrWizardPageOnCommit",] },],
    'onLoad': [{ type: Output, args: ["clrWizardPageOnLoad",] },],
    'pageOnCancel': [{ type: Output, args: ["clrWizardPageOnCancel",] },],
    'finishButtonClicked': [{ type: Output, args: ["clrWizardPageFinish",] },],
    'previousButtonClicked': [{ type: Output, args: ["clrWizardPagePrevious",] },],
    'nextButtonClicked': [{ type: Output, args: ["clrWizardPageNext",] },],
    'dangerButtonClicked': [{ type: Output, args: ["clrWizardPageDanger",] },],
    'primaryButtonClicked': [{ type: Output, args: ["clrWizardPagePrimary",] },],
    'customButtonClicked': [{ type: Output, args: ["clrWizardPageCustomButton",] },],
    '_id': [{ type: Input, args: ["id",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// providers
/**
 * The Wizard component
 *
 * @export
 * \@class Wizard
 */
class Wizard {
    /**
     * Creates an instance of Wizard.
     *
     * \@memberof Wizard
     * @param {?} navService
     * @param {?} pageCollection
     * @param {?} buttonService
     * @param {?} headerActionService
     * @param {?} elementRef
     * @param {?} differs
     */
    constructor(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        this.navService = navService;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        this.headerActionService = headerActionService;
        this.elementRef = elementRef;
        this.differs = differs;
        /**
         * Contains the size defined by the clrWizardSize input
         * \@name size
         * \@default "xl"
         * \@memberof Wizard
         */
        this.size = "xl";
        /**
         * The property that reveals the ghost pages in the wizard. Set through the
         * clrWizardShowGhostPages input.
         *
         * \@name showGhostPages
         * \@default false
         * \@memberof Wizard
         */
        this.showGhostPages = false;
        this._forceForward = false;
        /**
         * Tells the modal part of the wizard whether it should have a close "X"
         * in the top right corner. Set with the clrWizardClosable input.
         *
         * \@name closable
         * \@memberof Wizard
         */
        this.closable = true;
        /**
         * Toggles open/close of the wizard component. Set using the clrWizardOpen
         * input.
         *
         * \@name _open
         * \@memberof Wizard
         */
        this._open = false;
        /**
         * Emits when the wizard is opened or closed. Emits through the
         * clrWizardOpenChange output. Works in conjunction with the
         * clrWizardOpen binding so you can use...
         *
         * <clr-wizard [(clrWizardOpen)]="blah"
         * ...or...
         * <clr-wizard [clrWizardOpen]="something" (clrWizardOpenChange)="doSomethign($event)">
         *
         * ...for two-way binding.
         *
         * \@name _openChanged
         * \@memberof Wizard
         */
        this._openChanged = new EventEmitter(false);
        /**
         * Emits when the wizard is canceled. Can be observed through the clrWizardOnCancel
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultCancel input to create
         * wizard-level custom cancel routines.
         *
         * \@name onCancel
         * \@memberof Wizard
         */
        this.onCancel = new EventEmitter(false);
        /**
         * Emits when the wizard is completed. Can be observed through the clrWizardOnFinish
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom completion routines.
         *
         * \@name onFinish
         * \@memberof Wizard
         */
        this.wizardFinished = new EventEmitter(false);
        /**
         * Emits when the wizard is reset. See .reset(). Can be observed through
         * the clrWizardOnReset output.
         *
         * \@name onReset
         * \@memberof Wizard
         */
        this.onReset = new EventEmitter(false);
        /**
         * Emits when the current page has changed. Can be observed through the clrWizardCurrentPageChanged
         * output. This can happen on .next() or .previous().
         * Useful for non-blocking validation.
         *
         * \@name currentPageChanged
         * \@memberof Wizard
         */
        this.currentPageChanged = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the next page. Can be observed through the clrWizardOnNext
         * output.
         *
         * Can be combined with the clrWizardPreventDefaultNext input to create
         * wizard-level custom navigation routines, which are useful for validation.
         *
         * \@name onMoveNext
         * \@memberof Wizard
         */
        this.onMoveNext = new EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be observed through the
         * clrWizardOnPrevious output.
         *
         * Can be useful for validation.
         *
         * \@name onMovePrevious
         * \@memberof Wizard
         */
        this.onMovePrevious = new EventEmitter(false);
        this._stopNext = false;
        this._stopCancel = false;
        this._stopNavigation = false;
        this._disableStepnav = false;
        /**
         * Used only to communicate to the underlying modal that animations are not
         * wanted. Primary use is for the display of static/inline wizards.
         *
         * Set using clrWizardPreventModalAnimation input. But you should never set it.
         *
         * \@name _stopModalAnimations
         * \@memberof Wizard
         */
        this._stopModalAnimations = false;
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(() => {
            this.onMoveNext.emit();
        });
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(() => {
            this.onMovePrevious.emit();
        });
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(() => {
            this.checkAndCancel();
        });
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(() => {
            if (!this.stopNext) {
                this.forceFinish();
            }
            this.wizardFinished.emit();
        });
        this.differ = differs.find([]).create(null);
    }
    /**
     * Resets page completed states when navigating backwards. Can be set using
     * the clrWizardForceForwardNavigation input.
     *
     * \@name forceForward
     * \@default false
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    set forceForward(value) {
        this._forceForward = !!value;
        this.navService.forceForwardNavigation = value;
    }
    /**
     * @return {?}
     */
    get forceForward() {
        return this._forceForward;
    }
    /**
     * @param {?} open
     * @return {?}
     */
    set clrWizardOpen(open) {
        if (open) {
            this.buttonService.buttonsReady = true;
        }
        this._open = open;
    }
    /**
     * Prevents Wizard from moving to the next page or closing itself on finishing.
     * Set using the clrWizardPreventDefaultNext input.
     *
     * Note that using stopNext will require you to create your own calls to
     * .next() and .finish() in your host component to make the Wizard work as
     * expected.
     *
     * Primarily used for validation.
     *
     * \@name stopNext
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    set stopNext(value) {
        this._stopNext = !!value;
        this.navService.wizardHasAltNext = value;
    }
    /**
     * @return {?}
     */
    get stopNext() {
        return this._stopNext;
    }
    /**
     * Prevents Wizard from closing when the cancel button or close "X" is clicked.
     * Set using the clrWizardPreventDefaultCancel input.
     *
     * Note that using stopCancel will require you to create your own calls to
     * .close() in your host component to make the Wizard work as expected.
     *
     * Useful for doing checks or prompts before closing a Wizard.
     *
     * \@name stopCancel
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    set stopCancel(value) {
        this._stopCancel = !!value;
        this.navService.wizardHasAltCancel = value;
    }
    /**
     * @return {?}
     */
    get stopCancel() {
        return this._stopCancel;
    }
    /**
     * Prevents Wizard from performing any form of navigation away from the current
     * page. Set using the clrWizardPreventNavigation input.
     *
     * Note that stopNavigation is meant to freeze the wizard in place, typically
     * during a long validation or background action where you want the wizard to
     * display loading content but not allow the user to execute navigation in
     * the stepnav, close X, or the  back, finish, or next buttons.
     *
     * \@name stopNavigation
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    set stopNavigation(value) {
        this._stopNavigation = !!value;
        this.navService.wizardStopNavigation = value;
    }
    /**
     * @return {?}
     */
    get stopNavigation() {
        return this._stopNavigation;
    }
    /**
     * Prevents clicks on the links in the stepnav from working.
     *
     * A more granular bypassing of navigation which can be useful when your
     * Wizard is in a state of completion and you don't want users to be
     * able to jump backwards and change things.
     *
     * \@name disableStepnav
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    set disableStepnav(value) {
        this._disableStepnav = !!value;
        this.navService.wizardDisableStepnav = value;
    }
    /**
     * @return {?}
     */
    get disableStepnav() {
        return this._disableStepnav;
    }
    /**
     * @return {?}
     */
    get stopModalAnimations() {
        if (this._stopModalAnimations) {
            return "true";
        }
        return "false";
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe((page) => {
            this.setGhostPages();
            this.currentPageChanged.emit();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.goNextSubscription.unsubscribe();
        this.goPreviousSubscription.unsubscribe();
        this.cancelSubscription.unsubscribe();
        this.currentPageSubscription.unsubscribe();
        this.wizardFinishedSubscription.unsubscribe();
    }
    /**
     * Sets up references that are needed by the providers.
     *
     * \@name ngAfterContentInit
     * \@memberof Wizard
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ navService = this.navService;
        this.pageCollection.pages = this.pages;
        this.headerActionService.wizardHeaderActions = this.headerActions;
        if (this.showGhostPages) {
            navService.hideWizardGhostPages = false;
            this.deactivateGhostPages();
        }
        // Only trigger buttons ready if default is open (inlined)
        if (this._open) {
            this.buttonService.buttonsReady = true;
        }
    }
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * \@name ngDoCheck
     * \@memberof Wizard
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem((r) => {
                this.navService.updateNavigation();
            });
            changes.forEachRemovedItem((r) => {
                this.navService.updateNavigation();
            });
        }
    }
    /**
     * Convenient property for determining whether a wizard is static/in-line or not.
     *
     * \@name isStatic
     * \@readonly
     * \@memberof Wizard
     * @return {?}
     */
    get isStatic() {
        return this.elementRef.nativeElement.classList.contains("clr-wizard--inline");
    }
    /**
     * As a getter, current page is a convenient way to retrieve the current page from
     * the WizardNavigationService.
     *
     * As a setter, current page accepts a WizardPage and passes it to WizardNavigationService
     * to be made the current page. currentPage performs checks to make sure it can navigate
     * to the designated page.
     *
     * \@name currentPage
     * \@memberof Wizard
     * @return {?}
     */
    get currentPage() {
        return this.navService.currentPage;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    set currentPage(page) {
        this.navService.goTo(page, true);
    }
    /**
     * Convenient property for determining if the current page is the last page of
     * the wizard.
     *
     * \@name isLast
     * \@readonly
     * \@memberof Wizard
     * @return {?}
     */
    get isLast() {
        return this.navService.currentPageIsLast;
    }
    /**
     * Convenient property for determining if the current page is the first page of
     * the wizard.
     *
     * \@name isFirst
     * \@readonly
     * \@memberof Wizard
     * @return {?}
     */
    get isFirst() {
        return this.navService.currentPageIsFirst;
    }
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * \@name open
     * \@memberof Wizard
     * @return {?}
     */
    open() {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this.setGhostPages();
        this._openChanged.emit(true);
    }
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * \@name close
     * \@memberof Wizard
     * @return {?}
     */
    close() {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this.deactivateGhostPages();
        this._openChanged.emit(false);
    }
    /**
     * Convenient function that can be used to open and close the wizard. It operates
     * by checking a Boolean parameter. If true, the wizard is opened. If false,
     * it is closed.
     *
     * There is no default value for this parameter, so by default the wizard will
     * close if invoked with no parameter.
     *
     * \@name toggle
     *
     * \@memberof Wizard
     * @param {?} value
     * @return {?}
     */
    toggle(value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * DEPRECATED. Moves the wizard to the previous page. Carried over from legacy.
     *
     * It is recommended that you use previous() instead.
     *
     * \@name prev
     * \@memberof Wizard
     * @return {?}
     */
    prev() {
        this.previous();
    }
    /**
     * Moves the wizard to the previous page.
     *
     * \@name previous
     * \@memberof Wizard
     * @return {?}
     */
    previous() {
        this.navService.previous();
    }
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will move to the next page regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * Generally, with alternative navigation, users are supplying their own checks
     * and validation. So there is no point in superseding their business logic
     * with our default behavior.
     *
     * If false, the wizard will execute default checks and emit events as normal.
     * This is useful for custom buttons or programmatic workflows that are not
     * executing the wizards default checks and emissions. It is another way to
     * navigate without having to rewrite the wizard’s default functionality
     * from scratch.
     *
     * By default, next() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * \@name next
     * \@memberof Wizard
     * @param {?=} skipChecksAndEmits
     * @return {?}
     */
    next(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    }
    /**
     * Includes a Boolean parameter that will skip checks and event emissions.
     * If true, the wizard will  complete and close regardless of the state of
     * its current page. This is useful for alternative navigation where event
     * emissions have already been done and firing them again may cause an event loop.
     *
     * If false, the wizard will execute default checks and emit events before
     * completing and closing.
     *
     * By default, finish() does not execute event emissions or checks because the
     * 80% case is that this method will be called as part of an alternative
     * navigation with clrWizardPreventDefaultNext.
     *
     * \@name finish
     * \@memberof Wizard
     * @param {?=} skipChecksAndEmits
     * @return {?}
     */
    finish(skipChecksAndEmits = true) {
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    }
    /**
     * Does the work of finishing up the wizard and closing it but doesn't do the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling Wizard.finish(true) or Wizard.finish()
     * without a parameter.
     *
     * \@name forceFinish
     * \@memberof Wizard
     * @return {?}
     */
    forceFinish() {
        if (this.stopNavigation) {
            return;
        }
        this.deactivateGhostPages();
        this.close();
    }
    /**
     * Does the work of moving the wizard to the next page without the
     * checks and emissions that other paths do. Good for a last step in an
     * alternate workflow.
     *
     * Does the same thing as calling Wizard.next(true) or Wizard.next()
     * without a parameter.
     *
     * \@name forceNext
     * \@memberof Wizard
     * @return {?}
     */
    forceNext() {
        this.navService.forceNext();
    }
    /**
     * Initiates the functionality that cancels and closes the wizard.
     *
     * Do not use this for an override of the cancel the functionality
     * with clrWizardPreventDefaultCancel, clrWizardPreventPageDefaultCancel,
     * or clrWizardPagePreventDefault because it will initiate the same checks
     * and event emissions that invoked your event handler.
     *
     * Use Wizard.close() instead.
     *
     * \@name cancel
     * \@memberof Wizard
     * @return {?}
     */
    cancel() {
        this.navService.cancel();
    }
    /**
     * Overrides behavior of the underlying modal to avoid collisions with
     * alternative cancel functionality.
     *
     * In most cases, use Wizard.cancel() instead.
     *
     * \@name modalCancel
     * \@memberof Wizard
     * @return {?}
     */
    modalCancel() {
        this.checkAndCancel();
    }
    /**
     * Checks for alternative cancel flows defined at the current page or
     * wizard level. Performs a canceled if not. Emits events that initiate
     * the alternative cancel outputs (clrWizardPageOnCancel and
     * clrWizardOnCancel) if so.
     *
     * \@name checkAndCancel
     * \@memberof Wizard
     * @return {?}
     */
    checkAndCancel() {
        const /** @type {?} */ currentPage = this.currentPage;
        const /** @type {?} */ currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
        if (this.stopNavigation) {
            return;
        }
        currentPage.pageOnCancel.emit();
        if (!currentPageHasOverrides) {
            this.onCancel.emit();
        }
        if (!this.stopCancel && !currentPageHasOverrides) {
            this.close();
        }
    }
    /**
     * Accepts the wizard ID as a string parameter and calls to WizardNavigationService
     * to navigate to the page with that ID. Navigation will invoke the wizard’s default
     * checks and event emissions.
     *
     * Probably less useful than calling directly to Wizard.navService.goTo() because the
     * nav service method can accept either a string ID or a page object.
     *
     * The format of the expected ID parameter can be found in the return of the
     * WizardPage.id getter, usually prefixed with “clr-wizard-page-“ and then either a
     * numeric ID or the ID specified for the WizardPage component’s “id” input.
     *
     * \@name goTo
     *
     * \@memberof Wizard
     * @param {?} pageId
     * @return {?}
     */
    goTo(pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    }
    /**
     * A convenience function that calls to PageCollectionService.reset() and emits the
     * Wizard.onReset event.
     *
     * Reset sets all WizardPages to incomplete and sets the first page in the Wizard to
     * be the current page, essentially resetting the wizard navigation.
     *
     * Users would then use the onReset event to reset the data or model in their
     * host component.
     *
     * It could be useful to call a reset without firing the onReset event. To do this,
     * just call Wizard.pageCollection.reset() directly.
     *
     * \@name reset
     * \@memberof Wizard
     * @return {?}
     */
    reset() {
        this.pageCollection.reset();
        this.onReset.next();
    }
    /**
     * A convenience getter to retrieve the ghost Page animation state from
     * WizardNavigationService.
     *
     * \@name ghostPageState
     * \@readonly
     * \@memberof Wizard
     * @return {?}
     */
    get ghostPageState() {
        return this.navService.wizardGhostPageState;
    }
    /**
     * Convenience method that resets the ghost page animation.
     *
     * \@name deactivateGhostPages
     * \@memberof Wizard
     * @return {?}
     */
    deactivateGhostPages() {
        this.setGhostPages("deactivate");
    }
    /**
     * Manages the state of the ghost page animation based on the location
     * of the current page in the workflow.
     *
     * Accepts an optional string parameter that can reset the ghost page
     * animation to its closed state.
     *
     * \@name setGhostPages
     * \@requires module:../modal/utils/ghost-page-animations
     * \@requires ghost-page-animations#GHOST_PAGE_ANIMATION
     *
     * \@memberof Wizard
     * @param {?=} deactivateOrNot
     * @return {?}
     */
    setGhostPages(deactivateOrNot = "") {
        const /** @type {?} */ navService = this.navService;
        const /** @type {?} */ ghostpageStates = GHOST_PAGE_ANIMATION.STATES;
        if (this.showGhostPages) {
            if (deactivateOrNot === "deactivate") {
                navService.wizardGhostPageState = ghostpageStates.NO_PAGES;
            }
            else if (navService.currentPageIsLast) {
                navService.wizardGhostPageState = ghostpageStates.LAST_PAGE;
            }
            else if (navService.currentPageIsNextToLast) {
                navService.wizardGhostPageState = ghostpageStates.NEXT_TO_LAST_PAGE;
            }
            else {
                navService.wizardGhostPageState = ghostpageStates.ALL_PAGES;
            }
        }
    }
}
Wizard.decorators = [
    { type: Component, args: [{
                selector: "clr-wizard",
                providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
                template: `
      <!--
      ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
      ~ This software is released under MIT license.
      ~ The full license information can be found in LICENSE in the root directory of this project.
      -->

      <clr-modal
          [clrModalOpen]="_open"
          [clrModalSize]="size"
          [clrModalClosable]="closable"
          [clrModalStaticBackdrop]="true"
          [clrModalSkipAnimation]="stopModalAnimations"
          [clrModalGhostPageState]="ghostPageState"
          [clrModalOverrideScrollService]="isStatic"
          [clrModalPreventClose]="true"
          (clrModalAlternateClose)="modalCancel()">

          <nav class="modal-nav clr-wizard-stepnav-wrapper">
              <h3 class="clr-wizard-title"><ng-content select="clr-wizard-title"></ng-content></h3>
              <clr-wizard-stepnav></clr-wizard-stepnav>
          </nav>

          <h3 class="modal-title">
              <span class="modal-title-text">
                  <ng-template [ngTemplateOutlet]="navService.currentPageTitle"></ng-template>
              </span>

              <div class="modal-header-actions-wrapper" *ngIf="headerActionService.displayHeaderActionsWrapper">
                  <div *ngIf="headerActionService.showWizardHeaderActions">
                      <ng-content select="clr-wizard-header-action"></ng-content>
                  </div>
                  <div *ngIf="headerActionService.currentPageHasHeaderActions">
                      <ng-template [ngTemplateOutlet]="navService.currentPage.headerActions"></ng-template>
                  </div>
              </div>
          </h3>

          <div class="modal-body">
              <main clr-wizard-pages-wrapper class="clr-wizard-content">
                  <ng-content></ng-content>
              </main>
          </div>
          <div class="modal-footer clr-wizard-footer">
              <div class="clr-wizard-footer-buttons">
                  <div *ngIf="navService.currentPage && !navService.currentPage.hasButtons"
                      class="clr-wizard-footer-buttons-wrapper">
                      <ng-content select="clr-wizard-button"></ng-content>
                  </div>
                  <div *ngIf="navService.currentPage && navService.currentPage.hasButtons"
                      class="clr-wizard-footer-buttons-wrapper">
                      <ng-template [ngTemplateOutlet]="navService.currentPage.buttons"></ng-template>
                  </div>
              </div>
          </div>
      </clr-modal>
    `,
                host: {
                    "[class.clr-wizard]": "true",
                    "[class.wizard-md]": "size == 'md'",
                    "[class.wizard-lg]": "size == 'lg'",
                    "[class.wizard-xl]": "size == 'xl'",
                    "[class.lastPage]": "navService.currentPageIsLast",
                    "[class.clr-wizard--ghosted]": "showGhostPages"
                }
            },] },
];
/**
 * @nocollapse
 */
Wizard.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
    { type: HeaderActionService, },
    { type: ElementRef, },
    { type: IterableDiffers, },
];
Wizard.propDecorators = {
    'size': [{ type: Input, args: ["clrWizardSize",] },],
    'showGhostPages': [{ type: Input, args: ["clrWizardShowGhostPages",] },],
    'forceForward': [{ type: Input, args: ["clrWizardForceForwardNavigation",] },],
    'closable': [{ type: Input, args: ["clrWizardClosable",] },],
    'clrWizardOpen': [{ type: Input, args: ["clrWizardOpen",] },],
    '_openChanged': [{ type: Output, args: ["clrWizardOpenChange",] },],
    'onCancel': [{ type: Output, args: ["clrWizardOnCancel",] },],
    'wizardFinished': [{ type: Output, args: ["clrWizardOnFinish",] },],
    'onReset': [{ type: Output, args: ["clrWizardOnReset",] },],
    'pages': [{ type: ContentChildren, args: [WizardPage,] },],
    'headerActions': [{ type: ContentChildren, args: [WizardHeaderAction,] },],
    'currentPageChanged': [{ type: Output, args: ["clrWizardCurrentPageChanged",] },],
    'onMoveNext': [{ type: Output, args: ["clrWizardOnNext",] },],
    'onMovePrevious': [{ type: Output, args: ["clrWizardOnPrevious",] },],
    'stopNext': [{ type: Input, args: ["clrWizardPreventDefaultNext",] },],
    'stopCancel': [{ type: Input, args: ["clrWizardPreventDefaultCancel",] },],
    'stopNavigation': [{ type: Input, args: ["clrWizardPreventNavigation",] },],
    'disableStepnav': [{ type: Input, args: ["clrWizardDisableStepnav",] },],
    '_stopModalAnimations': [{ type: Input, args: ["clrWizardPreventModalAnimation",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
const DEFAULT_BUTTON_TYPES = {
    cancel: "cancel",
    previous: "previous",
    next: "next",
    finish: "finish",
    danger: "danger"
};
const CUSTOM_BUTTON_TYPES = {
    cancel: "custom-cancel",
    previous: "custom-previous",
    next: "custom-next",
    finish: "custom-finish",
    danger: "custom-danger"
};
class WizardButton {
    /**
     * @param {?} navService
     * @param {?} buttonService
     */
    constructor(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = "";
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new EventEmitter(false);
    }
    /**
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    checkDefaultAndCustomType(valueToCheck = "", typeToLookUp) {
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    get isCancel() {
        return this.checkDefaultAndCustomType(this.type, "cancel");
    }
    /**
     * @return {?}
     */
    get isNext() {
        return this.checkDefaultAndCustomType(this.type, "next");
    }
    /**
     * @return {?}
     */
    get isPrevious() {
        return this.checkDefaultAndCustomType(this.type, "previous");
    }
    /**
     * @return {?}
     */
    get isFinish() {
        return this.checkDefaultAndCustomType(this.type, "finish");
    }
    /**
     * @return {?}
     */
    get isDanger() {
        return this.checkDefaultAndCustomType(this.type, "danger");
    }
    /**
     * @return {?}
     */
    get isPrimaryAction() {
        return this.isNext || this.isDanger || this.isFinish;
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const /** @type {?} */ disabled = true;
        const /** @type {?} */ nav = this.navService;
        const /** @type {?} */ page = this.navService.currentPage;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !disabled;
        }
        if (this.disabled || nav.wizardStopNavigation || !page) {
            return true;
        }
        if (this.isCancel) {
            return !disabled;
        }
        if (this.isPrevious && (nav.currentPageIsFirst || page.previousStepDisabled)) {
            return disabled;
        }
        if (this.isDanger && !page.readyToComplete) {
            return disabled;
        }
        if (this.isNext && (nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        if (this.isFinish && (!nav.currentPageIsLast || !page.readyToComplete)) {
            return disabled;
        }
        return !disabled;
    }
    /**
     * @return {?}
     */
    get isHidden() {
        // dealing with negatives here. cognitively easier to think of it like this...
        const /** @type {?} */ hidden = true;
        const /** @type {?} */ nav = this.navService;
        // Ensure we don't change the response until buttons are ready to avoid chocolate
        if (!this.buttonService.buttonsReady) {
            return !hidden;
        }
        if (this.hidden) {
            return true;
        }
        if (this.isCancel) {
            return !hidden;
        }
        if (this.isPrevious && nav.currentPageIsFirst) {
            return hidden;
        }
        if (this.isNext && nav.currentPageIsLast) {
            return hidden;
        }
        if (this.isFinish && !nav.currentPageIsLast) {
            return hidden;
        }
        return !hidden;
    }
    /**
     * @return {?}
     */
    click() {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    }
}
WizardButton.decorators = [
    { type: Component, args: [{
                selector: "clr-wizard-button",
                template: `
        <button
            type="button"
            class="btn clr-wizard-btn"
            [class.btn-link]="isCancel"
            [class.clr-wizard-btn--tertiary]="isCancel"
            [class.btn-outline]="isPrevious"
            [class.clr-wizard-btn--secondary]="isPrevious"
            [class.btn-primary]="isPrimaryAction"
            [class.clr-wizard-btn--primary]="isPrimaryAction"
            [class.btn-success]="isFinish"
            [class.btn-danger]="isDanger"
            [class.disabled]="isDisabled"
            (click)="click()">
            <ng-content></ng-content>
        </button>
    `,
                host: { "class": "clr-wizard-btn-wrapper", "[attr.aria-hidden]": "isHidden" },
                styles: ["[aria-hidden=\"true\"] { display: none; }"]
            },] },
];
/**
 * @nocollapse
 */
WizardButton.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: ButtonHubService, },
];
WizardButton.propDecorators = {
    'type': [{ type: Input, args: ["type",] },],
    'disabled': [{ type: Input, args: ["clrWizardButtonDisabled",] },],
    'hidden': [{ type: Input, args: ["clrWizardButtonHidden",] },],
    'wasClicked': [{ type: Output, args: ["clrWizardButtonClicked",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardCustomTags {
}
// No behavior
// The only purpose is to "declare" the tag in Angular
WizardCustomTags.decorators = [
    { type: Directive, args: [{ selector: "clr-wizard-title, clr-wizard-pagetitle" },] },
];
/**
 * @nocollapse
 */
WizardCustomTags.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardStepnav {
    /**
     * @param {?} pageService
     */
    constructor(pageService) {
        this.pageService = pageService;
    }
}
WizardStepnav.decorators = [
    { type: Component, args: [{
                selector: "clr-wizard-stepnav",
                template: `
        <ol class="clr-wizard-stepnav-list" role="tablist">
            <li *ngFor="let page of pageService.pages" clr-wizard-stepnav-item 
            [page]="page" class="clr-wizard-stepnav-item"></li>
        </ol>
    `,
                host: { "class": "clr-wizard-stepnav" }
            },] },
];
/**
 * @nocollapse
 */
WizardStepnav.ctorParameters = () => [
    { type: PageCollectionService, },
];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class WizardStepnavItem {
    /**
     * @param {?} navService
     * @param {?} pageCollection
     */
    constructor(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @return {?}
     */
    pageGuard() {
        if (!this.page) {
            throw new Error("Wizard stepnav item is not associated with a wizard page.");
        }
    }
    /**
     * @return {?}
     */
    get id() {
        this.pageGuard();
        return this.pageCollection.getStepItemIdForPage(this.page);
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        this.pageGuard();
        return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
    }
    /**
     * @return {?}
     */
    get isCurrent() {
        this.pageGuard();
        return this.page.current;
    }
    /**
     * @return {?}
     */
    get isComplete() {
        this.pageGuard();
        return this.page.completed;
    }
    /**
     * @return {?}
     */
    get canNavigate() {
        this.pageGuard();
        return this.pageCollection.previousPageIsCompleted(this.page);
    }
    /**
     * @return {?}
     */
    click() {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    }
}
WizardStepnavItem.decorators = [
    { type: Component, args: [{
                selector: "[clr-wizard-stepnav-item]",
                template: `
        <button type="button" class="btn btn-link clr-wizard-stepnav-link" (click)="click()">
            <ng-template [ngTemplateOutlet]="page.navTitle"></ng-template>
        </button>
    `,
                host: {
                    "[id]": "id",
                    "[attr.aria-selected]": "isCurrent",
                    "[attr.aria-controls]": "id",
                    "role": "presentation",
                    "[class.clr-nav-link]": "true",
                    "[class.nav-item]": "true",
                    "[class.active]": "isCurrent",
                    "[class.disabled]": "isDisabled",
                    "[class.no-click]": "!canNavigate",
                    "[class.complete]": "isComplete"
                }
            },] },
];
/**
 * @nocollapse
 */
WizardStepnavItem.ctorParameters = () => [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
];
WizardStepnavItem.propDecorators = {
    'page': [{ type: Input, args: ["page",] },],
};

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// directives
const WIZARD_DIRECTIVES = [
    Wizard, WizardPage, WizardStepnav, WizardStepnavItem, WizardButton, WizardHeaderAction, WizardCustomTags,
    WizardPageTitleDirective, WizardPageNavTitleDirective, WizardPageButtonsDirective, WizardPageHeaderActionsDirective
];

/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClrWizardModule {
}
ClrWizardModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ClrModalModule, ClrAlertModule],
                declarations: [WIZARD_DIRECTIVES],
                exports: [WIZARD_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrWizardModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
class ClarityModule {
    /**
     * @deprecated
     * @return {?}
     */
    static forRoot() {
        return { ngModule: ClarityModule, providers: [] };
    }
    /**
     * @deprecated
     * @return {?}
     */
    static forChild() {
        return { ngModule: ClarityModule, providers: [] };
    }
}
ClarityModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    ClrEmphasisModule, ClrDataModule, ClrIconModule, ClrModalModule, ClrLoadingModule, ClrIfExpandModule,
                    ClrConditionalModule, ClrFocusTrapModule, ClrButtonModule, ClrCodeModule, ClrFormsModule, ClrLayoutModule,
                    ClrPopoverModule, ClrWizardModule
                ]
            },] },
];
/**
 * @nocollapse
 */
ClarityModule.ctorParameters = () => [];

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @return {?}
 */
function collapse() {
    "use strict";
    return [
        state("true", style({ "height": 0, "overflow-y": "hidden" })),
        transition("true => false", [animate("0.2s ease-in-out", style({ "height": "*", "overflow-y": "hidden" }))]),
        transition("false => true", [style({ "height": "*", "overflow-y": "hidden" }), animate("0.2s ease-in-out")])
    ];
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?=} opacity
 * @return {?}
 */
function fade(opacity = 1) {
    return [
        transition("void => *", [style({ opacity: 0 }), animate("0.2s ease-in-out", style({ opacity: opacity }))]),
        transition("* => void", [animate("0.2s ease-in-out", style({ opacity: 0 }))])
    ];
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} direction
 * @return {?}
 */
function fadeSlide(direction) {
    let /** @type {?} */ transform = null;
    if (direction === "up") {
        transform = "translate(0, 25%)";
    }
    else if (direction === "down") {
        transform = "translate(0, -25%)";
    }
    else if (direction === "left") {
        transform = "translate(25%, 0)";
    }
    else if (direction === "right") {
        transform = "translate(-25%, 0)";
    }
    else {
        throw new Error("Unknown direction " + direction + " for slide animation.");
    }
    return [
        transition("void => *", [style({ opacity: 0, transform: transform }), animate("0.2s ease-in-out")]),
        transition("* => void", [animate("0.2s ease-in-out", style({ opacity: 0, transform: transform }))])
    ];
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @param {?} direction
 * @return {?}
 */
function slide(direction) {
    let /** @type {?} */ transform = null;
    if (direction === "up") {
        transform = "translate(0, 25%)";
    }
    else if (direction === "down") {
        transform = "translate(0, -25%)";
    }
    else if (direction === "left") {
        transform = "translate(25%, 0)";
    }
    else if (direction === "right") {
        transform = "translate(-25%, 0)";
    }
    else {
        throw new Error("Unknown direction " + direction + " for slide animation.");
    }
    return [
        transition("void => *", [style({ transform: transform }), animate("0.2s ease-in-out")]),
        transition("* => void", [animate("0.2s ease-in-out", style({ transform: transform }))])
    ];
}

/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FocusTrapTracker as ÇlrFocusTrapTracker, ClarityModule, ClrButtonModule, ClrButtonGroupModule, ClrLoadingButtonModule, ClrSyntaxHighlightModule, ClrDataModule, ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule, ClrEmphasisModule, ClrAlertModule, ClrFormsModule, ClrIconModule, ClrLayoutModule, ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrModalModule, ClrPopoverModule, ClrDropdownModule, ClrTooltipModule, ClrWizardModule, ClrLoadingModule, ALERT_DIRECTIVES, Alert, AlertItem, BUTTON_GROUP_DIRECTIVES, LOADING_BUTTON_DIRECTIVES, CHECKBOX_DIRECTIVES, Checkbox, CODE_HIGHLIGHT_DIRECTIVES, CodeHighlight, DROPDOWN_DIRECTIVES, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, menuPositions, DATAGRID_DIRECTIVES, Datagrid, DatagridActionBar, DatagridActionOverflow, DatagridColumn, DatagridColumnToggle, DatagridHideableColumnDirective, DatagridFilter, DatagridItems, DatagridRow, DatagridRowDetail, DatagridCell, DatagridFooter, DatagridPagination, DatagridPlaceholder, SortOrder, DatagridStringFilter, DatagridPropertyStringFilter, DatagridPropertyComparator, TREE_VIEW_DIRECTIVES, TreeNode, STACK_VIEW_DIRECTIVES, StackView, StackViewCustomTags, StackHeader, StackBlock, StackInput, StackSelect, ICON_DIRECTIVES, LAYOUT_DIRECTIVES, MainContainer, MODAL_DIRECTIVES, Modal, NAVIGATION_DIRECTIVES, Header, NavLevelDirective, TABS_DIRECTIVES, Tabs, Tab, TabContent, TabOverflowContent, TabLinkDirective, TOOLTIP_DIRECTIVES, Tooltip, TooltipTrigger, TooltipContent, WIZARD_DIRECTIVES, Wizard, WizardPage, WizardStepnav, WizardStepnavItem, DEFAULT_BUTTON_TYPES, CUSTOM_BUTTON_TYPES, WizardButton, WizardHeaderAction, WizardCustomTags, WizardPageTitleDirective, WizardPageNavTitleDirective, WizardPageButtonsDirective, WizardPageHeaderActionsDirective, collapse, fade, fadeSlide, slide, LOADING_DIRECTIVES, Loading, LoadingListener, Button as ɵcq, ButtonGroup as ɵcs, LoadingButton as ɵcp, ButtonInGroupService as ɵcr, ClrCodeModule as ɵct, DatagridRowExpandAnimation as ɵcc, ActionableOompaLoompa as ɵbz, DatagridWillyWonka as ɵbx, ExpandableOompaLoompa as ɵcb, DatagridDetailRegisterer as ɵbn, CustomFilter as ɵbj, DragDispatcher as ɵbi, FiltersProvider as ɵy, ExpandableRowsCount as ɵbe, HideableColumnService as ɵbf, Items as ɵx, Page as ɵz, RowActionService as ɵbd, Selection as ɵw, Sort as ɵbb, StateDebouncer as ɵba, StateProvider as ɵbg, DatagridBodyRenderer as ɵbu, DatagridCellRenderer as ɵbw, DatagridColumnResizer as ɵbr, DomAdapter as ɵbp, DatagridHeadRenderer as ɵbt, DatagridHeaderRenderer as ɵbq, DatagridMainRenderer as ɵbo, DatagridRenderOrganizer as ɵbc, DatagridRowRenderer as ɵbv, DatagridTableRenderer as ɵbs, DatagridFilterRegistrar as ɵbh, StackControl as ɵcg, AbstractTreeSelection as ɵch, clrTreeSelectionProviderFactory as ɵcj, TreeSelectionService as ɵci, AlertIconAndTypesService as ɵs, IconCustomTag as ɵa, MainContainerWillyWonka as ɵcw, NavDetectionOompaLoompa as ɵcv, clrResponsiveNavigationProvider as ɵcx, ClrResponsiveNavigationService as ɵcu, AriaService as ɵdb, ActiveOompaLoompa as ɵde, TabsWillyWonka as ɵdd, TabsService as ɵdc, VERTICAL_NAV_DIRECTIVES as ɵdg, VerticalNavGroupRegistrationService as ɵdn, VerticalNavGroupService as ɵdo, VerticalNavIconService as ɵdm, VerticalNavService as ɵdl, VerticalNav as ɵdi, VerticalNavGroup as ɵdh, VerticalNavGroupChildren as ɵdp, VerticalNavIcon as ɵdk, VerticalNavLink as ɵdj, ClrVerticalNavModule as ɵdf, GHOST_PAGE_ANIMATION as ɵco, AbstractPopover as ɵj, POPOVER_DIRECTIVES as ɵc, POPOVER_HOST_ANCHOR as ɵi, PopoverDirectiveOld as ɵd, ClrCommonPopoverModule as ɵb, ROOT_DROPDOWN_PROVIDER as ɵh, RootDropdownService as ɵf, clrRootDropdownFactory as ɵg, SIGNPOST_DIRECTIVES as ɵdr, Signpost as ɵbl, SignpostContent as ɵds, SignpostTriggerDirective as ɵbm, ClrSignpostModule as ɵdq, OompaLoompa as ɵca, WillyWonka as ɵby, ClrConditionalModule as ɵk, IfActiveDirective as ɵm, IF_ACTIVE_ID as ɵo, IF_ACTIVE_ID_PROVIDER as ɵq, IfActiveService as ɵr, tokenFactory as ɵp, IfOpenDirective as ɵn, IfOpenService as ɵe, CONDITIONAL_DIRECTIVES as ɵl, ClrIfExpandModule as ɵcd, IfExpanded as ɵcf, EXPAND_DIRECTIVES as ɵce, Expand as ɵbk, FocusTrapDirective as ɵcm, ClrFocusTrapModule as ɵck, FOCUS_TRAP_DIRECTIVES as ɵcl, OUSTIDE_CLICK_DIRECTIVES as ɵu, OutsideClick as ɵv, ClrOutsideClickModule as ɵt, ScrollingService as ɵcn, TEMPLATE_REF_DIRECTIVES as ɵcz, TemplateRefContainer as ɵda, ClrTemplateRefModule as ɵcy, ButtonHubService as ɵdv, HeaderActionService as ɵdw, PageCollectionService as ɵdu, WizardNavigationService as ɵdt };
//# sourceMappingURL=clarity-angular.js.map
