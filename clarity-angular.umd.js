(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Subject'), require('@angular/forms'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/map'), require('@angular/animations'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Subject', '@angular/forms', 'rxjs/BehaviorSubject', 'rxjs/add/operator/map', '@angular/animations', '@angular/platform-browser'], factory) :
	(factory((global['clarity-angular'] = {}),global.ng.core,global.ng.common,global.Rx,global.ng.forms,global.Rx,global.Rx.Observable.prototype,global.ng.animations,global.ng.platformBrowser));
}(this, (function (exports,core,common,Subject,forms,BehaviorSubject,map,animations,platformBrowser) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var IconCustomTag = (function () {
    function IconCustomTag() {
    }
    return IconCustomTag;
}());
// No behavior
// The only purpose is to "declare" the tag in Angular
IconCustomTag.decorators = [
    { type: core.Directive, args: [{ selector: "clr-icon" },] },
];
/**
 * @nocollapse
 */
IconCustomTag.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ICON_DIRECTIVES = [IconCustomTag];
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrIconModule = (function () {
    function ClrIconModule() {
    }
    return ClrIconModule;
}());
ClrIconModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [ICON_DIRECTIVES], exports: [ICON_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrIconModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Point = {};
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
var POSITION_RELATIVE = "relative";
var POSITION_ABSOLUTE = "absolute";
var POSITION_FIXED = "fixed";
var OVERFLOW_SCROLL = "scroll";
var OVERFLOW_AUTO = "auto";
var Popover = (function () {
    /**
     * @param {?} element
     */
    function Popover(element) {
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
    Popover.prototype.anchor = function (anchor, anchorAlign, popoverAlign, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offsetX, offsetX = _c === void 0 ? 0 : _c, _d = _b.offsetY, offsetY = _d === void 0 ? 0 : _d, _e = _b.useAnchorParent, useAnchorParent = _e === void 0 ? false : _e;
        // TODO: we are assuming here that the popover is inside or next to the anchor.
        // We'd need to go up the popover tree too otherwise
        this.addScrollEventListeners(anchor);
        if (useAnchorParent) {
            anchor = anchor.parentNode;
        }
        // explicitly override anchor's style to static
        anchor.style.position = "static";
        var /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        var /** @type {?} */ popoverRect = this.element.getBoundingClientRect();
        // position of left top corner of anchor + the offset
        var /** @type {?} */ leftDiff = anchorRect.left - popoverRect.left + offsetX;
        var /** @type {?} */ topDiff = anchorRect.top - popoverRect.top + offsetY;
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
        var /** @type {?} */ popoverComputedStyle = getComputedStyle(this.element);
        var /** @type {?} */ marginLeft = parseInt(popoverComputedStyle.marginLeft, 10);
        var /** @type {?} */ marginRight = parseInt(popoverComputedStyle.marginRight, 10);
        var /** @type {?} */ marginTop = parseInt(popoverComputedStyle.marginTop, 10);
        var /** @type {?} */ marginBottom = parseInt(popoverComputedStyle.marginBottom, 10);
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
        this.element.style.transform = "translateX(" + leftDiff + "px) translateY(" + topDiff + "px)";
        return this._scroll.asObservable();
    };
    /**
     * @return {?}
     */
    Popover.prototype.release = function () {
        this.element.style.transform = "";
        this.removeScrollEventListeners();
    };
    /**
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.isPositioned = function (container) {
        var /** @type {?} */ position = getComputedStyle(container).position;
        return position === POSITION_RELATIVE || position === POSITION_ABSOLUTE || position === POSITION_FIXED;
    };
    /**
     * @return {?}
     */
    Popover.prototype.emitScrollEvent = function () {
        this._scroll.next();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Popover.prototype.addScrollEventListeners = function (e) {
        this._scroll = new Subject.Subject();
        var /** @type {?} */ anchor = e;
        var /** @type {?} */ current = e;
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
    };
    /**
     * @return {?}
     */
    Popover.prototype.removeScrollEventListeners = function () {
        for (var _i = 0, _a = this.scrollableElements; _i < _a.length; _i++) {
            var elem = _a[_i];
            elem.removeEventListener("scroll", this.boundOnScrollListener);
        }
        this.scrollableElements.length = 0;
        if (this._scroll) {
            this._scroll.complete();
            delete this._scroll;
        }
    };
    /**
     * @param {?} container
     * @return {?}
     */
    Popover.prototype.scrolls = function (container) {
        var /** @type {?} */ computedStyles = getComputedStyle(container);
        return computedStyles.overflowX === OVERFLOW_SCROLL || computedStyles.overflowX === OVERFLOW_AUTO ||
            computedStyles.overflowY === OVERFLOW_SCROLL || computedStyles.overflowY === OVERFLOW_AUTO;
    };
    return Popover;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var openCount = 0;
var waiting = [];
var PopoverDirectiveOld = (function () {
    /**
     * @param {?} templateRef
     * @param {?} viewContainer
     */
    function PopoverDirectiveOld(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.popoverOptions = {};
        this.clrPopoverOldChange = new core.EventEmitter(false);
    }
    Object.defineProperty(PopoverDirectiveOld.prototype, "clrPopoverOld", {
        /**
         * @param {?} open
         * @return {?}
         */
        set: function (open) {
            var _this = this;
            if (open) {
                if (this.popoverOptions.allowMultipleOpen) {
                    this.createPopover();
                }
                else {
                    if (openCount === 0) {
                        this.createPopover();
                    }
                    else {
                        waiting.push(function () {
                            _this.createPopover();
                        });
                    }
                }
            }
            else {
                this.viewContainer.clear();
                this.destroyPopover();
                if (!this.popoverOptions.allowMultipleOpen) {
                    if (waiting.length > 0) {
                        var /** @type {?} */ createPopoverFn = waiting.shift();
                        createPopoverFn();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.createPopover = function () {
        var _this = this;
        var /** @type {?} */ embeddedViewRef = (this.viewContainer.createEmbeddedView(this.templateRef));
        // TODO: Not sure of the risks associated with using this. Find an alternative.
        // Needed for find the correct height and width of dynamically created views
        // inside of the popover. For Eg: Button Groups
        embeddedViewRef.detectChanges();
        // filter out other nodes in the view ref so we are only left with element nodes
        var /** @type {?} */ elementNodes = embeddedViewRef.rootNodes.filter(function (node) {
            return node.nodeType === 1;
        });
        // we take the first element node in the embedded view; usually there should only be one anyways
        this._popoverInstance = new Popover(elementNodes[0]);
        this._subscription =
            this._popoverInstance.anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(function () {
                _this.clrPopoverOldChange.emit(false);
            });
        openCount++;
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.destroyPopover = function () {
        if (this._popoverInstance) {
            this._subscription.unsubscribe();
            this._popoverInstance.release();
            delete this._popoverInstance;
            openCount--;
        }
    };
    /**
     * @return {?}
     */
    PopoverDirectiveOld.prototype.ngOnDestroy = function () {
        this.destroyPopover();
    };
    return PopoverDirectiveOld;
}());
PopoverDirectiveOld.decorators = [
    { type: core.Directive, args: [{ selector: "[clrPopoverOld]" },] },
];
/**
 * @nocollapse
 */
PopoverDirectiveOld.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
PopoverDirectiveOld.propDecorators = {
    'anchorElem': [{ type: core.Input, args: ["clrPopoverOldAnchor",] },],
    'anchorPoint': [{ type: core.Input, args: ["clrPopoverOldAnchorPoint",] },],
    'popoverPoint': [{ type: core.Input, args: ["clrPopoverOldPopoverPoint",] },],
    'popoverOptions': [{ type: core.Input, args: ["clrPopoverOldOptions",] },],
    'clrPopoverOldChange': [{ type: core.Output, args: ["clrPopoverOldChange",] },],
    'clrPopoverOld': [{ type: core.Input },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var POPOVER_DIRECTIVES = [PopoverDirectiveOld];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCommonPopoverModule = (function () {
    function ClrCommonPopoverModule() {
    }
    return ClrCommonPopoverModule;
}());
ClrCommonPopoverModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [POPOVER_DIRECTIVES], exports: [POPOVER_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrCommonPopoverModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ButtonInGroupService = (function () {
    function ButtonInGroupService() {
        this._changes = new Subject.Subject();
    }
    Object.defineProperty(ButtonInGroupService.prototype, "changes", {
        /**
         * @return {?}
         */
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} button
     * @return {?}
     */
    ButtonInGroupService.prototype.updateButtonGroup = function (button) {
        this._changes.next(button);
    };
    return ButtonInGroupService;
}());
ButtonInGroupService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ButtonInGroupService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Button = (function () {
    /**
     * @param {?} buttonInGroupService
     */
    function Button(buttonInGroupService) {
        this.buttonInGroupService = buttonInGroupService;
        this._enableService = false;
        this._inMenu = false;
        this._classNames = "btn";
        this._name = null;
        this._type = null;
        this._disabled = null;
        this._click = new core.EventEmitter(false);
    }
    Object.defineProperty(Button.prototype, "inMenu", {
        /**
         * @return {?}
         */
        get: function () {
            return this._inMenu;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this._inMenu !== value) {
                this._inMenu = value;
                // We check if the service flag is enabled
                // and if the service exists because the service is optional
                if (this._enableService && this.buttonInGroupService) {
                    this.buttonInGroupService.updateButtonGroup(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "classNames", {
        /**
         * @return {?}
         */
        get: function () {
            return this._classNames;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (typeof value === "string") {
                var /** @type {?} */ classNames = value.split(" ");
                if (classNames.indexOf("btn") === -1) {
                    classNames.push("btn");
                }
                this._classNames = classNames.join(" ");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "name", {
        /**
         * @return {?}
         */
        get: function () {
            return this._name;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (typeof value === "string") {
                this._name = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "type", {
        /**
         * @return {?}
         */
        get: function () {
            return this._type;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (typeof value === "string") {
                this._type = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== null && value !== false) {
                this._disabled = "";
            }
            else {
                this._disabled = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Button.prototype.emitClick = function () {
        this._click.emit(true);
    };
    /**
     * @return {?}
     */
    Button.prototype.ngAfterViewInit = function () {
        this._enableService = true;
    };
    return Button;
}());
Button.decorators = [
    { type: core.Component, args: [{
                selector: "clr-button",
                template: "\n        <ng-template #buttonProjectedRef>\n            <button \n                [class]=\"classNames\" \n                (click)=\"emitClick()\"\n                [attr.type]=\"type\"\n                [attr.name]=\"name\"\n                [attr.disabled]=\"disabled\">\n                <ng-content></ng-content>\n            </button>\n        </ng-template>\n    "
            },] },
];
/**
 * @nocollapse
 */
Button.ctorParameters = function () { return [
    { type: ButtonInGroupService, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
Button.propDecorators = {
    'templateRef': [{ type: core.ViewChild, args: ["buttonProjectedRef",] },],
    'inMenu': [{ type: core.Input, args: ["clrInMenu",] },],
    'classNames': [{ type: core.Input, args: ["class",] },],
    'name': [{ type: core.Input, args: ["name",] },],
    'type': [{ type: core.Input, args: ["type",] },],
    'disabled': [{ type: core.Input, args: ["disabled",] },],
    '_click': [{ type: core.Output, args: ["click",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var menuPositions = ["bottom-left", "bottom-right", "top-left", "top-right", "left-bottom", "left-top", "right-bottom", "right-top"];
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ButtonGroup = (function () {
    /**
     * @param {?} buttonGroupNewService
     * @param {?} elementRef
     */
    function ButtonGroup(buttonGroupNewService, elementRef) {
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
    ButtonGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initializeButtons();
        this.buttonGroupNewService.changes.subscribe(function (button) { return _this.rearrangeButton(button); });
        this.buttons.changes.subscribe(function () {
            _this.initializeButtons();
        });
    };
    /**
     * Moves the button into the other ViewContainer
     * when an update is received.
     *
     * @param {?} button
     * @return {?}
     */
    ButtonGroup.prototype.rearrangeButton = function (button) {
        var /** @type {?} */ fromView;
        var /** @type {?} */ toView;
        if (button.inMenu) {
            fromView = this.inlineButtons;
            toView = this.menuButtons;
        }
        else {
            fromView = this.menuButtons;
            toView = this.inlineButtons;
        }
        var /** @type {?} */ index = fromView.indexOf(button);
        if (index > -1) {
            fromView.splice(index, 1);
            var /** @type {?} */ moveIndex = this.getMoveIndex(button);
            if (moveIndex <= toView.length) {
                toView.splice(moveIndex, 0, button);
            }
        }
    };
    /**
     * Author: Eudes
     *
     * Finds the order of a button w.r.t other buttons
     *
     * @param {?} buttonToMove
     * @return {?}
     */
    ButtonGroup.prototype.getMoveIndex = function (buttonToMove) {
        var /** @type {?} */ tempArr = this.buttons.filter(function (button) { return (button.inMenu === buttonToMove.inMenu); });
        return tempArr.indexOf(buttonToMove);
    };
    /**
     * Finds where each button belongs based on
     * the ContentChildren
     * @return {?}
     */
    ButtonGroup.prototype.initializeButtons = function () {
        var /** @type {?} */ tempInlineButtons = [];
        var /** @type {?} */ tempInMenuButtons = [];
        this.buttons.forEach(function (button) {
            if (button.inMenu) {
                tempInMenuButtons.push(button);
            }
            else {
                tempInlineButtons.push(button);
            }
        });
        this.inlineButtons = tempInlineButtons;
        this.menuButtons = tempInMenuButtons;
    };
    Object.defineProperty(ButtonGroup.prototype, "menuPosition", {
        /**
         * @return {?}
         */
        get: function () {
            return this._menuPosition;
        },
        /**
         * @param {?} pos
         * @return {?}
         */
        set: function (pos) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroup.prototype, "openMenu", {
        /**
         * @return {?}
         */
        get: function () {
            return this._openMenu;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._openMenu = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Toggle the Dropdown Menu when the Dropdown Toggle is
     * clicked. Also set a flag that indicates that the toggle
     * was clicked so that we don't traverse the DOM to find the
     * location of the click.
     * @return {?}
     */
    ButtonGroup.prototype.toggleMenu = function () {
        this.openMenu = !this.openMenu;
        this._overflowMenuToggleClicked = true;
    };
    /**
     * Called on mouse clicks anywhere in the DOM.
     * Checks to see if the mouseclick happened on the host or outside
     * @param {?} target
     * @return {?}
     */
    ButtonGroup.prototype.onMouseClick = function (target) {
        if (this.openMenu && !this._overflowMenuToggleClicked) {
            // Reset the overflow menu toggle clicked flag
            this._overflowMenuToggleClicked = false;
            var /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
            var /** @type {?} */ host = this.elementRef.nativeElement; // Current Button Group
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
    };
    return ButtonGroup;
}());
ButtonGroup.decorators = [
    { type: core.Component, args: [{
                selector: "clr-button-group",
                template: "\n      <ng-container *ngFor=\"let inlineButton of inlineButtons\">\n          <ng-template [ngTemplateOutlet]=\"inlineButton.templateRef\"></ng-template>\n      </ng-container>\n      <ng-container *ngIf=\"menuButtons.length > 0\">\n          <div\n              class=\"btn-group-overflow open\"\n              [ngClass]=\"menuPosition\"\n              #anchor>\n              <button\n                  class=\"btn dropdown-toggle\"\n                  (click)=\"toggleMenu()\">\n                  <clr-icon shape=\"ellipsis-horizontal\"></clr-icon>\n              </button>\n              <div\n                  class=\"dropdown-menu\"\n                  *clrPopoverOld=\"openMenu; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint;\">\n                  <ng-template [ngTemplateOutlet]=\"ref\"></ng-template>\n              </div>\n          </div>\n      </ng-container>\n      <ng-template #ref>\n          <ng-container *ngFor=\"let menuButton of menuButtons\">\n              <ng-template [ngTemplateOutlet]=\"menuButton.templateRef\"></ng-template>\n          </ng-container>\n      </ng-template>\n    ",
                providers: [ButtonInGroupService],
                host: { "[class.btn-group]": "true" }
            },] },
];
/**
 * @nocollapse
 */
ButtonGroup.ctorParameters = function () { return [
    { type: ButtonInGroupService, },
    { type: core.ElementRef, },
]; };
ButtonGroup.propDecorators = {
    'buttons': [{ type: core.ContentChildren, args: [Button,] },],
    'menuPosition': [{ type: core.Input, args: ["clrMenuPosition",] },],
    'onMouseClick': [{ type: core.HostListener, args: ["document:click", ["$event.target"],] },],
};
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var BUTTON_GROUP_DIRECTIVES = [Button, ButtonGroup];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButtonGroupModule = (function () {
    function ClrButtonGroupModule() {
    }
    return ClrButtonGroupModule;
}());
ClrButtonGroupModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrCommonPopoverModule],
                declarations: [BUTTON_GROUP_DIRECTIVES],
                exports: [BUTTON_GROUP_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrButtonGroupModule.ctorParameters = function () { return []; };
/**
 * This is an abstract class because we need it to still be a valid token for dependency injection after transpiling.
 * This does not mean you should extend it, simply implementing it is fine.
 * @abstract
 */
var LoadingListener = (function () {
    function LoadingListener() {
    }
    /**
     * @abstract
     * @return {?}
     */
    LoadingListener.prototype.startLoading = function () { };
    /**
     * @abstract
     * @return {?}
     */
    LoadingListener.prototype.doneLoading = function () { };
    return LoadingListener;
}());
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Loading = (function () {
    /**
     * @param {?} listener
     */
    function Loading(listener) {
        this.listener = listener;
        this._loading = false;
    }
    Object.defineProperty(Loading.prototype, "loading", {
        /**
         * @return {?}
         */
        get: function () {
            return this._loading;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Loading.prototype.ngOnDestroy = function () {
        this.loading = false;
    };
    return Loading;
}());
Loading.decorators = [
    { type: core.Directive, args: [{ selector: "[clrLoading]" },] },
];
/**
 * @nocollapse
 */
Loading.ctorParameters = function () { return [
    { type: LoadingListener, decorators: [{ type: core.Optional },] },
]; };
Loading.propDecorators = {
    'loading': [{ type: core.Input, args: ["clrLoading",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var LOADING_DIRECTIVES = [Loading];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLoadingModule = (function () {
    function ClrLoadingModule() {
    }
    return ClrLoadingModule;
}());
ClrLoadingModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [LOADING_DIRECTIVES], exports: [LOADING_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrLoadingModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var LoadingButton = (function () {
    function LoadingButton() {
    }
    /**
     * @return {?}
     */
    LoadingButton.prototype.startLoading = function () {
        this.loading = true;
    };
    /**
     * @return {?}
     */
    LoadingButton.prototype.doneLoading = function () {
        this.loading = false;
    };
    return LoadingButton;
}());
LoadingButton.decorators = [
    { type: core.Component, args: [{
                selector: "button[clrLoading]",
                template: "\n        <span class=\"spinner spinner-inline\" *ngIf=\"loading\"></span>\n        <ng-content></ng-content>\n    ",
                providers: [{ provide: LoadingListener, useExisting: LoadingButton }]
            },] },
];
/**
 * @nocollapse
 */
LoadingButton.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var LOADING_BUTTON_DIRECTIVES = [LoadingButton];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLoadingButtonModule = (function () {
    function ClrLoadingButtonModule() {
    }
    return ClrLoadingButtonModule;
}());
ClrLoadingButtonModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrLoadingModule],
                declarations: [LOADING_BUTTON_DIRECTIVES],
                exports: [LOADING_BUTTON_DIRECTIVES, ClrLoadingModule]
            },] },
];
/**
 * @nocollapse
 */
ClrLoadingButtonModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrButtonModule = (function () {
    function ClrButtonModule() {
    }
    return ClrButtonModule;
}());
ClrButtonModule.decorators = [
    { type: core.NgModule, args: [{
                exports: [
                    ClrLoadingButtonModule,
                    ClrButtonGroupModule,
                ]
            },] },
];
/**
 * @nocollapse
 */
ClrButtonModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CodeHighlight = (function () {
    /**
     * @param {?} _el
     * @param {?} renderer
     * @param {?} platformId
     */
    function CodeHighlight(_el, renderer, platformId) {
        this._el = _el;
        this.renderer = renderer;
        this.platformId = platformId;
        this._highlight = "";
    }
    /**
     * @return {?}
     */
    CodeHighlight.prototype.ngAfterContentInit = function () {
        this.redraw();
    };
    /**
     * @return {?}
     */
    CodeHighlight.prototype.redraw = function () {
        // Only run Prism in browser engines
        if (this._el && this._el.nativeElement && common.isPlatformBrowser(this.platformId) && undefined !== Prism) {
            Prism.highlightElement(this._el.nativeElement);
        }
    };
    Object.defineProperty(CodeHighlight.prototype, "highlight", {
        /**
         * @return {?}
         */
        get: function () {
            return this._highlight;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (val && val.trim() !== "") {
                this._highlight = val;
                this.renderer.addClass(this._el.nativeElement, this._highlight);
            }
        },
        enumerable: true,
        configurable: true
    });
    return CodeHighlight;
}());
CodeHighlight.decorators = [
    { type: core.Directive, args: [{ selector: "code[clr-code-highlight]" },] },
];
/**
 * @nocollapse
 */
CodeHighlight.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
CodeHighlight.propDecorators = {
    'highlight': [{ type: core.Input, args: ["clr-code-highlight",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CODE_HIGHLIGHT_DIRECTIVES = [CodeHighlight];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrSyntaxHighlightModule = (function () {
    function ClrSyntaxHighlightModule() {
    }
    return ClrSyntaxHighlightModule;
}());
ClrSyntaxHighlightModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CODE_HIGHLIGHT_DIRECTIVES], exports: [CODE_HIGHLIGHT_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrSyntaxHighlightModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrCodeModule = (function () {
    function ClrCodeModule() {
    }
    return ClrCodeModule;
}());
ClrCodeModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrSyntaxHighlightModule] },] },
];
/**
 * @nocollapse
 */
ClrCodeModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Private counter to generate unique IDs for the checkboxes, to bind the labels to them.
 */
var latestId = 0;
var Checkbox = (function () {
    function Checkbox() {
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (latestId++).toString();
        this.name = null;
        this.disabled = false;
        this.inline = false;
        this._checked = false;
        this._indeterminate = false;
        this.indeterminateChange = new core.EventEmitter(false);
        this.change = new core.EventEmitter(false);
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function () { };
    }
    Object.defineProperty(Checkbox.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return "clr-checkbox-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "checked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._checked;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== this._checked) {
                if (this._indeterminate) {
                    this.setIndeterminate(false);
                }
                this.setChecked(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "indeterminate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._indeterminate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._indeterminate !== value) {
                if (this._checked) {
                    this.setChecked(false);
                }
                this.setIndeterminate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    Checkbox.prototype.setIndeterminate = function (value) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Checkbox.prototype.setChecked = function (value) {
        this._checked = value;
        this.change.emit(this._checked);
    };
    /**
     * @return {?}
     */
    Checkbox.prototype.toggle = function () {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Checkbox.prototype.writeValue = function (value) {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    };
    /**
     * @param {?} onChange
     * @return {?}
     */
    Checkbox.prototype.registerOnChange = function (onChange) {
        this.onChangeCallback = onChange;
    };
    /**
     * @param {?} onTouched
     * @return {?}
     */
    Checkbox.prototype.registerOnTouched = function (onTouched) {
        this.onTouchedCallback = onTouched;
    };
    /**
     * @return {?}
     */
    Checkbox.prototype.touch = function () {
        this.onTouchedCallback();
    };
    /**
     * @return {?}
     */
    Checkbox.prototype.checkIndeterminateState = function () {
        if (!this.disabled) {
            this.toggle();
        }
    };
    return Checkbox;
}());
Checkbox.decorators = [
    { type: core.Component, args: [{
                selector: "clr-checkbox",
                template: "\n        <!--\n            FIXME: We are not subscribed to the change event but the click event here.\n            The reason for that is because checkboxes behave differently on IE & Edge.\n            https://stackoverflow.com/a/19447939\n            \n            To fix that, we listen to every click event and then toggle the checkbox manually\n            to make it behave the same way across the browsers we support.\n            \n            This works for cases when users toggle the checkbox using the keyboard too:\n            https://stackoverflow.com/questions/27878940/spacebar-triggering-click-event-on-checkbox\n        -->\n        <input type=\"checkbox\" [id]=\"id\" [name]=\"name\" [checked]=\"checked\"\n               [indeterminate]=\"indeterminate\" [disabled]=\"disabled\"\n               (blur)=\"touch()\" (click)=\"checkIndeterminateState()\">\n        <label [attr.for]=\"id\">\n            <ng-content></ng-content>\n        </label>\n    ",
                host: { "[class.checkbox]": "!inline", "[class.checkbox-inline]": "inline", "[class.disabled]": "disabled" },
                /*
                 * This provider lets us declare our checkbox as a ControlValueAccessor,
                 * which allows us to use [(ngModel)] directly on our component,
                 * with all the automatic features wiring that come with it.
                 */
                providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return Checkbox; }), multi: true }]
            },] },
];
/**
 * @nocollapse
 */
Checkbox.ctorParameters = function () { return []; };
Checkbox.propDecorators = {
    '_id': [{ type: core.Input, args: ["id",] },],
    'name': [{ type: core.Input, args: ["name",] },],
    'disabled': [{ type: core.Input, args: ["clrDisabled",] },],
    'inline': [{ type: core.Input, args: ["clrInline",] },],
    'checked': [{ type: core.Input, args: ["clrChecked",] },],
    'indeterminate': [{ type: core.Input, args: ["clrIndeterminate",] },],
    'indeterminateChange': [{ type: core.Output, args: ["clrIndeterminateChange",] },],
    'change': [{ type: core.Output, args: ["clrCheckedChange",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CHECKBOX_DIRECTIVES = [Checkbox];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrFormsModule = (function () {
    function ClrFormsModule() {
    }
    return ClrFormsModule;
}());
ClrFormsModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CHECKBOX_DIRECTIVES], exports: [CHECKBOX_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrFormsModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Expand = (function () {
    function Expand() {
        this.expandable = 0;
        this.replace = false;
        this._loading = false;
        this._expanded = false;
        this._animate = new Subject.Subject();
        this._expandChange = new Subject.Subject();
    }
    Object.defineProperty(Expand.prototype, "loading", {
        /**
         * @return {?}
         */
        get: function () {
            return this._loading;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (value !== this._loading) {
                this._loading = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expanded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (value !== this._expanded) {
                this._expanded = value;
                this._animate.next();
                this._expandChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "animate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._animate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expand.prototype, "expandChange", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Expand.prototype.startLoading = function () {
        this.loading = true;
    };
    /**
     * @return {?}
     */
    Expand.prototype.doneLoading = function () {
        this.loading = false;
        this._animate.next();
    };
    return Expand;
}());
Expand.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Expand.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * TODO: make this a reusable directive outside of Datagrid, like [clrLoading].
 */
var IfExpanded = (function () {
    /**
     * @param {?} template
     * @param {?} container
     * @param {?} expand
     */
    function IfExpanded(template, container, expand) {
        var _this = this;
        this.template = template;
        this.container = container;
        this.expand = expand;
        this._expanded = false;
        this.expandedChange = new core.EventEmitter(true);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
        expand.expandable++;
        this._subscriptions.push(expand.expandChange.subscribe(function () {
            _this.updateView();
            _this.expandedChange.emit(_this.expand.expanded);
        }));
    }
    Object.defineProperty(IfExpanded.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expanded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (typeof value === "boolean") {
                this.expand.expanded = value;
                this._expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    IfExpanded.prototype.updateView = function () {
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
    };
    /**
     * @return {?}
     */
    IfExpanded.prototype.ngOnInit = function () {
        this.updateView();
    };
    /**
     * @return {?}
     */
    IfExpanded.prototype.ngOnDestroy = function () {
        this.expand.expandable--;
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    return IfExpanded;
}());
IfExpanded.decorators = [
    { type: core.Directive, args: [{ selector: "[clrIfExpanded]" },] },
];
/**
 * @nocollapse
 */
IfExpanded.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: Expand, },
]; };
IfExpanded.propDecorators = {
    'expanded': [{ type: core.Input, args: ["clrIfExpanded",] },],
    'expandedChange': [{ type: core.Output, args: ["clrIfExpandedChange",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var EXPAND_DIRECTIVES = [IfExpanded];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrIfExpandModule = (function () {
    function ClrIfExpandModule() {
    }
    return ClrIfExpandModule;
}());
ClrIfExpandModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [EXPAND_DIRECTIVES], exports: [EXPAND_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrIfExpandModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var OutsideClick = (function () {
    /**
     * @param {?} el
     */
    function OutsideClick(el) {
        this.el = el;
        this.strict = false;
        this.outsideClick = new core.EventEmitter(false);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    OutsideClick.prototype.documentClick = function (event) {
        var /** @type {?} */ target = event.target; // Get the element in the DOM on which the mouse was clicked
        var /** @type {?} */ host = this.el.nativeElement; // Get the current actionMenu native HTML element
        if (target === host) {
            return;
        }
        if (!this.strict && host.contains(target)) {
            return;
        }
        this.outsideClick.emit(event);
    };
    return OutsideClick;
}());
OutsideClick.decorators = [
    { type: core.Directive, args: [{ selector: "[clrOutsideClick]" },] },
];
/**
 * @nocollapse
 */
OutsideClick.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
OutsideClick.propDecorators = {
    'strict': [{ type: core.Input, args: ["clrStrict",] },],
    'outsideClick': [{ type: core.Output, args: ["clrOutsideClick",] },],
    'documentClick': [{ type: core.HostListener, args: ["document:click", ["$event"],] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var OUSTIDE_CLICK_DIRECTIVES = [OutsideClick];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrOutsideClickModule = (function () {
    function ClrOutsideClickModule() {
    }
    return ClrOutsideClickModule;
}());
ClrOutsideClickModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [OUSTIDE_CLICK_DIRECTIVES], exports: [OUSTIDE_CLICK_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrOutsideClickModule.ctorParameters = function () { return []; };
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
var DomAdapter = (function () {
    function DomAdapter() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.userDefinedWidth = function (element) {
        element.classList.add("datagrid-cell-width-zero");
        var /** @type {?} */ userDefinedWidth = parseInt(getComputedStyle(element).getPropertyValue("width"), 10);
        element.classList.remove("datagrid-cell-width-zero");
        return userDefinedWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollBarWidth = function (element) {
        return element.offsetWidth - element.clientWidth;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.scrollWidth = function (element) {
        return element.scrollWidth || 0;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.computedHeight = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue("height"), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.clientRectRight = function (element) {
        return parseInt(element.getBoundingClientRect().right, 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.clientRectWidth = function (element) {
        return parseInt(element.getBoundingClientRect().width, 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.minWidth = function (element) {
        return parseInt(getComputedStyle(element).getPropertyValue("min-width"), 10);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DomAdapter.prototype.focus = function (element) {
        element.focus();
    };
    return DomAdapter;
}());
DomAdapter.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DomAdapter.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridRenderOrganizer = (function () {
    function DatagridRenderOrganizer() {
        this.alreadySized = false;
        this.widths = [];
        this._noLayout = new Subject.Subject();
        this._clearWidths = new Subject.Subject();
        this._detectStrictWidths = new Subject.Subject();
        this._tableMode = new Subject.Subject();
        this._computeWidths = new Subject.Subject();
        this._alignColumns = new Subject.Subject();
        this.scrollbar = new Subject.Subject();
        this.scrollbarWidth = new Subject.Subject();
        this._done = new Subject.Subject();
    }
    Object.defineProperty(DatagridRenderOrganizer.prototype, "noLayout", {
        /**
         * @return {?}
         */
        get: function () {
            return this._noLayout.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "clearWidths", {
        /**
         * @return {?}
         */
        get: function () {
            return this._clearWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "detectStrictWidths", {
        /**
         * @return {?}
         */
        get: function () {
            return this._detectStrictWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "tableMode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._tableMode.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "computeWidths", {
        /**
         * @return {?}
         */
        get: function () {
            return this._computeWidths.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "alignColumns", {
        /**
         * @return {?}
         */
        get: function () {
            return this._alignColumns.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridRenderOrganizer.prototype, "done", {
        /**
         * @return {?}
         */
        get: function () {
            return this._done.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridRenderOrganizer.prototype.resize = function () {
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
    };
    return DatagridRenderOrganizer;
}());
DatagridRenderOrganizer.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DatagridRenderOrganizer.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/*
 * This is a hack that we have to write for now because of bugs and limitations in Angular,
 * please do not use this as an example.
 */
var DatagridRowExpandAnimation = (function () {
    /**
     * @param {?} el
     * @param {?} domAdapter
     * @param {?} renderer
     * @param {?} expand
     * @param {?} renderOrganizer
     */
    function DatagridRowExpandAnimation(el, domAdapter, renderer, expand, renderOrganizer) {
        var _this = this;
        this.el = el;
        this.domAdapter = domAdapter;
        this.renderer = renderer;
        this.expand = expand;
        this.renderOrganizer = renderOrganizer;
        if (expand) {
            expand.animate.subscribe(function () {
                // We already had an animation waiting, so we just have to run in, not prepare again
                if (_this.oldHeight) {
                    setTimeout(function () { return _this.run(); });
                }
                else {
                    _this.animate();
                }
            });
        }
    }
    /**
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.animate = function () {
        var _this = this;
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
        setTimeout(function () {
            if (_this.expand.loading) {
                return;
            }
            _this.run();
        });
    };
    /**
     * @return {?}
     */
    DatagridRowExpandAnimation.prototype.run = function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, "height", null);
        // I don't like realigning the columns before the animation, since the scrollbar could appear or disappear
        // halfway, but that's a compromise we have to make for now. We can look into a smarter fix later.
        this.renderOrganizer.scrollbar.next();
        var /** @type {?} */ newHeight = this.domAdapter.computedHeight(this.el.nativeElement);
        this.running = this.el.nativeElement.animate({ height: [this.oldHeight + "px", newHeight + "px"], overflowY: ["hidden", "hidden"], easing: "ease-in-out" }, { duration: 200 });
        this.running.onfinish = function () {
            _this.renderer.setStyle(_this.el.nativeElement, "overflow-y", null);
            delete _this.running;
        };
        delete this.oldHeight;
    };
    return DatagridRowExpandAnimation;
}());
DatagridRowExpandAnimation.decorators = [
    { type: core.Directive, args: [{ selector: "clr-dg-row" },] },
];
/**
 * @nocollapse
 */
DatagridRowExpandAnimation.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: DomAdapter, },
    { type: core.Renderer2, },
    { type: Expand, },
    { type: DatagridRenderOrganizer, },
]; };
/**
 * @abstract
 */
var CustomFilter = (function () {
    function CustomFilter() {
    }
    return CustomFilter;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StateDebouncer = (function () {
    function StateDebouncer() {
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this._change = new Subject.Subject();
        this.nbChanges = 0;
    }
    Object.defineProperty(StateDebouncer.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StateDebouncer.prototype.changeStart = function () {
        this.nbChanges++;
    };
    /**
     * @return {?}
     */
    StateDebouncer.prototype.changeDone = function () {
        if (--this.nbChanges === 0) {
            this._change.next();
        }
    };
    return StateDebouncer;
}());
StateDebouncer.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
StateDebouncer.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Page = (function () {
    /**
     * @param {?} stateDebouncer
     */
    function Page(stateDebouncer) {
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
        this._change = new Subject.Subject();
        this._sizeChange = new Subject.Subject();
        /**
         * Current page
         */
        this._current = 1;
    }
    Object.defineProperty(Page.prototype, "size", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size;
        },
        /**
         * @param {?} size
         * @return {?}
         */
        set: function (size) {
            var /** @type {?} */ oldSize = this._size;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "totalItems", {
        /**
         * @return {?}
         */
        get: function () {
            return this._totalItems;
        },
        /**
         * @param {?} total
         * @return {?}
         */
        set: function (total) {
            this._totalItems = total;
            // If we have less items than before, we might need to change the current page
            if (this.current > this.last) {
                this.current = this.last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "last", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._last) {
                return this._last;
            }
            // If the last page isn't known, we compute it from the last item's index
            if (this.size > 0 && this.totalItems) {
                return Math.ceil(this.totalItems / this.size);
            }
            return 1;
        },
        /**
         * @param {?} page
         * @return {?}
         */
        set: function (page) {
            this._last = page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sizeChange", {
        /**
         * @return {?}
         */
        get: function () {
            return this._sizeChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "current", {
        /**
         * @return {?}
         */
        get: function () {
            return this._current;
        },
        /**
         * @param {?} page
         * @return {?}
         */
        set: function (page) {
            if (page !== this._current) {
                this.stateDebouncer.changeStart();
                this._current = page;
                this._change.next(page);
                this.stateDebouncer.changeDone();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    Page.prototype.previous = function () {
        if (this.current > 1) {
            this.current--;
        }
    };
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    Page.prototype.next = function () {
        if (this.current < this.last) {
            this.current++;
        }
    };
    Object.defineProperty(Page.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0
         * @return {?}
         */
        get: function () {
            if (this.size === 0) {
                return 0;
            }
            return (this.current - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0
         * @return {?}
         */
        get: function () {
            if (this.size === 0) {
                return this.totalItems - 1;
            }
            var /** @type {?} */ lastInPage = (this.current) * this.size - 1;
            if (this.totalItems) {
                lastInPage = Math.min(lastInPage, this.totalItems - 1);
            }
            return lastInPage;
        },
        enumerable: true,
        configurable: true
    });
    return Page;
}());
Page.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Page.ctorParameters = function () { return [
    { type: StateDebouncer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FiltersProvider = (function () {
    /**
     * @param {?} _page
     * @param {?} stateDebouncer
     */
    function FiltersProvider(_page, stateDebouncer) {
        this._page = _page;
        this.stateDebouncer = stateDebouncer;
        /**
         * This subject is the list of filters that changed last, not the whole list.
         * We emit a list rather than just one filter to allow batch changes to several at once.
         */
        this._change = new Subject.Subject();
        /**
         * List of all filters, whether they're active or not
         */
        this._all = [];
    }
    Object.defineProperty(FiltersProvider.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Tests if at least one filter is currently active
     * @return {?}
     */
    FiltersProvider.prototype.hasActiveFilters = function () {
        // We do not use getActiveFilters() because this function will be called much more often
        // and stopping the loop early might be relevant.
        for (var _i = 0, _a = this._all; _i < _a.length; _i++) {
            var filter = _a[_i].filter;
            if (filter && filter.isActive()) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns a list of all currently active filters
     * @return {?}
     */
    FiltersProvider.prototype.getActiveFilters = function () {
        var /** @type {?} */ ret = [];
        for (var _i = 0, _a = this._all; _i < _a.length; _i++) {
            var filter = _a[_i].filter;
            if (filter && filter.isActive()) {
                ret.push(filter);
            }
        }
        return ret;
    };
    /**
     * Registers a filter, and returns a deregistration function
     * @template F
     * @param {?} filter
     * @return {?}
     */
    FiltersProvider.prototype.add = function (filter) {
        var _this = this;
        var /** @type {?} */ index = this._all.length;
        var /** @type {?} */ subscription = filter.changes.subscribe(function () { return _this.resetPageAndEmitFilterChange([filter]); });
        var /** @type {?} */ hasUnregistered = false;
        var /** @type {?} */ registered = new RegisteredFilter(filter, function () {
            if (hasUnregistered) {
                return;
            }
            subscription.unsubscribe();
            _this._all.splice(index, 1);
            if (filter.isActive()) {
                _this.resetPageAndEmitFilterChange([]);
            }
            hasUnregistered = true;
        });
        this._all.push(registered);
        if (filter.isActive()) {
            this.resetPageAndEmitFilterChange([filter]);
        }
        return registered;
    };
    /**
     * Accepts an item if it is accepted by all currently active filters
     * @param {?} item
     * @return {?}
     */
    FiltersProvider.prototype.accepts = function (item) {
        for (var _i = 0, _a = this._all; _i < _a.length; _i++) {
            var filter = _a[_i].filter;
            if (filter && filter.isActive() && !filter.accepts(item)) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {?} filters
     * @return {?}
     */
    FiltersProvider.prototype.resetPageAndEmitFilterChange = function (filters) {
        this.stateDebouncer.changeStart();
        // filtering may change the page number such that current page number doesn't exist in the filtered dataset.
        // So here we always set the current page to 1 so that it'll fetch first page's data with the given filter.
        this._page.current = 1;
        this._change.next(filters);
        this.stateDebouncer.changeDone();
    };
    return FiltersProvider;
}());
FiltersProvider.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
FiltersProvider.ctorParameters = function () { return [
    { type: Page, },
    { type: StateDebouncer, },
]; };
var RegisteredFilter = (function () {
    /**
     * @param {?} filter
     * @param {?} unregister
     */
    function RegisteredFilter(filter, unregister) {
        this.filter = filter;
        this.unregister = unregister;
    }
    return RegisteredFilter;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
var DatagridFilterRegistrar = (function () {
    /**
     * @param {?} filters
     */
    function DatagridFilterRegistrar(filters) {
        this.filters = filters;
    }
    Object.defineProperty(DatagridFilterRegistrar.prototype, "filter", {
        /**
         * @return {?}
         */
        get: function () {
            return this.registered && this.registered.filter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} filter
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.setFilter = function (filter) {
        // If we previously had another filter, we unregister it
        this.deleteFilter();
        if (filter instanceof RegisteredFilter) {
            this.registered = (filter);
        }
        else if (filter) {
            this.registered = this.filters.add(/** @type {?} */ (filter));
        }
    };
    /**
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.deleteFilter = function () {
        if (this.registered) {
            this.registered.unregister();
            delete this.registered;
        }
    };
    /**
     * @return {?}
     */
    DatagridFilterRegistrar.prototype.ngOnDestroy = function () {
        this.deleteFilter();
    };
    return DatagridFilterRegistrar;
}());
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
var DatagridFilter = (function (_super) {
    __extends(DatagridFilter, _super);
    /**
     * @param {?} _filters
     */
    function DatagridFilter(_filters) {
        var _this = _super.call(this, _filters) || this;
        _this.anchorPoint = Point.RIGHT_BOTTOM;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.popoverOptions = { allowMultipleOpen: true };
        /**
         * Tracks whether the filter dropdown is open or not
         */
        _this._open = false;
        _this.openChanged = new core.EventEmitter(false);
        return _this;
    }
    Object.defineProperty(DatagridFilter.prototype, "open", {
        /**
         * @return {?}
         */
        get: function () {
            return this._open;
        },
        /**
         * @param {?} open
         * @return {?}
         */
        set: function (open) {
            var /** @type {?} */ boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridFilter.prototype, "customFilter", {
        /**
         * @param {?} filter
         * @return {?}
         */
        set: function (filter) {
            this.setFilter(filter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridFilter.prototype, "active", {
        /**
         * Indicates if the filter is currently active
         * @return {?}
         */
        get: function () {
            return !!this.filter && this.filter.isActive();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the filter dropdown
     * @return {?}
     */
    DatagridFilter.prototype.toggle = function () {
        this.open = !this.open;
    };
    return DatagridFilter;
}(DatagridFilterRegistrar));
DatagridFilter.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-filter",
                // We register this component as a CustomFilter, for the parent column to detect it.
                providers: [{ provide: CustomFilter, useExisting: DatagridFilter }],
                template: "\n        <button #anchor class=\"datagrid-filter-toggle\" (click)=\"toggle()\"\n            [class.datagrid-filter-open]=\"open\" [class.datagrid-filtered]=\"active\"\n            type=\"button\"></button>\n\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n             [clrPopoverOldPopoverPoint]=\"popoverPoint\" [clrPopoverOldOptions]=\"popoverOptions\">\n            <div class=\"datagrid-filter\">\n                <!-- FIXME: this whole filter part needs a final design before we can try to have a cleaner DOM -->\n                <div class=\"datagrid-filter-close-wrapper\">\n                    <button type=\"button\" class=\"close\" \n                        aria-label=\"Close\" (click)=\"open = false\"\n                        type=\"button\">\n                        <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                    </button>\n                </div>\n    \n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
            },] },
];
/**
 * @nocollapse
 */
DatagridFilter.ctorParameters = function () { return [
    { type: FiltersProvider, },
]; };
DatagridFilter.propDecorators = {
    'open': [{ type: core.Input, args: ["clrDgFilterOpen",] },],
    'openChanged': [{ type: core.Output, args: ["clrDgFilterOpenChange",] },],
    'customFilter': [{ type: core.Input, args: ["clrDgFilter",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridStringFilterImpl = (function () {
    /**
     * @param {?} filterFn
     */
    function DatagridStringFilterImpl(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject.Subject();
        /**
         * Raw input value
         */
        this._rawValue = "";
        /**
         * Input value converted to lowercase
         */
        this._lowerCaseValue = "";
    }
    Object.defineProperty(DatagridStringFilterImpl.prototype, "changes", {
        /**
         * @return {?}
         */
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._rawValue;
        },
        /**
         * Common setter for the input value
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (!value) {
                value = "";
            }
            if (value !== this._rawValue) {
                this._rawValue = value;
                this._lowerCaseValue = value.toLowerCase().trim();
                this._changes.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridStringFilterImpl.prototype, "lowerCaseValue", {
        /**
         * @return {?}
         */
        get: function () {
            return this._lowerCaseValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, meaning the input is not empty
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.isActive = function () {
        return !!this.value;
    };
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    DatagridStringFilterImpl.prototype.accepts = function (item) {
        // We always test with the lowercase value of the input, to stay case insensitive
        return this.filterFn.accepts(item, this.lowerCaseValue);
    };
    return DatagridStringFilterImpl;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridStringFilter = (function (_super) {
    __extends(DatagridStringFilter, _super);
    /**
     * @param {?} renderer
     * @param {?} filters
     * @param {?} domAdapter
     */
    function DatagridStringFilter(renderer, filters, domAdapter) {
        var _this = _super.call(this, filters) || this;
        _this.renderer = renderer;
        _this.domAdapter = domAdapter;
        /**
         * Indicates if the filter dropdown is open
         */
        _this.open = false;
        _this.filterValueChange = new core.EventEmitter();
        return _this;
    }
    Object.defineProperty(DatagridStringFilter.prototype, "customStringFilter", {
        /**
         * Customizable filter logic based on a search text
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value instanceof RegisteredFilter) {
                this.setFilter(value);
            }
            else {
                this.setFilter(new DatagridStringFilterImpl(/** @type {?} */ (value)));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.filterContainer.openChanged.subscribe(function (open) {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(function () {
                    _this.domAdapter.focus(_this.input.nativeElement);
                });
            }
        });
    };
    Object.defineProperty(DatagridStringFilter.prototype, "value", {
        /**
         * Common setter for the input value
         * @return {?}
         */
        get: function () {
            return this.filter.value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridStringFilter.prototype.close = function () {
        this.open = false;
    };
    return DatagridStringFilter;
}(DatagridFilterRegistrar));
DatagridStringFilter.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-string-filter",
                providers: [{ provide: CustomFilter, useExisting: DatagridStringFilter }],
                template: "\n        <clr-dg-filter [clrDgFilter]=\"registered\" [(clrDgFilterOpen)]=\"open\">\n            <!--\n                Even though this *ngIf looks useless because the filter container already has one,\n                it prevents NgControlStatus and other directives automatically added by Angular\n                on inputs with NgModel from freaking out because of their host binding changing\n                mid-change detection when the input is destroyed.\n            -->\n            <input #input type=\"text\" name=\"search\" [(ngModel)]=\"value\" *ngIf=\"open\"\n                (keyup.enter)=\"close()\" (keyup.escape)=\"close()\"/>\n        </clr-dg-filter>\n    "
            },] },
];
/**
 * @nocollapse
 */
DatagridStringFilter.ctorParameters = function () { return [
    { type: core.Renderer2, },
    { type: FiltersProvider, },
    { type: DomAdapter, },
]; };
DatagridStringFilter.propDecorators = {
    'customStringFilter': [{ type: core.Input, args: ["clrDgStringFilter",] },],
    'input': [{ type: core.ViewChild, args: ["input",] },],
    'filterContainer': [{ type: core.ViewChild, args: [DatagridFilter,] },],
    'value': [{ type: core.Input, args: ["clrFilterValue",] },],
    'filterValueChange': [{ type: core.Output, args: ["clrFilterValueChange",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
var OompaLoompa = (function () {
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     */
    function OompaLoompa(cdr, willyWonka) {
        var _this = this;
        this.subscription = willyWonka.chocolate.subscribe(function () {
            if (_this.latestFlavor !== _this.flavor) {
                cdr.detectChanges();
            }
        });
    }
    /**
     * @abstract
     * @return {?}
     */
    OompaLoompa.prototype.flavor = function () { };
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngAfterContentChecked = function () {
        this.latestFlavor = this.flavor;
    };
    /**
     * @return {?}
     */
    OompaLoompa.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return OompaLoompa;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var RowActionService = (function () {
    function RowActionService() {
        this.actionableCount = 0;
    }
    /**
     * @return {?}
     */
    RowActionService.prototype.register = function () {
        this.actionableCount++;
    };
    /**
     * @return {?}
     */
    RowActionService.prototype.unregister = function () {
        this.actionableCount--;
    };
    Object.defineProperty(RowActionService.prototype, "hasActionableRow", {
        /**
         * false means no rows with action
         * @return {?}
         */
        get: function () {
            return this.actionableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    return RowActionService;
}());
RowActionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
RowActionService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WillyWonka = (function () {
    function WillyWonka() {
        this._chocolate = new Subject.Subject();
    }
    Object.defineProperty(WillyWonka.prototype, "chocolate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._chocolate.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WillyWonka.prototype.ngAfterViewChecked = function () {
        this._chocolate.next();
    };
    return WillyWonka;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridWillyWonka = (function (_super) {
    __extends(DatagridWillyWonka, _super);
    function DatagridWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatagridWillyWonka;
}(WillyWonka));
DatagridWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: "clr-datagrid" },] },
];
/**
 * @nocollapse
 */
DatagridWillyWonka.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ActionableOompaLoompa = (function (_super) {
    __extends(ActionableOompaLoompa, _super);
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} rowActions
     */
    function ActionableOompaLoompa(cdr, willyWonka, rowActions) {
        var _this = this;
        if (!willyWonka) {
            throw new Error("clr-dg-row should only be used inside of a clr-datagrid");
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.rowActions = rowActions;
        return _this;
    }
    Object.defineProperty(ActionableOompaLoompa.prototype, "flavor", {
        /**
         * @return {?}
         */
        get: function () {
            return this.rowActions.hasActionableRow;
        },
        enumerable: true,
        configurable: true
    });
    return ActionableOompaLoompa;
}(OompaLoompa));
ActionableOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: "clr-datagrid, clr-dg-row" },] },
];
/**
 * @nocollapse
 */
ActionableOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: core.Optional },] },
    { type: RowActionService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ExpandableRowsCount = (function () {
    function ExpandableRowsCount() {
        this.expandableCount = 0;
    }
    /**
     * @return {?}
     */
    ExpandableRowsCount.prototype.register = function () {
        this.expandableCount++;
    };
    /**
     * @return {?}
     */
    ExpandableRowsCount.prototype.unregister = function () {
        this.expandableCount--;
    };
    Object.defineProperty(ExpandableRowsCount.prototype, "hasExpandableRow", {
        /**
         * false means no rows with action
         * @return {?}
         */
        get: function () {
            return this.expandableCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    return ExpandableRowsCount;
}());
ExpandableRowsCount.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ExpandableRowsCount.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ExpandableOompaLoompa = (function (_super) {
    __extends(ExpandableOompaLoompa, _super);
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} expandableCount
     */
    function ExpandableOompaLoompa(cdr, willyWonka, expandableCount) {
        var _this = this;
        if (!willyWonka) {
            throw new Error("clr-dg-row should only be used inside of a clr-datagrid");
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.expandableCount = expandableCount;
        return _this;
    }
    Object.defineProperty(ExpandableOompaLoompa.prototype, "flavor", {
        /**
         * @return {?}
         */
        get: function () {
            return this.expandableCount.hasExpandableRow;
        },
        enumerable: true,
        configurable: true
    });
    return ExpandableOompaLoompa;
}(OompaLoompa));
ExpandableOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: "clr-datagrid, clr-dg-row" },] },
];
/**
 * @nocollapse
 */
ExpandableOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: DatagridWillyWonka, decorators: [{ type: core.Optional },] },
    { type: ExpandableRowsCount, },
]; };
/**
 * Generic accessor for deep object properties
 * that can be specified as simple dot-separated strings.
 */
var NestedProperty = (function () {
    /**
     * @param {?} prop
     */
    function NestedProperty(prop) {
        this.prop = prop;
        if (prop.indexOf(".") >= 0) {
            this.splitProp = prop.split(".");
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    NestedProperty.prototype.getPropValue = function (item) {
        if (this.splitProp) {
            var /** @type {?} */ value = item;
            for (var _i = 0, _a = this.splitProp; _i < _a.length; _i++) {
                var nestedProp = _a[_i];
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
    };
    return NestedProperty;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridPropertyComparator = (function () {
    /**
     * @param {?} prop
     */
    function DatagridPropertyComparator(prop) {
        this.prop = prop;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    DatagridPropertyComparator.prototype.compare = function (a, b) {
        var /** @type {?} */ propA = this.nestedProp.getPropValue(a);
        var /** @type {?} */ propB = this.nestedProp.getPropValue(b);
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
    };
    return DatagridPropertyComparator;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridPropertyStringFilter = (function () {
    /**
     * @param {?} prop
     * @param {?=} exact
     */
    function DatagridPropertyStringFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} item
     * @param {?} search
     * @return {?}
     */
    DatagridPropertyStringFilter.prototype.accepts = function (item, search) {
        var /** @type {?} */ propValue = this.nestedProp.getPropValue(item);
        if (typeof propValue === "undefined") {
            return false;
        }
        else if (this.exact) {
            return ("" + propValue).toLowerCase() === search;
        }
        else {
            return ("" + propValue).toLowerCase().indexOf(search) >= 0;
        }
    };
    return DatagridPropertyStringFilter;
}());
var SortOrder = {};
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
var DragDispatcher = (function () {
    /**
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    function DragDispatcher(_ngZone, _renderer) {
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._onDragStart = new Subject.Subject();
        this._onDragMove = new Subject.Subject();
        this._onDragEnd = new Subject.Subject();
    }
    Object.defineProperty(DragDispatcher.prototype, "onDragStart", {
        /**
         * @return {?}
         */
        get: function () {
            return this._onDragStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragMove", {
        /**
         * @return {?}
         */
        get: function () {
            return this._onDragMove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragDispatcher.prototype, "onDragEnd", {
        /**
         * @return {?}
         */
        get: function () {
            return this._onDragEnd;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DragDispatcher.prototype.addDragListener = function () {
        var /** @type {?} */ handleEl = this.handleRef.nativeElement;
        this._listeners = [
            this.customDragEvent(handleEl, "mousedown", "mousemove", "mouseup"),
            this.customDragEvent(handleEl, "touchstart", "touchmove", "touchend")
        ];
    };
    /**
     * @param {?} element
     * @param {?} startOnEvent
     * @param {?} moveOnEvent
     * @param {?} endOnEvent
     * @return {?}
     */
    DragDispatcher.prototype.customDragEvent = function (element, startOnEvent, moveOnEvent, endOnEvent) {
        var _this = this;
        var /** @type {?} */ dragMoveListener;
        var /** @type {?} */ dragEndListener;
        return this._renderer.listen(element, startOnEvent, function (startEvent) {
            _this.notifyDragStart(startEvent);
            dragMoveListener = _this._ngZone.runOutsideAngular(function () {
                return _this._renderer.listen("document", moveOnEvent, function (moveEvent) {
                    _this.notifyDragMove(moveEvent);
                });
            });
            dragEndListener = _this._renderer.listen("document", endOnEvent, function (endEvent) {
                // Unsubscribing from mouseMoveListener
                dragMoveListener();
                _this.notifyDragEnd(endEvent);
                // Unsubscribing from itself
                dragEndListener();
            });
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragStart = function (event) {
        return this._onDragStart.next(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragMove = function (event) {
        return this._onDragMove.next(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DragDispatcher.prototype.notifyDragEnd = function (event) {
        return this._onDragEnd.next(event);
    };
    /**
     * @return {?}
     */
    DragDispatcher.prototype.destroy = function () {
        this._listeners.map(function (event) { return event(); });
    };
    return DragDispatcher;
}());
DragDispatcher.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DragDispatcher.ctorParameters = function () { return [
    { type: core.NgZone, },
    { type: core.Renderer2, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Sort = (function () {
    /**
     * @param {?} stateDebouncer
     */
    function Sort(stateDebouncer) {
        this.stateDebouncer = stateDebouncer;
        /**
         * Ascending order if false, descending if true
         */
        this._reverse = false;
        /**
         * The Observable that lets other classes subscribe to sort changes
         */
        this._change = new Subject.Subject();
    }
    Object.defineProperty(Sort.prototype, "comparator", {
        /**
         * @return {?}
         */
        get: function () {
            return this._comparator;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._comparator = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sort.prototype, "reverse", {
        /**
         * @return {?}
         */
        get: function () {
            return this._reverse;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.stateDebouncer.changeStart();
            this._reverse = value;
            this.emitChange();
            this.stateDebouncer.changeDone();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Sort.prototype.emitChange = function () {
        this._change.next(this);
    };
    Object.defineProperty(Sort.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    Sort.prototype.toggle = function (sortBy, forceReverse) {
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
    };
    /**
     * Clears the current sorting order
     * @return {?}
     */
    Sort.prototype.clear = function () {
        this.comparator = null;
    };
    /**
     * Compares two objects according to the current comparator
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    Sort.prototype.compare = function (a, b) {
        return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
    };
    return Sort;
}());
Sort.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Sort.ctorParameters = function () { return [
    { type: StateDebouncer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbCount = 0;
var DatagridColumn = (function (_super) {
    __extends(DatagridColumn, _super);
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} _dragDispatcher
     */
    function DatagridColumn(_sort, filters, _dragDispatcher) {
        var _this = _super.call(this, filters) || this;
        _this._sort = _sort;
        _this._dragDispatcher = _dragDispatcher;
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        _this.sortedChange = new core.EventEmitter();
        /**
         * Indicates how the column is currently sorted
         */
        _this._sortOrder = SortOrder.Unsorted;
        _this.sortOrderChange = new core.EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        _this.customFilter = false;
        _this.filterValueChange = new core.EventEmitter();
        _this._sortSubscription = _sort.change.subscribe(function (sort) {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (_this.sortOrder !== SortOrder.Unsorted && sort.comparator !== _this._sortBy) {
                _this._sortOrder = SortOrder.Unsorted;
                _this.sortOrderChange.emit(_this._sortOrder);
            }
            // deprecated: to be removed - START
            if (_this.sorted && sort.comparator !== _this._sortBy) {
                _this._sorted = false;
                _this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        _this.columnId = "dg-col-" + nbCount.toString(); // Approximate a GUID
        nbCount++;
        return _this;
        // put index here
    }
    Object.defineProperty(DatagridColumn.prototype, "hidden", {
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
        get: function () {
            return !!this.hideable && this.hideable.hidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "handleElRef", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dragDispatcher.handleRef = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "handleTrackerElRef", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._dragDispatcher.handleTrackerRef = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridColumn.prototype.ngOnDestroy = function () {
        this._sortSubscription.unsubscribe();
    };
    Object.defineProperty(DatagridColumn.prototype, "field", {
        /**
         * @return {?}
         */
        get: function () {
            return this._field;
        },
        /**
         * @param {?} field
         * @return {?}
         */
        set: function (field) {
            if (typeof field === "string") {
                this._field = field;
                if (!this.customFilter) {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
                if (!this._sortBy) {
                    this._sortBy = new DatagridPropertyComparator(field);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "sortBy", {
        /**
         * @return {?}
         */
        get: function () {
            return this._sortBy;
        },
        /**
         * @param {?} comparator
         * @return {?}
         */
        set: function (comparator) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "sortable", {
        /**
         * Indicates if the column is sortable
         * @return {?}
         */
        get: function () {
            return !!this._sortBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "sorted", {
        /**
         * @return {?}
         */
        get: function () {
            return this._sorted;
        },
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (!value && this.sorted) {
                this._sorted = false;
                this._sort.clear();
            }
            else if (value && !this.sorted) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "sortOrder", {
        /**
         * @return {?}
         */
        get: function () {
            return this._sortOrder;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    DatagridColumn.prototype.sort = function (reverse) {
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
    };
    Object.defineProperty(DatagridColumn.prototype, "asc", {
        /**
         * Indicates if the column is currently sorted in ascending order
         * @return {?}
         */
        get: function () {
            // deprecated: if condition to be removed - START
            if (typeof this.sortOrder === "undefined") {
                return this.sorted && !this._sort.reverse;
            }
            else {
                return this.sortOrder === SortOrder.Asc;
            }
            // deprecated: if condition to be removed - END
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "desc", {
        /**
         * Indicates if the column is currently sorted in descending order
         * @return {?}
         */
        get: function () {
            // deprecated: if condition to be removed - START
            if (typeof this.sortOrder === "undefined") {
                return this.sorted && this._sort.reverse;
            }
            else {
                return this.sortOrder === SortOrder.Desc;
            }
            // deprecated: if condition to be removed - END
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "projectedFilter", {
        /**
         * @param {?} custom
         * @return {?}
         */
        set: function (custom) {
            if (custom) {
                this.deleteFilter();
                this.customFilter = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridColumn.prototype, "filterValue", {
        /**
         * @return {?}
         */
        get: function () {
            return this.filter.value;
        },
        /**
         * @param {?} newValue
         * @return {?}
         */
        set: function (newValue) {
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
        },
        enumerable: true,
        configurable: true
    });
    return DatagridColumn;
}(DatagridFilterRegistrar));
DatagridColumn.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-column",
                template: "\n        <div class=\"datagrid-column-flex\">\n            <!-- I'm really not happy with that select since it's not very scalable -->\n            <ng-content select=\"clr-dg-filter, clr-dg-string-filter\"></ng-content>\n\n            <clr-dg-string-filter\n                    *ngIf=\"field && !customFilter\"\n                    [clrDgStringFilter]=\"registered\"\n                    [(clrFilterValue)]=\"filterValue\"></clr-dg-string-filter>\n\n            <ng-template #columnTitle><ng-content></ng-content></ng-template>\n\n            <button class=\"datagrid-column-title\" *ngIf=\"sortable\" (click)=\"sort()\" type=\"button\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </button>\n\n            <span class=\"datagrid-column-title\" *ngIf=\"!sortable\">\n               <ng-container *ngTemplateOutlet=\"columnTitle\"></ng-container>\n            </span>\n\n            <div class=\"datagrid-column-separator\">\n                <button #columnHandle class=\"datagrid-column-handle\" tabindex=\"-1\" type=\"button\"></button>\n                <div #columnHandleTracker class=\"datagrid-column-handle-tracker\"></div>\n            </div>\n        </div>\n    ",
                host: { "[class.datagrid-column]": "true", "[class.datagrid-column--hidden]": "hidden" }
            },] },
];
/**
 * @nocollapse
 */
DatagridColumn.ctorParameters = function () { return [
    { type: Sort, },
    { type: FiltersProvider, },
    { type: DragDispatcher, },
]; };
DatagridColumn.propDecorators = {
    'handleElRef': [{ type: core.ViewChild, args: ["columnHandle",] },],
    'handleTrackerElRef': [{ type: core.ViewChild, args: ["columnHandleTracker",] },],
    'field': [{ type: core.Input, args: ["clrDgField",] },],
    'sortBy': [{ type: core.Input, args: ["clrDgSortBy",] },],
    'sorted': [{ type: core.Input, args: ["clrDgSorted",] },],
    'sortedChange': [{ type: core.Output, args: ["clrDgSortedChange",] },],
    'sortOrder': [{ type: core.Input, args: ["clrDgSortOrder",] },],
    'sortOrderChange': [{ type: core.Output, args: ["clrDgSortOrderChange",] },],
    'asc': [{ type: core.HostBinding, args: ["class.asc",] },],
    'desc': [{ type: core.HostBinding, args: ["class.desc",] },],
    'projectedFilter': [{ type: core.ContentChild, args: [CustomFilter,] },],
    'filterValue': [{ type: core.Input, args: ["clrFilterValue",] },],
    'filterValueChange': [{ type: core.Output, args: ["clrFilterValueChange",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Items = (function () {
    /**
     * @param {?} _filters
     * @param {?} _sort
     * @param {?} _page
     */
    function Items(_filters, _sort, _page) {
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
        this.trackBy = function (index, item) { return item; };
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
        this._change = new Subject.Subject();
        this._allChanges = new Subject.Subject();
    }
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Items.prototype.destroy = function () {
        if (this._filtersSub) {
            this._filtersSub.unsubscribe();
        }
        if (this._sortSub) {
            this._sortSub.unsubscribe();
        }
        if (this._pageSub) {
            this._pageSub.unsubscribe();
        }
    };
    Object.defineProperty(Items.prototype, "smart", {
        /**
         * @return {?}
         */
        get: function () {
            return this._smart;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Items.prototype.smartenUp = function () {
        var _this = this;
        this._smart = true;
        /*
         * These observers trigger a chain of function: filter -> sort -> paginate
         * An observer up the chain re-triggers all the operations that follow it.
         */
        this._filtersSub = this._filters.change.subscribe(function () { return _this._filterItems(); });
        this._sortSub = this._sort.change.subscribe(function () {
            // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
            // to get the original order back
            if (!_this._sort.comparator) {
                _this._filterItems();
            }
            else {
                _this._sortItems();
            }
        });
        this._pageSub = this._page.change.subscribe(function () { return _this._changePage(); });
    };
    Object.defineProperty(Items.prototype, "all", {
        /**
         * @param {?} items
         * @return {?}
         */
        set: function (items) {
            if (this.smart) {
                this._all = items;
                this.emitAllChanges();
                this._filterItems();
            }
            else {
                this._displayed = items;
                this.emitChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Manually recompute the list of displayed items
     * @return {?}
     */
    Items.prototype.refresh = function () {
        if (this.smart) {
            this._filterItems();
        }
    };
    Object.defineProperty(Items.prototype, "displayed", {
        /**
         * @return {?}
         */
        get: function () {
            // Ideally we could return an immutable array, but we don't have it in Clarity yet.
            return this._displayed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Items.prototype.emitChange = function () {
        this._change.next(this.displayed);
    };
    Object.defineProperty(Items.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Items.prototype.emitAllChanges = function () {
        if (this.smart) {
            this._allChanges.next(this._all);
        }
    };
    Object.defineProperty(Items.prototype, "allChanges", {
        /**
         * @return {?}
         */
        get: function () {
            return this._allChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Items.prototype, "uninitialized", {
        /**
         * Checks if we don't have data to process yet, to abort early operations
         * @return {?}
         */
        get: function () {
            return !this._all;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * FiltersProvider items from the raw list
     * @return {?}
     */
    Items.prototype._filterItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._filters.hasActiveFilters()) {
            this._filtered = this._all.filter(function (item) { return _this._filters.accepts(item); });
        }
        else {
            // Work on a shallow copy of the array, to not modify the user's model
            this._filtered = this._all.slice();
        }
        this._page.totalItems = this._filtered.length;
        this._sortItems();
    };
    /**
     * Sorts items in the filtered list
     * @return {?}
     */
    Items.prototype._sortItems = function () {
        var _this = this;
        if (this.uninitialized) {
            return;
        }
        if (this._sort.comparator) {
            this._filtered.sort(function (a, b) { return _this._sort.compare(a, b); });
        }
        this._changePage();
    };
    /**
     * Extracts the current page from the sorted list
     * @return {?}
     */
    Items.prototype._changePage = function () {
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
    };
    return Items;
}());
Items.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Items.ctorParameters = function () { return [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridItems = (function () {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} _items
     */
    function DatagridItems(template, _differs, _items) {
        this.template = template;
        this._differs = _differs;
        this._items = _items;
        _items.smartenUp();
    }
    Object.defineProperty(DatagridItems.prototype, "rawItems", {
        /**
         * @param {?} items
         * @return {?}
         */
        set: function (items) {
            this._rawItems = items ? items : [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DatagridItems.prototype.ngOnChanges = function (changes) {
        if ("rawItems" in changes) {
            var /** @type {?} */ currentItems = changes.rawItems.currentValue;
            if (!this._differ && currentItems) {
                this._differ = this._differs.find(currentItems).create(this._items.trackBy);
            }
        }
    };
    Object.defineProperty(DatagridItems.prototype, "trackBy", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._items.trackBy = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridItems.prototype.ngDoCheck = function () {
        if (this._differ) {
            var /** @type {?} */ changes = this._differ.diff(this._rawItems);
            if (changes) {
                // TODO: not very efficient right now,
                // but premature optimization is the root of all evil.
                this._items.all = this._rawItems;
            }
        }
    };
    return DatagridItems;
}());
DatagridItems.decorators = [
    { type: core.Directive, args: [{
                selector: "[clrDgItems][clrDgItemsOf]",
            },] },
];
/**
 * @nocollapse
 */
DatagridItems.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.IterableDiffers, },
    { type: Items, },
]; };
DatagridItems.propDecorators = {
    'rawItems': [{ type: core.Input, args: ["clrDgItemsOf",] },],
    'trackBy': [{ type: core.Input, args: ["clrDgItemsTrackBy",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridPlaceholder = (function () {
    /**
     * @param {?} items
     * @param {?} page
     */
    function DatagridPlaceholder(items, page) {
        this.items = items;
        this.page = page;
    }
    Object.defineProperty(DatagridPlaceholder.prototype, "emptyDatagrid", {
        /**
         * Tests if the datagrid is empty, meaning it doesn't contain any items
         * @return {?}
         */
        get: function () {
            return !this.items.loading && (!this.items.displayed || this.items.displayed.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    return DatagridPlaceholder;
}());
DatagridPlaceholder.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-placeholder",
                template: "\n        <div\n            class=\"datagrid-placeholder\"\n            [class.datagrid-empty]=\"emptyDatagrid\">\n                <div class=\"datagrid-placeholder-image\" *ngIf=\"emptyDatagrid\"></div>\n                <ng-content *ngIf=\"emptyDatagrid\"></ng-content>\n        </div>\n    ",
                host: { "[class.datagrid-placeholder-container]": "true" }
            },] },
];
/**
 * @nocollapse
 */
DatagridPlaceholder.ctorParameters = function () { return [
    { type: Items, },
    { type: Page, },
]; };
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
var IfOpenService = (function () {
    function IfOpenService() {
        /**
         * *****
         * \@property _openChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current open state of a component template
         * implemting the IfOpen structural directive.
         *
         */
        this._openChange = new Subject.Subject();
    }
    Object.defineProperty(IfOpenService.prototype, "openChange", {
        /**
         * ******
         * \@function openChange
         *
         * \@description
         * A getter function that provides an observable for the _opened Subject.
         *
         * @return {?}
         */
        get: function () {
            return this._openChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfOpenService.prototype, "open", {
        /**
         * ******
         *
         * \@function open
         *
         * \@description
         * A getter that returns the current value of this IfOpen instance.
         * @return {?}
         */
        get: function () {
            return this._open;
        },
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
        set: function (value) {
            value = !!value;
            if (this._open !== value) {
                this._open = value;
                this._openChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    IfOpenService.prototype.toggleWithEvent = function (event) {
        this.originalEvent = event;
        this.open = !this.open;
        delete this.originalEvent;
    };
    return IfOpenService;
}());
IfOpenService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
IfOpenService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var POPOVER_HOST_ANCHOR = new core.InjectionToken("POPOVER_HOST_ANCHOR");
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
var SignpostTriggerDirective = (function () {
    /**
     * @param {?} ifOpenService
     * @param {?} renderer
     * @param {?} el
     */
    function SignpostTriggerDirective(ifOpenService, renderer, el) {
        var _this = this;
        this.ifOpenService = ifOpenService;
        this.renderer = renderer;
        this.el = el;
        this.subscriptions = [];
        this.subscriptions.push(this.ifOpenService.openChange.subscribe(function (isOpen) {
            if (isOpen) {
                _this.renderer.addClass(_this.el.nativeElement, "active");
            }
            else {
                _this.renderer.removeClass(_this.el.nativeElement, "active");
            }
        }));
    }
    /**
     * @return {?}
     */
    SignpostTriggerDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * *******
     * \@function onSignpostTriggerClick
     *
     * \@description
     * click handler for the Signpost trigger button used to hide/show SignpostContent.
     * @param {?} event
     * @return {?}
     */
    SignpostTriggerDirective.prototype.onSignpostTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return SignpostTriggerDirective;
}());
SignpostTriggerDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrSignpostTrigger]" },] },
];
/**
 * @nocollapse
 */
SignpostTriggerDirective.ctorParameters = function () { return [
    { type: IfOpenService, },
    { type: core.Renderer2, },
    { type: core.ElementRef, },
]; };
SignpostTriggerDirective.propDecorators = {
    'onSignpostTriggerClick': [{ type: core.HostListener, args: ["click", ["$event"],] },],
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
var Signpost = (function () {
    function Signpost() {
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
    Object.defineProperty(Signpost.prototype, "customTrigger", {
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
        set: function (trigger$$1) {
            this.useCustomTrigger = !!trigger$$1;
        },
        enumerable: true,
        configurable: true
    });
    return Signpost;
}());
Signpost.decorators = [
    { type: core.Component, args: [{
                selector: "clr-signpost",
                template: "\n        <ng-container *ngIf=\"!useCustomTrigger\">\n            <button\n                type=\"button\"\n                class=\"signpost-action btn btn-small btn-link\"\n                clrSignpostTrigger>\n                <clr-icon shape=\"info\"></clr-icon>\n            </button>\n        </ng-container>\n        \n        <ng-content></ng-content>\n    ",
                host: { "[class.signpost]": "true" },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Signpost.ctorParameters = function () { return []; };
Signpost.propDecorators = {
    'customTrigger': [{ type: core.ContentChild, args: [SignpostTriggerDirective,] },],
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
var HideableColumnService = (function () {
    function HideableColumnService() {
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
        this._columnListChange = new BehaviorSubject.BehaviorSubject(this._columnList);
    }
    Object.defineProperty(HideableColumnService.prototype, "canHideNextColumn", {
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
        get: function () {
            var /** @type {?} */ hiddenColumns = this._columnList.filter(function (column) { return column !== undefined; }).filter(function (column) { return column.hidden; });
            return (this._columnList.length - hiddenColumns.length > 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "checkForAllColumnsVisible", {
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
        get: function () {
            return !this._columnList.some(function (column) { return column && column.hidden; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HideableColumnService.prototype, "columnListChange", {
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
        get: function () {
            return this._columnListChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    HideableColumnService.prototype.getColumns = function () {
        return this._columnList;
    };
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
    HideableColumnService.prototype.showHiddenColumns = function () {
        this._columnList.forEach(function (column) {
            if (column && column.hidden === true) {
                column.hidden = false;
            }
            if (column && column.lastVisibleColumn) {
                column.lastVisibleColumn = false;
            }
        });
    };
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
    HideableColumnService.prototype.updateColumnList = function (columns) {
        this._columnList = columns; // clear the list
        this.updateForLastVisibleColumn(); // Update our visibility state for UI
        this._columnListChange.next(this._columnList); // Broadcast it
    };
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
    HideableColumnService.prototype.updateForLastVisibleColumn = function () {
        // There is more than one column showing, make sure nothing is marked lastVisibleColumn
        if (this.canHideNextColumn) {
            this._columnList.map(function (column) {
                if (column && column.lastVisibleColumn) {
                    column.lastVisibleColumn = false;
                }
            });
        }
        else {
            // The visibleCount is down to only one column showing. Find it and flag it as the lastVisibleColumn
            this._columnList.map(function (column) {
                if (column && !column.hidden) {
                    column.lastVisibleColumn = true;
                }
            });
        }
    };
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
    HideableColumnService.prototype.getColumnById = function (id) {
        if (id) {
            return this._columnList.find(function (column) { return column && column.id === id; });
        }
        return;
    };
    return HideableColumnService;
}());
HideableColumnService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
HideableColumnService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridCell = (function () {
    /**
     * @param {?} hideableColumnService
     */
    function DatagridCell(hideableColumnService) {
        this.hideableColumnService = hideableColumnService;
    }
    Object.defineProperty(DatagridCell.prototype, "hidden", {
        /**
         * \@property hidden
         *
         * \@description
         * Property used to apply a css class to this cell that hides it when hidden = true.
         *
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ column = this.hideableColumnService.getColumnById(this.id);
            return (column) ? column.hidden : false;
        },
        enumerable: true,
        configurable: true
    });
    return DatagridCell;
}());
DatagridCell.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-cell",
                template: "\n        <ng-content></ng-content>\n    ",
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
DatagridCell.ctorParameters = function () { return [
    { type: HideableColumnService, },
]; };
DatagridCell.propDecorators = {
    'signpost': [{ type: core.ContentChildren, args: [Signpost,] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbSelection = 0;
var SelectionType = {};
SelectionType.None = 0;
SelectionType.Single = 1;
SelectionType.Multi = 2;
SelectionType[SelectionType.None] = "None";
SelectionType[SelectionType.Single] = "Single";
SelectionType[SelectionType.Multi] = "Multi";
var Selection = (function () {
    /**
     * @param {?} _items
     * @param {?} _filters
     */
    function Selection(_items, _filters) {
        var _this = this;
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
        this._change = new Subject.Subject();
        this.id = "clr-dg-selection" + (nbSelection++);
        this._filtersSub = this._filters.change.subscribe(function () {
            if (!_this._selectable) {
                return;
            }
            _this.clearSelection();
        });
        this._itemsSub = this._items.allChanges.subscribe(function (updatedItems) {
            if (!_this._selectable) {
                return;
            }
            var leftOver;
            if (_this._items.trackBy) {
                var trackBy_1 = _this._items.trackBy;
                var updatedTracked_1 = updatedItems.map(function (item, index) { return trackBy_1(index, item); });
                leftOver = _this.current.filter(function (selected, index) {
                    return updatedTracked_1.indexOf(trackBy_1(index, selected)) > -1;
                });
            }
            else {
                leftOver = _this.current.filter(function (selected) { return updatedItems.indexOf(selected) > -1; });
            }
            if (_this.current.length !== leftOver.length) {
                // TODO: Discussed this with Eudes and this is fine for now.
                // But we need to figure out a different pattern for the
                // child triggering the parent change detection problem.
                // Using setTimeout for now to fix this.
                setTimeout(function () {
                    _this.current = leftOver;
                }, 0);
            }
        });
    }
    /**
     * @return {?}
     */
    Selection.prototype.clearSelection = function () {
        this.current.length = 0;
        this.emitChange();
    };
    Object.defineProperty(Selection.prototype, "selectionType", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selectionType;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "_selectable", {
        /**
         * @return {?}
         */
        get: function () {
            return (this._selectionType === SelectionType.Multi) || (this._selectionType === SelectionType.Single);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Cleans up our subscriptions to other providers
     * @return {?}
     */
    Selection.prototype.destroy = function () {
        this._itemsSub.unsubscribe();
        this._filtersSub.unsubscribe();
    };
    Object.defineProperty(Selection.prototype, "currentSingle", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentSingle;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            if (value === this._currentSingle) {
                return;
            }
            this._currentSingle = value;
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            this.debounce = true;
            setTimeout(function () { return _this.debounce = false; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "current", {
        /**
         * @return {?}
         */
        get: function () {
            return this._current;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            this._current = value;
            this.emitChange();
            // Ignore items changes in the same change detection cycle.
            this.debounce = true;
            setTimeout(function () { return _this.debounce = false; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Selection.prototype.emitChange = function () {
        if (this._selectionType === SelectionType.Single) {
            this._change.next(this.currentSingle);
        }
        else if (this._selectionType === SelectionType.Multi) {
            this._change.next(this.current);
        }
    };
    Object.defineProperty(Selection.prototype, "change", {
        /**
         * @return {?}
         */
        get: function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if an item is currently selected
     * @param {?} item
     * @return {?}
     */
    Selection.prototype.isSelected = function (item) {
        if (this._selectionType === SelectionType.Single) {
            return this.currentSingle === item;
        }
        else if (this._selectionType === SelectionType.Multi) {
            return this.current.indexOf(item) >= 0;
        }
        return false;
    };
    /**
     * Selects or deselects an item
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    Selection.prototype.setSelected = function (item, selected) {
        switch (this._selectionType) {
            case SelectionType.None:
                break;
            case SelectionType.Single:
                // in single selection, set currentSingle method should be used
                break;
            case SelectionType.Multi:
                var /** @type {?} */ index = this.current.indexOf(item);
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
    };
    /**
     * Checks if all currently displayed items are selected
     * @return {?}
     */
    Selection.prototype.isAllSelected = function () {
        var _this = this;
        if ((this._selectionType !== SelectionType.Multi) || !this._items.displayed) {
            return false;
        }
        var /** @type {?} */ displayedItems = this._items.displayed;
        var /** @type {?} */ nbDisplayed = this._items.displayed.length;
        if (nbDisplayed < 1) {
            return false;
        }
        var /** @type {?} */ temp = displayedItems.filter(function (item) { return _this.current.indexOf(item) > -1; });
        return temp.length === displayedItems.length;
    };
    /**
     * Selects or deselects all currently displayed items
     * @return {?}
     */
    Selection.prototype.toggleAll = function () {
        var _this = this;
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
            this._items.displayed.forEach(function (item) {
                if (_this.current.indexOf(item) < 0) {
                    _this.current.push(item);
                }
            });
        }
        this.emitChange();
    };
    return Selection;
}());
Selection.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
Selection.ctorParameters = function () { return [
    { type: Items, },
    { type: FiltersProvider, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbRow = 0;
var DatagridRow = (function () {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} globalExpandable
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    function DatagridRow(selection, rowActionService, globalExpandable, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.globalExpandable = globalExpandable;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
        this.ENTER_KEY_CODE = 13;
        this.SPACE_KEY_CODE = 32;
        this._selected = false;
        this.selectedChanged = new core.EventEmitter(false);
        this.expandedChange = new core.EventEmitter(false);
        this.id = "clr-dg-row" + (nbRow++);
        this.role = selection.rowSelectionMode ? "button" : null;
    }
    Object.defineProperty(DatagridRow.prototype, "selected", {
        /**
         * Indicates if the row is selected
         * @return {?}
         */
        get: function () {
            if (this.selection.selectionType === SelectionType.None) {
                return this._selected;
            }
            else {
                return this.selection.isSelected(this.item);
            }
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this.selection.selectionType === SelectionType.None) {
                this._selected = value;
            }
            else {
                this.selection.setSelected(this.item, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} selected
     * @return {?}
     */
    DatagridRow.prototype.toggle = function (selected) {
        if (selected === void 0) { selected = !this.selected; }
        if (selected !== this.selected) {
            this.selected = selected;
            this.selectedChanged.emit(selected);
        }
    };
    Object.defineProperty(DatagridRow.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this.expand.expanded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.expand.expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridRow.prototype.toggleExpand = function () {
        if (this.expand.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    /**
     * @return {?}
     */
    DatagridRow.prototype.toggleSelection = function () {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatagridRow.prototype.keypress = function (event) {
        if (!this.selection.rowSelectionMode) {
            return;
        }
        // Check to see if space or enter were pressed
        if (event.keyCode === this.ENTER_KEY_CODE || event.keyCode === this.SPACE_KEY_CODE) {
            // Prevent the default action to stop scrolling when space is pressed
            event.preventDefault();
            this.toggleSelection();
        }
    };
    /**
     * @return {?}
     */
    DatagridRow.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Make sure things get started
        var /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.dgCells.changes.subscribe(function (cellList) {
            var /** @type {?} */ columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscription = this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned - only seems to run on init / first time.
            if (columnList.length === _this.dgCells.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
    };
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
    DatagridRow.prototype.updateCellsForColumns = function (columnList) {
        // Map cells to columns with Array.index
        this.dgCells.forEach(function (cell, index) {
            var /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    };
    /**
     * @return {?}
     */
    DatagridRow.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return DatagridRow;
}());
DatagridRow.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-row",
                template: "\n        <div class=\"datagrid-row-master datagrid-row-flex\">\n            <clr-dg-cell *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\"\n                         class=\"datagrid-select datagrid-fixed-column\">\n                <clr-checkbox [ngModel]=\"selected\" (ngModelChange)=\"toggle($event)\"></clr-checkbox>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\"\n                         class=\"datagrid-select datagrid-fixed-column\">\n                <div class=\"radio\">\n                    <input type=\"radio\" [id]=\"id\" [name]=\"selection.id + '-radio'\" [value]=\"item\"\n                           [(ngModel)]=\"selection.currentSingle\">\n                    <label for=\"{{id}}\"></label>\n                </div>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"rowActionService.hasActionableRow\"\n                         class=\"datagrid-row-actions datagrid-fixed-column\">\n                <ng-content select=\"clr-dg-action-overflow\"></ng-content>\n            </clr-dg-cell>\n            <clr-dg-cell *ngIf=\"globalExpandable.hasExpandableRow\"\n                         class=\"datagrid-expandable-caret datagrid-fixed-column\">\n                <ng-container *ngIf=\"expand.expandable\">\n                    <button (click)=\"toggleExpand()\" *ngIf=\"!expand.loading\" type=\"button\">\n                        <clr-icon shape=\"caret\" [attr.dir]=\"expand.expanded?'down':'right'\"></clr-icon>\n                    </button>\n                    <div class=\"spinner spinner-sm\" *ngIf=\"expand.loading\"></div>\n                </ng-container>\n            </clr-dg-cell>\n            <ng-content *ngIf=\"!expand.replace || !expand.expanded || expand.loading\"></ng-content>\n\n            <ng-template *ngIf=\"expand.replace && expand.expanded && !expand.loading\"\n                         [ngTemplateOutlet]=\"detail\"></ng-template>\n        </div>\n\n        <ng-template *ngIf=\"!expand.replace && expand.expanded && !expand.loading\"\n                     [ngTemplateOutlet]=\"detail\"></ng-template>\n\n        <!-- \n            We need the \"project into template\" hack because we need this in 2 different places\n            depending on whether the details replace the row or not.\n        -->\n        <ng-template #detail>\n            <ng-content select=\"clr-dg-row-detail\"></ng-content>\n        </ng-template>\n    ",
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
DatagridRow.ctorParameters = function () { return [
    { type: Selection, },
    { type: RowActionService, },
    { type: ExpandableRowsCount, },
    { type: Expand, },
    { type: HideableColumnService, },
]; };
DatagridRow.propDecorators = {
    'item': [{ type: core.Input, args: ["clrDgItem",] },],
    'role': [{ type: core.HostBinding, args: ["attr.role",] },],
    'selected': [{ type: core.Input, args: ["clrDgSelected",] },],
    'selectedChanged': [{ type: core.Output, args: ["clrDgSelectedChange",] },],
    'expanded': [{ type: core.Input, args: ["clrDgExpanded",] },],
    'expandedChange': [{ type: core.Output, args: ["clrDgExpandedChange",] },],
    'toggleSelection': [{ type: core.HostListener, args: ["click",] },],
    'keypress': [{ type: core.HostListener, args: ["keypress", ["$event"],] },],
    'dgCells': [{ type: core.ContentChildren, args: [DatagridCell,] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * This provider aggregates state changes from the various providers of the Datagrid
 */
var StateProvider = (function () {
    /**
     * @param {?} filters
     * @param {?} sort
     * @param {?} page
     * @param {?} debouncer
     */
    function StateProvider(filters, sort, page, debouncer) {
        var _this = this;
        this.filters = filters;
        this.sort = sort;
        this.page = page;
        this.debouncer = debouncer;
        /**
         * The Observable that lets other classes subscribe to global state changes
         */
        this.change = this.debouncer.change.map(function () { return _this.state; });
    }
    Object.defineProperty(StateProvider.prototype, "state", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ state$$1 = {};
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
            var /** @type {?} */ activeFilters = this.filters.getActiveFilters();
            if (activeFilters.length > 0) {
                state$$1.filters = [];
                for (var _i = 0, activeFilters_1 = activeFilters; _i < activeFilters_1.length; _i++) {
                    var filter = activeFilters_1[_i];
                    if (filter instanceof DatagridStringFilterImpl) {
                        var /** @type {?} */ stringFilter = ((filter)).filterFn;
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
        },
        enumerable: true,
        configurable: true
    });
    return StateProvider;
}());
StateProvider.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
StateProvider.ctorParameters = function () { return [
    { type: FiltersProvider, },
    { type: Sort, },
    { type: Page, },
    { type: StateDebouncer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Datagrid = (function () {
    /**
     * @param {?} columnService
     * @param {?} organizer
     * @param {?} items
     * @param {?} expandableRows
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} stateProvider
     */
    function Datagrid(columnService, organizer, items, expandableRows, selection, rowActionService, stateProvider) {
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
        this.refresh = new core.EventEmitter(false);
        this.selectedChanged = new core.EventEmitter(false);
        this.singleSelectedChanged = new core.EventEmitter(false);
        /**
         * Subscriptions to all the services and queries changes
         */
        this._subscriptions = [];
    }
    Object.defineProperty(Datagrid.prototype, "loading", {
        /**
         * Freezes the datagrid while data is loading
         * @return {?}
         */
        get: function () {
            return this.items.loading;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.items.loading = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Public method to re-trigger the computation of displayed items manually
     * @return {?}
     */
    Datagrid.prototype.dataChanged = function () {
        this.items.refresh();
    };
    Object.defineProperty(Datagrid.prototype, "selected", {
        /**
         * Array of all selected items
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value) {
                this.selection.selectionType = SelectionType.Multi;
            }
            else {
                this.selection.selectionType = SelectionType.None;
            }
            this.selection.current = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Datagrid.prototype, "singleSelected", {
        /**
         * Selected item in single-select mode
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.selection.selectionType = SelectionType.Single;
            if (value) {
                this.selection.currentSingle = value;
            }
            else {
                this.selection.currentSingle = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Datagrid.prototype, "rowSelectionMode", {
        /**
         * Selection/Deselection on row click mode
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.selection.rowSelectionMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Datagrid.prototype, "allSelected", {
        /**
         * Indicates if all currently displayed items are selected
         * @return {?}
         */
        get: function () {
            return this.selection.isAllSelected();
        },
        /**
         * Selects/deselects all currently displayed items
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            /*
             * This is a setter but we ignore the value.
             * It's strange, but it lets us have an indeterminate state where only
             * some of the items are selected.
             */
            this.selection.toggleAll();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Datagrid.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._subscriptions.push(this.rows.changes.subscribe(function () {
            if (!_this.items.smart) {
                _this.items.all = _this.rows.map(function (row) { return row.item; });
            }
        }));
        if (!this.items.smart) {
            this.items.all = this.rows.map(function (row) { return row.item; });
        }
        this._subscriptions.push(this.columns.changes.subscribe(function (columns) {
            _this.columnService.updateColumnList(_this.columns.map(function (col) { return col.hideable; }));
        }));
        // Get ColumnService ready for HideableColumns.
        this.columnService.updateColumnList(this.columns.map(function (col) { return col.hideable; }));
    };
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     * @return {?}
     */
    Datagrid.prototype.ngAfterViewInit = function () {
        var _this = this;
        // TODO: determine if we can get rid of provider wiring in view init so that subscriptions can be done earlier
        this.refresh.emit(this.stateProvider.state);
        this._subscriptions.push(this.stateProvider.change.subscribe(function (state$$1) { return _this.refresh.emit(state$$1); }));
        this._subscriptions.push(this.selection.change.subscribe(function (s) {
            if (_this.selection.selectionType === SelectionType.Single) {
                _this.singleSelectedChanged.emit(s);
            }
            else if (_this.selection.selectionType === SelectionType.Multi) {
                _this.selectedChanged.emit(s);
            }
        }));
    };
    /**
     * @return {?}
     */
    Datagrid.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    Datagrid.prototype.resize = function () {
        this.organizer.resize();
    };
    return Datagrid;
}());
Datagrid.decorators = [
    { type: core.Component, args: [{
                selector: "clr-datagrid",
                template: "\n      <!--\n        ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.\n        ~ This software is released under MIT license.\n        ~ The full license information can be found in LICENSE in the root directory of this project.\n        -->\n\n      <ng-content select=\"clr-dg-action-bar\"></ng-content>\n      <div class=\"datagrid-overlay-wrapper\">\n          <div class=\"datagrid-scroll-wrapper\">\n              <div class=\"datagrid\" #datagrid>\n                  <clr-dg-table-wrapper class=\"datagrid-table-wrapper\">\n                      <div clrDgHead class=\"datagrid-head\">\n                          <div class=\"datagrid-row datagrid-row-flex\">\n                              <!-- header for datagrid where you can select multiple rows -->\n                              <div class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                                   *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi\">\n                              <span class=\"datagrid-column-title\">\n                                  <clr-checkbox [(ngModel)]=\"allSelected\"></clr-checkbox>\n                              </span>\n                                  <div class=\"datagrid-column-separator\"></div>\n                              </div>\n                              <!-- header for datagrid where you can select one row only -->\n                              <div class=\"datagrid-column datagrid-select datagrid-fixed-column\"\n                                   *ngIf=\"selection.selectionType === SELECTION_TYPE.Single\">\n                                  <div class=\"datagrid-column-separator\"></div>\n                              </div>\n                              <!-- header for single row action; only display if we have at least one actionable row in datagrid -->\n                              <div class=\"datagrid-column datagrid-row-actions datagrid-fixed-column\"\n                                   *ngIf=\"rowActionService.hasActionableRow\">\n                                  <div class=\"datagrid-column-separator\"></div>\n                              </div>\n                              <!-- header for carets; only display if we have at least one expandable row in datagrid -->\n                              <div class=\"datagrid-column datagrid-expandable-caret datagrid-fixed-column\"\n                                   *ngIf=\"expandableRows.hasExpandableRow\">\n                                  <div class=\"datagrid-column-separator\"></div>\n                              </div>\n                              <ng-content select=\"clr-dg-column\"></ng-content>\n                          </div>\n                      </div>\n\n                      <ng-template *ngIf=\"iterator\"\n                                   ngFor [ngForOf]=\"items.displayed\" [ngForTrackBy]=\"items.trackBy\"\n                                   [ngForTemplate]=\"iterator.template\"></ng-template>\n                      <ng-content *ngIf=\"!iterator\"></ng-content>\n\n                      <!-- Custom placeholder overrides the default empty one -->\n                      <ng-content select=\"clr-dg-placeholder\"></ng-content>\n                      <clr-dg-placeholder *ngIf=\"!placeholder\"></clr-dg-placeholder>\n                  </clr-dg-table-wrapper>\n\n                  <!--\n                      This is not inside the table because there is no good way of having a single column span\n                      everything when using custom elements with display:table-cell.\n                  -->\n                  <ng-content select=\"clr-dg-footer\"></ng-content>\n              </div>\n          </div>\n          <div class=\"datagrid-spinner\" *ngIf=\"loading\">\n              <div class=\"spinner\">Loading...</div>\n          </div>\n      </div>\n    ",
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
Datagrid.ctorParameters = function () { return [
    { type: HideableColumnService, },
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: ExpandableRowsCount, },
    { type: Selection, },
    { type: RowActionService, },
    { type: StateProvider, },
]; };
Datagrid.propDecorators = {
    'loading': [{ type: core.Input, args: ["clrDgLoading",] },],
    'refresh': [{ type: core.Output, args: ["clrDgRefresh",] },],
    'iterator': [{ type: core.ContentChild, args: [DatagridItems,] },],
    'selected': [{ type: core.Input, args: ["clrDgSelected",] },],
    'selectedChanged': [{ type: core.Output, args: ["clrDgSelectedChange",] },],
    'singleSelected': [{ type: core.Input, args: ["clrDgSingleSelected",] },],
    'singleSelectedChanged': [{ type: core.Output, args: ["clrDgSingleSelectedChange",] },],
    'rowSelectionMode': [{ type: core.Input, args: ["clDgRowSelection",] },],
    'placeholder': [{ type: core.ContentChild, args: [DatagridPlaceholder,] },],
    'columns': [{ type: core.ContentChildren, args: [DatagridColumn,] },],
    'rows': [{ type: core.ContentChildren, args: [DatagridRow,] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridActionBar = (function () {
    function DatagridActionBar() {
    }
    return DatagridActionBar;
}());
DatagridActionBar.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-action-bar",
                template: "\n        <ng-content></ng-content>\n    ",
                host: { "[class.datagrid-action-bar]": "true" }
            },] },
];
/**
 * @nocollapse
 */
DatagridActionBar.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridActionOverflow = (function () {
    /**
     * @param {?} rowActionService
     */
    function DatagridActionOverflow(rowActionService) {
        this.rowActionService = rowActionService;
        this.anchorPoint = Point.RIGHT_CENTER;
        this.popoverPoint = Point.LEFT_CENTER;
        /**
         * Tracks whether the action overflow menu is open or not
         */
        this._open = false;
        this.openChanged = new core.EventEmitter(false);
        this.rowActionService.register();
    }
    /**
     * @return {?}
     */
    DatagridActionOverflow.prototype.ngOnDestroy = function () {
        this.rowActionService.unregister();
    };
    Object.defineProperty(DatagridActionOverflow.prototype, "open", {
        /**
         * @return {?}
         */
        get: function () {
            return this._open;
        },
        /**
         * @param {?} open
         * @return {?}
         */
        set: function (open) {
            var /** @type {?} */ boolOpen = !!open;
            if (boolOpen !== this._open) {
                this._open = boolOpen;
                this.openChanged.emit(boolOpen);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows/hides the action overflow menu
     * @param {?} event
     * @return {?}
     */
    DatagridActionOverflow.prototype.toggle = function (event) {
        this.openingEvent = event;
        this.open = !this.open;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatagridActionOverflow.prototype.close = function (event) {
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
    };
    return DatagridActionOverflow;
}());
DatagridActionOverflow.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-action-overflow",
                template: "\n        <button (click)=\"toggle($event)\" class=\"datagrid-action-toggle\" #anchor>\n            <clr-icon shape=\"ellipsis-vertical\"></clr-icon>\n        </button>\n        <ng-template [(clrPopoverOld)]=\"open\" [clrPopoverOldAnchor]=\"anchor\" [clrPopoverOldAnchorPoint]=\"anchorPoint\"\n                     [clrPopoverOldPopoverPoint]=\"popoverPoint\">\n            <div #menu class=\"datagrid-action-overflow\" (clrOutsideClick)=\"close($event)\" [clrStrict]=\"true\">\n                <ng-content></ng-content>\n            </div>\n        </ng-template>\n    "
            },] },
];
/**
 * @nocollapse
 */
DatagridActionOverflow.ctorParameters = function () { return [
    { type: RowActionService, },
]; };
DatagridActionOverflow.propDecorators = {
    'open': [{ type: core.Input, args: ["clrDgActionOverflowOpen",] },],
    'openChanged': [{ type: core.Output, args: ["clrDgActionOverflowOpenChange",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridColumnToggle = (function () {
    /**
     * @param {?} hideableColumnService
     */
    function DatagridColumnToggle(hideableColumnService) {
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
    Object.defineProperty(DatagridColumnToggle.prototype, "allColumnsVisible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._allColumnsVisible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._allColumnsVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridColumnToggle.prototype.ngOnInit = function () {
        var _this = this;
        this._hideableColumnChangeSubscription = this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            // Reset the list of columns
            _this.columns.length = 0;
            _this.hideableColumnService.updateForLastVisibleColumn();
            _this.allColumnsVisible = _this.hideableColumnService.checkForAllColumnsVisible;
            // Add only the hidden columns to the toggler.
            columnList.forEach(function (col) {
                if (col) {
                    _this.columns.push(col);
                }
            });
        });
    };
    /**
     * @return {?}
     */
    DatagridColumnToggle.prototype.ngOnDestroy = function () {
        this._hideableColumnChangeSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatagridColumnToggle.prototype.selectAll = function () {
        this.hideableColumnService.showHiddenColumns();
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
    };
    /**
     * @param {?} event
     * @param {?} column
     * @return {?}
     */
    DatagridColumnToggle.prototype.toggleColumn = function (event, column) {
        column.hidden = !event;
        this.allColumnsVisible = this.hideableColumnService.checkForAllColumnsVisible;
        this.hideableColumnService.updateForLastVisibleColumn();
    };
    /**
     * @return {?}
     */
    DatagridColumnToggle.prototype.toggleUI = function () {
        this.open = !this.open;
    };
    return DatagridColumnToggle;
}());
DatagridColumnToggle.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-column-toggle",
                template: "\n        <button\n                #anchor\n                (click)=\"toggleUI()\"\n                class=\"btn btn-sm btn-link column-toggle--action\"\n                type=\"button\">\n            <clr-icon shape=\"view-columns\"></clr-icon>\n        </button>\n        <div class=\"column-switch\"\n             *clrPopoverOld=\"open; anchor: anchor; anchorPoint: anchorPoint; popoverPoint: popoverPoint\">\n            <div class=\"switch-header\">\n                Show Columns\n                <button\n                    class=\"btn btn-sm btn-link\"\n                    (click)=\"toggleUI()\"\n                    type=\"button\">\n                    <clr-icon\n                            shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <ul class=\"switch-content list-unstyled\">\n                <li *ngFor=\"let column of columns\">\n                    <clr-checkbox [clrChecked]=\"!column.hidden\"\n                                  [clrDisabled]=\"column.lastVisibleColumn\"\n                                  (clrCheckedChange)=\"toggleColumn($event, column)\">\n                        <ng-template [ngTemplateOutlet]=\"column.template\"></ng-template>\n                    </clr-checkbox>\n                </li>\n            </ul>\n            <div class=\"switch-footer\">\n                <div>\n                    <button\n                            class=\"btn btn-sm btn-link p6 text-uppercase\"\n                            [disabled]=\"allColumnsVisible\"\n                            (click)=\"selectAll()\"\n                            type=\"button\">Select All\n                    </button>\n                </div>\n                <div class=\"action-right\">\n                    <button\n                            (click)=\"toggleUI()\"\n                            class=\"btn btn-primary\"\n                            type=\"button\">\n                        Ok\n                    </button>\n                </div>\n            </div>\n        </div>\n    ",
                host: { "[class.column-switch-wrapper]": "true", "[class.column-switch-wrapper--active]": "open" }
            },] },
];
/**
 * @nocollapse
 */
DatagridColumnToggle.ctorParameters = function () { return [
    { type: HideableColumnService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridDetailRegisterer = (function () {
    /**
     * @param {?} expandableRowsCount
     */
    function DatagridDetailRegisterer(expandableRowsCount) {
        this.expandableRowsCount = expandableRowsCount;
        if (this.expandableRowsCount) {
            this.expandableRowsCount.register();
        }
    }
    /**
     * @return {?}
     */
    DatagridDetailRegisterer.prototype.ngOnDestroy = function () {
        if (this.expandableRowsCount) {
            this.expandableRowsCount.unregister();
        }
    };
    return DatagridDetailRegisterer;
}());
DatagridDetailRegisterer.decorators = [
    { type: core.Directive, args: [{ selector: "[clrIfExpanded]" },] },
];
/**
 * @nocollapse
 */
DatagridDetailRegisterer.ctorParameters = function () { return [
    { type: ExpandableRowsCount, decorators: [{ type: core.Optional },] },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridFooter = (function () {
    /**
     * @param {?} selection
     * @param {?} hideableColumnService
     * @param {?} cdr
     */
    function DatagridFooter(selection, hideableColumnService, cdr) {
        this.selection = selection;
        this.hideableColumnService = hideableColumnService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.SELECTION_TYPE = SelectionType;
    }
    /**
     * @return {?}
     */
    DatagridFooter.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.hideableColumnService.columnListChange.subscribe(function (change) {
            var /** @type {?} */ hiddenColumnsInSub = change.filter(function (col) { return col; });
            if (hiddenColumnsInSub.length > 0) {
                _this.activeToggler = true;
            }
        }));
        var /** @type {?} */ hiddenColumns = this.hideableColumnService.getColumns().filter(function (col) { return col; });
        if (hiddenColumns.length > 0) {
            this.activeToggler = true;
        }
    };
    /**
     * @return {?}
     */
    DatagridFooter.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    return DatagridFooter;
}());
DatagridFooter.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-footer",
                template: "\n        <ng-container\n            *ngIf=\"(selection.selectionType === SELECTION_TYPE.Multi) && (selection.current.length > 0)\">\n            <clr-checkbox [clrDisabled]=\"true\" [clrChecked]=\"true\" class=\"datagrid-foot-select\">\n                {{selection.current.length}}\n            </clr-checkbox>\n        </ng-container>\n        <clr-dg-column-toggle *ngIf=\"activeToggler\"></clr-dg-column-toggle>\n        <div class=\"datagrid-foot-description\">\n            <ng-content></ng-content>\n        </div>\n        <ng-content select=\"clr-dg-pagination\"></ng-content>\n    ",
                host: {
                    "[class.datagrid-foot]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
DatagridFooter.ctorParameters = function () { return [
    { type: Selection, },
    { type: HideableColumnService, },
    { type: core.ChangeDetectorRef, },
]; };
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
var DatagridHideableColumn = (function () {
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
    function DatagridHideableColumn(_template, _id, _hidden) {
        if (_hidden === void 0) { _hidden = false; }
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
        this.hiddenChangesState = new Subject.Subject();
        this.lastVisibleColumn = false;
    }
    Object.defineProperty(DatagridHideableColumn.prototype, "template", {
        /**
         * \@function template
         *
         * \@description
         * A getter function that returns an TemplateRef of the DatagridColumn that is hideable. This is currently used to
         * populate the DatagridColumnToggle UI with the correct Column name.
         *
         * @return {?}
         */
        get: function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumn.prototype, "id", {
        /**
         * \@function id
         *
         * \@description
         * public function that returns the id of a HideableCOlumn instance. Used by the HideableCOlumnService for passing
         * state and actions between DateGridColumns, DataGridCells & the DatagridColumnToggle Components.
         *
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumn.prototype, "hidden", {
        /**
         * \@function hidden
         *
         * \@description
         * A getter that returns the hidden value of a DatagridHideableColumn instance.
         * TODO: debug and make sure you really need this since we have the hiddenCHanges observable.
         *
         * @return {?}
         */
        get: function () {
            return this._hidden;
        },
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
        set: function (value) {
            if (this._hidden === value) {
                return;
            }
            this._hidden = value;
            this.hiddenChangesState.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridHideableColumn.prototype, "hiddenChangeState", {
        /**
         * \@function hiddenChangeState
         *
         * \@description
         * An Observable for the HideableColumns hidden changes.
         *
         * @return {?}
         */
        get: function () {
            return this.hiddenChangesState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    return DatagridHideableColumn;
}());
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
var DatagridHideableColumnDirective = (function () {
    /**
     * \@description
     * Used the DatagridColumn to get and set an id for this HiddenColumn
     *
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} dgColumn
     */
    function DatagridHideableColumnDirective(templateRef, viewContainerRef, dgColumn) {
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
    Object.defineProperty(DatagridHideableColumnDirective.prototype, "clrDgHideableColumn", {
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
        set: function (value) {
            this._hidden = (value && value.hidden) ? value.hidden : false;
            if (this.dgColumn.hideable) {
                this.dgColumn.hideable.hidden = (value && value.hidden) ? value.hidden : false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return DatagridHideableColumnDirective;
}());
DatagridHideableColumnDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrDgHideableColumn]" },] },
];
/**
 * @nocollapse
 */
DatagridHideableColumnDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
    { type: DatagridColumn, },
]; };
DatagridHideableColumnDirective.propDecorators = {
    'clrDgHideableColumn': [{ type: core.Input, args: ["clrDgHideableColumn",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridPagination = (function () {
    /**
     * @param {?} page
     */
    function DatagridPagination(page) {
        this.page = page;
        this.currentChanged = new core.EventEmitter(false);
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
    DatagridPagination.prototype.ngOnInit = function () {
        var _this = this;
        this._pageSubscription = this.page.change.subscribe(function (current) { return _this.currentChanged.emit(current); });
    };
    /**
     * @return {?}
     */
    DatagridPagination.prototype.ngOnDestroy = function () {
        this._pageSubscription.unsubscribe();
    };
    Object.defineProperty(DatagridPagination.prototype, "pageSize", {
        /**
         * Page size
         * @return {?}
         */
        get: function () {
            return this.page.size;
        },
        /**
         * @param {?} size
         * @return {?}
         */
        set: function (size) {
            if (typeof size === "number") {
                this.page.size = size;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridPagination.prototype, "totalItems", {
        /**
         * Total items (needed to guess the last page)
         * @return {?}
         */
        get: function () {
            return this.page.totalItems;
        },
        /**
         * @param {?} total
         * @return {?}
         */
        set: function (total) {
            if (typeof total === "number") {
                this.page.totalItems = total;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridPagination.prototype, "lastPage", {
        /**
         * Last page
         * @return {?}
         */
        get: function () {
            return this.page.last;
        },
        /**
         * @param {?} last
         * @return {?}
         */
        set: function (last) {
            if (typeof last === "number") {
                this.page.last = last;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridPagination.prototype, "currentPage", {
        /**
         * Current page
         * @return {?}
         */
        get: function () {
            return this.page.current;
        },
        /**
         * @param {?} page
         * @return {?}
         */
        set: function (page) {
            if (typeof page === "number") {
                this.page.current = page;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves to the previous page if it exists
     * @return {?}
     */
    DatagridPagination.prototype.previous = function () {
        this.page.previous();
    };
    /**
     * Moves to the next page if it exists
     * @return {?}
     */
    DatagridPagination.prototype.next = function () {
        this.page.next();
    };
    Object.defineProperty(DatagridPagination.prototype, "firstItem", {
        /**
         * Index of the first item displayed on the current page, starting at 0
         * @return {?}
         */
        get: function () {
            return this.page.firstItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridPagination.prototype, "lastItem", {
        /**
         * Index of the last item displayed on the current page, starting at 0
         * @return {?}
         */
        get: function () {
            return this.page.lastItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridPagination.prototype, "middlePages", {
        /**
         * Conditionally adds page numbers before and after the current page
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ middlePages = [];
            if (this.page.current > 1) {
                middlePages.push(this.page.current - 1);
            }
            middlePages.push(this.page.current);
            if (this.page.current < this.page.last) {
                middlePages.push(this.page.current + 1);
            }
            return middlePages;
        },
        enumerable: true,
        configurable: true
    });
    return DatagridPagination;
}());
DatagridPagination.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-pagination",
                template: "\n        <ul class=\"pagination\" *ngIf=\"page.last > 1\">\n            <li *ngIf=\"page.current > 1\">\n                <button \n                    class=\"pagination-previous\" \n                    (click)=\"page.previous()\"\n                    type=\"button\"></button>\n            </li>\n            <li *ngIf=\"page.current > 2\">\n                <button (click)=\"page.current = 1\" type=\"button\">1</button>\n            </li>\n            <li *ngIf=\"page.current > 3\">...</li>\n            <li *ngFor=\"let pageNum of middlePages\" [class.pagination-current]=\"pageNum === page.current\">\n                <button \n                    *ngIf=\"pageNum !== page.current; else noButton\" \n                    (click)=\"page.current = pageNum\"\n                    type=\"button\">{{pageNum}}</button>\n                <ng-template #noButton>{{pageNum}}</ng-template>\n            </li>\n            <li *ngIf=\"page.current < page.last - 2\">...</li>\n            <li *ngIf=\"page.current < page.last - 1\">\n                <button \n                    (click)=\"page.current = page.last\"\n                    type=\"button\">{{page.last}}</button>\n            </li>\n            <li *ngIf=\"page.current < page.last\">\n                <button \n                    class=\"pagination-next\" \n                    (click)=\"page.next()\"\n                    type=\"button\"></button>\n            </li>\n        </ul>\n    ",
                // IE10 comes to pollute even our components declaration
                styles: [":host { display: block; }"]
            },] },
];
/**
 * @nocollapse
 */
DatagridPagination.ctorParameters = function () { return [
    { type: Page, },
]; };
DatagridPagination.propDecorators = {
    'pageSize': [{ type: core.Input, args: ["clrDgPageSize",] },],
    'totalItems': [{ type: core.Input, args: ["clrDgTotalItems",] },],
    'lastPage': [{ type: core.Input, args: ["clrDgLastPage",] },],
    'currentPage': [{ type: core.Input, args: ["clrDgPage",] },],
    'currentChanged': [{ type: core.Output, args: ["clrDgPageChange",] },],
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
var DatagridRowDetail = (function () {
    /**
     * @param {?} selection
     * @param {?} rowActionService
     * @param {?} expand
     * @param {?} hideableColumnService
     */
    function DatagridRowDetail(selection, rowActionService, expand, hideableColumnService) {
        this.selection = selection;
        this.rowActionService = rowActionService;
        this.expand = expand;
        this.hideableColumnService = hideableColumnService;
        this.SELECTION_TYPE = SelectionType;
    }
    Object.defineProperty(DatagridRowDetail.prototype, "replace", {
        /**
         * @return {?}
         */
        get: function () {
            return this.expand.replace;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.expand.replace = !!value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatagridRowDetail.prototype.ngAfterContentInit = function () {
        var _this = this;
        var /** @type {?} */ columnsList = this.hideableColumnService.getColumns();
        this.updateCellsForColumns(columnsList);
        // Triggered when the Cells list changes per row-renderer
        this.cells.changes.subscribe(function (cellList) {
            var /** @type {?} */ columnList = _this.hideableColumnService.getColumns();
            if (cellList.length === columnList.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
        // Used to set things up the first time but only after all the columns are ready.
        this.subscription = this.hideableColumnService.columnListChange.subscribe(function (columnList) {
            // Prevents cell updates when cols and cells array are not aligned
            if (columnList.length === _this.cells.length) {
                _this.updateCellsForColumns(columnList);
            }
        });
    };
    /**
     * @param {?} columnList
     * @return {?}
     */
    DatagridRowDetail.prototype.updateCellsForColumns = function (columnList) {
        this.cells.forEach(function (cell, index) {
            var /** @type {?} */ currentColumn = columnList[index]; // Accounts for null space.
            if (currentColumn) {
                cell.id = currentColumn.id;
            }
        });
    };
    /**
     * @return {?}
     */
    DatagridRowDetail.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return DatagridRowDetail;
}());
DatagridRowDetail.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-row-detail",
                template: "\n        <ng-container *ngIf=\"!replace\">\n            <clr-dg-cell class=\"datagrid-fixed-column\"\n                *ngIf=\"selection.selectionType === SELECTION_TYPE.Multi \n                    || selection.selectionType === SELECTION_TYPE.Single\"></clr-dg-cell>\n            <clr-dg-cell *ngIf=\"rowActionService.hasActionableRow\" class=\"datagrid-fixed-column\"></clr-dg-cell>\n            <clr-dg-cell class=\"datagrid-fixed-column\"></clr-dg-cell>\n        </ng-container>\n        <ng-content></ng-content>\n    ",
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
DatagridRowDetail.ctorParameters = function () { return [
    { type: Selection, },
    { type: RowActionService, },
    { type: Expand, },
    { type: HideableColumnService, },
]; };
DatagridRowDetail.propDecorators = {
    'cells': [{ type: core.ContentChildren, args: [DatagridCell,] },],
    'replace': [{ type: core.Input, args: ["clrDgReplace",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridBodyRenderer = (function () {
    /**
     * @param {?} el
     * @param {?} organizer
     * @param {?} domAdapter
     */
    function DatagridBodyRenderer(el, organizer, domAdapter) {
        var _this = this;
        this.el = el;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.subscription = organizer.scrollbar.subscribe(function () { return _this.computeScrollbarWidth(); });
    }
    /**
     * @return {?}
     */
    DatagridBodyRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatagridBodyRenderer.prototype.computeScrollbarWidth = function () {
        this.organizer.scrollbarWidth.next(this.domAdapter.scrollBarWidth(this.el.nativeElement));
    };
    return DatagridBodyRenderer;
}());
DatagridBodyRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "[clrDgBody]" },] },
];
/**
 * @nocollapse
 */
DatagridBodyRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NO_LAYOUT_CLASS = "datagrid-no-layout";
var COMPUTE_WIDTH_CLASS = "datagrid-computing-columns-width";
var STRICT_WIDTH_CLASS = "datagrid-fixed-width";
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridCellRenderer = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    function DatagridCellRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.clearWidths.subscribe(function () { return _this.clearWidth(); });
    }
    /**
     * @return {?}
     */
    DatagridCellRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatagridCellRenderer.prototype.clearWidth = function () {
        this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        this.renderer.setStyle(this.el.nativeElement, "width", null);
    };
    /**
     * @param {?} strict
     * @param {?} value
     * @return {?}
     */
    DatagridCellRenderer.prototype.setWidth = function (strict, value) {
        if (strict) {
            this.renderer.addClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, STRICT_WIDTH_CLASS);
        }
        this.renderer.setStyle(this.el.nativeElement, "width", value + "px");
    };
    return DatagridCellRenderer;
}());
DatagridCellRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-dg-cell" },] },
];
/**
 * @nocollapse
 */
DatagridCellRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridColumnResizer = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} dragDispatcher
     */
    function DatagridColumnResizer(el, renderer, organizer, domAdapter, dragDispatcher) {
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.dragDispatcher = dragDispatcher;
        this.columnResizeBy = 0;
        this.dragWithinMinWidth = false;
        this.resizeEmitter = new core.EventEmitter();
        this.subscriptions = [];
        this.columnEl = el.nativeElement;
    }
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.ngOnDestroy = function () {
        this.dragDispatcher.destroy();
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.columnMinWidth = this.domAdapter.minWidth(this.columnEl);
        this.handleTrackerEl = this.dragDispatcher.handleTrackerRef.nativeElement;
        this.dragDispatcher.addDragListener();
        this.subscriptions.push(this.dragDispatcher.onDragStart.subscribe(function () { return _this.dragStartHandler(); }));
        this.subscriptions.push(this.dragDispatcher.onDragMove.subscribe(function ($event) { return _this.dragMoveHandler($event); }));
        this.subscriptions.push(this.dragDispatcher.onDragEnd.subscribe(function () { return _this.dragEndHandler(); }));
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragStartHandler = function () {
        this.renderer.setStyle(this.handleTrackerEl, "display", "block");
        this.renderer.setStyle(document.body, "cursor", "col-resize");
        this.dragDistancePositionX = 0;
        this.columnRectWidth = this.domAdapter.clientRectWidth(this.columnEl);
        this.pageStartPositionX = this.domAdapter.clientRectRight(this.columnEl);
    };
    /**
     * @param {?} moveEvent
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragMoveHandler = function (moveEvent) {
        var /** @type {?} */ pageMovePosition = moveEvent.pageX || moveEvent.changedTouches[0].pageX;
        this.dragDistancePositionX = this.getPositionWithinMax(pageMovePosition - this.pageStartPositionX);
        this.renderer.setStyle(this.handleTrackerEl, "right", -1 * this.dragDistancePositionX + "px");
    };
    /**
     * @return {?}
     */
    DatagridColumnResizer.prototype.dragEndHandler = function () {
        this.renderer.setStyle(this.handleTrackerEl, "right", "0px");
        this.renderer.setStyle(this.handleTrackerEl, "display", "none");
        this.renderer.setStyle(document.body, "cursor", "auto");
        if (this.dragDistancePositionX) {
            this.columnResizeBy = this.dragDistancePositionX;
            this.resizeEmitter.emit(this.columnRectWidth + this.columnResizeBy);
            this.organizer.resize();
        }
    };
    /**
     * @param {?} draggedDistance
     * @return {?}
     */
    DatagridColumnResizer.prototype.getPositionWithinMax = function (draggedDistance) {
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
    };
    return DatagridColumnResizer;
}());
DatagridColumnResizer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-dg-column", providers: [DragDispatcher] },] },
];
/**
 * @nocollapse
 */
DatagridColumnResizer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DragDispatcher, },
]; };
DatagridColumnResizer.propDecorators = {
    'resizeEmitter': [{ type: core.Output, args: ["clrDgColumnResize",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridHeadRenderer = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    function DatagridHeadRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscription = organizer.scrollbarWidth.subscribe(function (width) { return _this.accountForScrollbar(width); });
    }
    /**
     * @return {?}
     */
    DatagridHeadRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} width
     * @return {?}
     */
    DatagridHeadRenderer.prototype.accountForScrollbar = function (width) {
        this.renderer.setStyle(this.el.nativeElement, "padding-right", width + "px");
    };
    return DatagridHeadRenderer;
}());
DatagridHeadRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "[clrDgHead]" },] },
];
/**
 * @nocollapse
 */
DatagridHeadRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridHeaderRenderer = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     * @param {?} domAdapter
     * @param {?} columnResizer
     */
    function DatagridHeaderRenderer(el, renderer, organizer, domAdapter, columnResizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.organizer = organizer;
        this.domAdapter = domAdapter;
        this.columnResizer = columnResizer;
        this.subscriptions = [];
        this.widthSet = false;
        this.subscriptions.push(organizer.clearWidths.subscribe(function () { return _this.clearWidth(); }));
        this.subscriptions.push(organizer.detectStrictWidths.subscribe(function () { return _this.detectStrictWidth(); }));
    }
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.clearWidth = function () {
        // remove the width only if we set it, and it is not changed by dragging.
        if (this.widthSet && !this.columnResizer.columnResizeBy) {
            this.renderer.setStyle(this.el.nativeElement, "width", null);
        }
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.detectStrictWidth = function () {
        if (this.columnResizer.columnResizeBy) {
            this.strictWidth = this.columnResizer.columnRectWidth + this.columnResizer.columnResizeBy;
        }
        else {
            this.strictWidth = this.domAdapter.userDefinedWidth(this.el.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.computeWidth = function () {
        var /** @type {?} */ width = this.strictWidth;
        if (!width) {
            width = this.domAdapter.scrollWidth(this.el.nativeElement);
        }
        return width;
    };
    /**
     * @param {?} width
     * @return {?}
     */
    DatagridHeaderRenderer.prototype.setWidth = function (width) {
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
    };
    return DatagridHeaderRenderer;
}());
DatagridHeaderRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-dg-column" },] },
];
/**
 * @nocollapse
 */
DatagridHeaderRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
    { type: DomAdapter, },
    { type: DatagridColumnResizer, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridMainRenderer = (function () {
    /**
     * @param {?} organizer
     * @param {?} items
     * @param {?} page
     * @param {?} domAdapter
     * @param {?} el
     * @param {?} renderer
     */
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer) {
        var _this = this;
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
        this._subscriptions.push(organizer.computeWidths.subscribe(function () { return _this.computeHeadersWidth(); }));
        this._subscriptions.push(this.page.sizeChange.subscribe(function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        }));
        this._subscriptions.push(this.items.change.subscribe(function () { return _this.shouldStabilizeColumns = true; }));
    }
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._subscriptions.push(this.headers.changes.subscribe(function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        }));
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(function () {
                _this.computeDatagridHeight();
            });
        }
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.shouldComputeHeight = function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
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
    DatagridMainRenderer.prototype.computeDatagridHeight = function () {
        var /** @type {?} */ value = this.domAdapter.computedHeight(this.el.nativeElement);
        this.renderer.setStyle(this.el.nativeElement, "height", value + "px");
        this._heightSet = true;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.resetDatagridHeight = function () {
        this.renderer.setStyle(this.el.nativeElement, "height", "");
        this._heightSet = false;
    };
    /**
     * @return {?}
     */
    DatagridMainRenderer.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Makes each header compute its width.
     * @return {?}
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = function () {
        var _this = this;
        var /** @type {?} */ nbColumns = this.headers.length;
        var /** @type {?} */ allStrict = true;
        this.headers.forEach(function (header, index) {
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
            _this.organizer.widths[index] = { px: header.computeWidth(), strict: !!header.strictWidth };
        });
        this.headers.forEach(function (header, index) { return header.setWidth(_this.organizer.widths[index].px); });
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     * @return {?}
     */
    DatagridMainRenderer.prototype.stabilizeColumns = function () {
        var _this = this;
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
            setTimeout(function () {
                _this.organizer.scrollbar.next();
            });
            return;
        }
        // No point resizing if there are no rows, we wait until they are actually loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    };
    return DatagridMainRenderer;
}());
DatagridMainRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-datagrid", providers: [DomAdapter] },] },
];
/**
 * @nocollapse
 */
DatagridMainRenderer.ctorParameters = function () { return [
    { type: DatagridRenderOrganizer, },
    { type: Items, },
    { type: Page, },
    { type: DomAdapter, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
DatagridMainRenderer.propDecorators = {
    'headers': [{ type: core.ContentChildren, args: [DatagridHeaderRenderer,] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridRowRenderer = (function () {
    /**
     * @param {?} organizer
     */
    function DatagridRowRenderer(organizer) {
        var _this = this;
        this.organizer = organizer;
        this.subscription = organizer.alignColumns.subscribe(function () { return _this.setWidths(); });
    }
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.setWidths = function () {
        var _this = this;
        if (this.organizer.widths.length !== this.cells.length) {
            return;
        }
        this.cells.forEach(function (cell, index) {
            var /** @type {?} */ width = _this.organizer.widths[index];
            cell.setWidth(width.strict, width.px);
        });
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.cells.changes.subscribe(function () {
            _this.setWidths();
        });
    };
    /**
     * @return {?}
     */
    DatagridRowRenderer.prototype.ngAfterViewInit = function () {
        this.setWidths();
    };
    return DatagridRowRenderer;
}());
DatagridRowRenderer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-dg-row, clr-dg-row-detail" },] },
];
/**
 * @nocollapse
 */
DatagridRowRenderer.ctorParameters = function () { return [
    { type: DatagridRenderOrganizer, },
]; };
DatagridRowRenderer.propDecorators = {
    'cells': [{ type: core.ContentChildren, args: [DatagridCellRenderer,] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DatagridTableRenderer = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} organizer
     */
    function DatagridTableRenderer(el, renderer, organizer) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.subscriptions = [];
        this.subscriptions.push(organizer.tableMode.subscribe(function (on) { return _this.tableMode(on); }));
        this.subscriptions.push(organizer.noLayout.subscribe(function (on) { return _this.noLayout(on); }));
    }
    /**
     * @return {?}
     */
    DatagridTableRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    DatagridTableRenderer.prototype.ngAfterViewInit = function () {
        this.outsideContainer.createEmbeddedView(this.projected);
    };
    /**
     * @param {?} on
     * @return {?}
     */
    DatagridTableRenderer.prototype.tableMode = function (on) {
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
    };
    /**
     * @param {?} on
     * @return {?}
     */
    DatagridTableRenderer.prototype.noLayout = function (on) {
        if (on) {
            this.renderer.addClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, NO_LAYOUT_CLASS);
        }
    };
    return DatagridTableRenderer;
}());
DatagridTableRenderer.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dg-table-wrapper",
                template: "\n        <ng-template #head><ng-content select=\"[clrDgHead]\"></ng-content></ng-template>\n        <ng-container #outside></ng-container>\n        <div clrDgBody class=\"datagrid-body\">\n            <ng-container #inside></ng-container>\n            <ng-content></ng-content>\n        </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
DatagridTableRenderer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
    { type: DatagridRenderOrganizer, },
]; };
DatagridTableRenderer.propDecorators = {
    'projected': [{ type: core.ViewChild, args: ["head",] },],
    'outsideContainer': [{ type: core.ViewChild, args: ["outside", { read: core.ViewContainerRef },] },],
    'insideContainer': [{ type: core.ViewChild, args: ["inside", { read: core.ViewContainerRef },] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DATAGRID_DIRECTIVES = [
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
var ClrDatagridModule = (function () {
    function ClrDatagridModule() {
    }
    return ClrDatagridModule;
}());
ClrDatagridModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule, ClrIconModule, ClrFormsModule, forms.FormsModule, ClrCommonPopoverModule, ClrLoadingModule,
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
ClrDatagridModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StackBlock = (function () {
    /**
     * @param {?} parent
     */
    function StackBlock(parent) {
        this.parent = parent;
        this.expanded = false;
        this.expandedChange = new core.EventEmitter(false);
        this.expandable = false;
        this._changedChildren = 0;
        this._fullyInitialized = false;
        this._changed = false;
        if (parent) {
            parent.addChild();
        }
    }
    Object.defineProperty(StackBlock.prototype, "getChangedValue", {
        /**
         * @return {?}
         */
        get: function () {
            return this._changed || (this._changedChildren > 0 && !this.expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StackBlock.prototype, "setChangedValue", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._changed = value;
            if (this.parent && this._fullyInitialized) {
                if (value) {
                    this.parent._changedChildren++;
                }
                else {
                    this.parent._changedChildren--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StackBlock.prototype.ngOnInit = function () {
        // in order to access the parent StackBlock's properties,
        // the child StackBlock  has to be fully initialized at first.
        this._fullyInitialized = true;
    };
    /**
     * @return {?}
     */
    StackBlock.prototype.addChild = function () {
        this.expandable = true;
    };
    /**
     * @return {?}
     */
    StackBlock.prototype.toggleExpand = function () {
        if (this.expandable) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    return StackBlock;
}());
StackBlock.decorators = [
    { type: core.Component, args: [{
                selector: "clr-stack-block",
                template: "\n        <dt class=\"stack-block-label\" (click)=\"toggleExpand()\">\n            <ng-content select=\"clr-stack-label\"></ng-content>\n        </dt>\n        <dd class=\"stack-block-content\">\n            <ng-content></ng-content>\n        </dd>\n        <!-- FIXME: remove this string concatenation when boolean states are supported -->\n        <div [@collapse]=\"''+!expanded\" class=\"stack-children\">\n            <ng-content select=\"clr-stack-block\"></ng-content>\n        </div>\n    ",
                // Custom elements are inline by default
                styles: ["\n        :host { display: block; }\n    "],
                // Make sure the host has the proper class for styling purposes
                host: { "[class.stack-block]": "true" },
                animations: [animations.trigger("collapse", [
                        animations.state("true", animations.style({ "height": 0, "overflow-y": "hidden" })),
                        animations.transition("true => false", [animations.animate("0.2s ease-in-out", animations.style({ "height": "*", "overflow-y": "hidden" }))]),
                        animations.transition("false => true", [animations.style({ "height": "*", "overflow-y": "hidden" }), animations.animate("0.2s ease-in-out")])
                    ])]
            },] },
];
/**
 * @nocollapse
 */
StackBlock.ctorParameters = function () { return [
    { type: StackBlock, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
StackBlock.propDecorators = {
    'expanded': [{ type: core.HostBinding, args: ["class.stack-block-expanded",] }, { type: core.Input, args: ["clrSbExpanded",] },],
    'expandedChange': [{ type: core.Output, args: ["clrSbExpandedChange",] },],
    'expandable': [{ type: core.HostBinding, args: ["class.stack-block-expandable",] }, { type: core.Input, args: ["clrSbExpandable",] },],
    'getChangedValue': [{ type: core.HostBinding, args: ["class.stack-block-changed",] },],
    'setChangedValue': [{ type: core.Input, args: ["clrSbNotifyChange",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StackView = (function () {
    function StackView() {
        /**
         * Undocumented experimental feature: inline editing.
         */
        this.editable = false;
        this.save = new core.EventEmitter(false);
        this._editMode = false;
        this.editingChange = new core.EventEmitter(false);
    }
    Object.defineProperty(StackView.prototype, "editing", {
        /**
         * @return {?}
         */
        get: function () {
            return this.editable && this._editMode;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this.editable) {
                this._editMode = value;
                this.editingChange.emit(value);
                if (!value) {
                    this.save.emit(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return StackView;
}());
/**
 * End of undocumented experimental feature.
 */
StackView.decorators = [
    { type: core.Component, args: [{
                selector: "clr-stack-view",
                template: "\n        <ng-content select=\"clr-stack-header\"></ng-content>\n        <dl class=\"stack-view\"><ng-content></ng-content></dl>\n    ",
                // Custom elements are inline by default.
                styles: ["\n        :host { display: block; }\n    "]
            },] },
];
/**
 * @nocollapse
 */
StackView.ctorParameters = function () { return []; };
StackView.propDecorators = {
    'save': [{ type: core.Output, args: ["clrStackSave",] },],
};
var StackViewCustomTags = (function () {
    function StackViewCustomTags() {
    }
    return StackViewCustomTags;
}());
// No behavior
// The only purpose is to "declare" the tag in Angular
StackViewCustomTags.decorators = [
    { type: core.Directive, args: [{ selector: "clr-stack-label, clr-stack-content" },] },
];
/**
 * @nocollapse
 */
StackViewCustomTags.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var StackHeader = (function () {
    /**
     * @param {?} stackView
     */
    function StackHeader(stackView) {
        this.stackView = stackView;
    }
    return StackHeader;
}());
StackHeader.decorators = [
    { type: core.Component, args: [{
                selector: "clr-stack-header",
                template: "\n        <h4 class=\"stack-header\">\n            <span class=\"stack-title\"><ng-content></ng-content></span>\n            \n            <span class=\"stack-actions\">\n                <ng-content select=\".stack-action\"></ng-content>\n                <!-- Undocumented experimental feature: inline editing. -->\n                <button *ngIf=\"stackView.editable\" class=\"stack-action btn btn-sm btn-link\" \n                        (click)=\"stackView.editing = !stackView.editing\" type=\"button\">\n                        Edit\n                </button>\n                <!-- End of undocumented experimental feature. -->\n            </span>\n        </h4>\n    ",
                // Custom elements are inline by default
                styles: ["\n        :host { display: block; }\n    "]
            },] },
];
/**
 * @nocollapse
 */
StackHeader.ctorParameters = function () { return [
    { type: StackView, },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Undocumented experimental feature: inline editing.
 */
var StackControl = (function () {
    /**
     * @param {?} stackView
     */
    function StackControl(stackView) {
        var _this = this;
        this.stackView = stackView;
        this.modelChange = new core.EventEmitter(false);
        // Make the StackView editable, since it contains a StackControl
        this.stackView.editable = true;
        this.stackView.editingChange.subscribe(function (editing) {
            // Edit mode was closed
            if (!editing) {
                _this.modelChange.emit(_this.model);
            }
        });
    }
    return StackControl;
}());
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
var StackInput = (function (_super) {
    __extends(StackInput, _super);
    /**
     * @param {?} stackView
     */
    function StackInput(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        _this.type = "text";
        return _this;
    }
    return StackInput;
}(StackControl));
StackInput.decorators = [
    { type: core.Component, args: [{
                selector: "clr-stack-input",
                inputs: ["model: clrModel", "type"],
                outputs: ["modelChange: clrModelChange"],
                template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <input [type]=\"type\" *ngIf=\"stackView.editing\" [(ngModel)]=\"model\"/>\n    "
            },] },
];
/**
 * @nocollapse
 */
StackInput.ctorParameters = function () { return [
    { type: StackView, },
]; };
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
var StackSelect = (function (_super) {
    __extends(StackSelect, _super);
    /**
     * @param {?} stackView
     */
    function StackSelect(stackView) {
        var _this = _super.call(this, stackView) || this;
        _this.stackView = stackView;
        return _this;
    }
    return StackSelect;
}(StackControl));
StackSelect.decorators = [
    { type: core.Component, args: [{
                selector: "clr-stack-select",
                inputs: ["model: clrModel"],
                outputs: ["modelChange: clrModelChange"],
                template: "\n        <span *ngIf=\"!stackView.editing\">{{model}}</span>\n        <div class=\"select\" *ngIf=\"stackView.editing\" >\n            <select [(ngModel)]=\"model\">\n                <ng-content></ng-content>\n            </select>\n        </div>\n    "
            },] },
];
/**
 * @nocollapse
 */
StackSelect.ctorParameters = function () { return [
    { type: StackView, },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var STACK_VIEW_DIRECTIVES = [
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
var ClrStackViewModule = (function () {
    function ClrStackViewModule() {
    }
    return ClrStackViewModule;
}());
ClrStackViewModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule, forms.FormsModule], declarations: [STACK_VIEW_DIRECTIVES], exports: [STACK_VIEW_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrStackViewModule.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var AbstractTreeSelection = (function () {
    /**
     * @param {?} parent
     */
    function AbstractTreeSelection(parent) {
        this.parent = parent;
        this._selected = false;
        this._indeterminate = false;
    }
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.children = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.selectedChanged = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTreeSelection.prototype.indeterminateChanged = function () { };
    Object.defineProperty(AbstractTreeSelection.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._selected = value;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(value); });
            if (this.parent) {
                this.parent.childChanged();
            }
            this.selectedChanged();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractTreeSelection.prototype, "indeterminate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._indeterminate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this._indeterminate !== value) {
                this._indeterminate = value;
                this.indeterminateChanged();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AbstractTreeSelection.prototype.childChanged = function () {
        var /** @type {?} */ oneSelectedChild = false;
        var /** @type {?} */ previousSelectedValue = this._selected;
        var /** @type {?} */ previousIndeterminateValue = this._indeterminate;
        this._selected = true;
        this._indeterminate = false;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
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
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    AbstractTreeSelection.prototype.parentChanged = function (selected) {
        if (selected && !this.selected) {
            this._selected = true;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(true); });
            this.selectedChanged();
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this.indeterminate = false;
            this.children.forEach(function (child) { return child.parentChanged(false); });
            this.selectedChanged();
        }
    };
    return AbstractTreeSelection;
}());
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TreeSelectionService = (function () {
    function TreeSelectionService() {
        this.selectable = false;
    }
    return TreeSelectionService;
}());
TreeSelectionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
TreeSelectionService.ctorParameters = function () { return []; };
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
var TreeNode = (function (_super) {
    __extends(TreeNode, _super);
    /**
     * @param {?} nodeExpand
     * @param {?} parent
     * @param {?} treeSelectionService
     */
    function TreeNode(nodeExpand, parent, treeSelectionService) {
        var _this = _super.call(this, parent) || this;
        _this.nodeExpand = nodeExpand;
        _this.parent = parent;
        _this.treeSelectionService = treeSelectionService;
        _this._children = [];
        _this.nodeSelectedChange = new core.EventEmitter(true);
        _this.nodeIndeterminateChanged = new core.EventEmitter(true);
        if (_this.parent) {
            _this.parent.register(_this);
        }
        return _this;
    }
    Object.defineProperty(TreeNode.prototype, "children", {
        /**
         * @return {?}
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @return {?}
     */
    TreeNode.prototype.checkIfChildNodeRegistered = function (node) {
        return (this.children.indexOf(node) > -1);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    TreeNode.prototype.register = function (node) {
        if (!this.checkIfChildNodeRegistered(node)) {
            this.children.push(node);
            if (this.selectable) {
                if (this.selected) {
                    node.parentChanged(this.selected);
                }
            }
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    TreeNode.prototype.unregister = function (node) {
        var /** @type {?} */ index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    /**
     * @return {?}
     */
    TreeNode.prototype.activateSelection = function () {
        if (this.treeSelectionService && !this.treeSelectionService.selectable) {
            this.treeSelectionService.selectable = true;
        }
    };
    Object.defineProperty(TreeNode.prototype, "nodeSelected", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            // required for recursive trees to discard unset inputs.
            this.activateSelection();
            if (value === undefined || value === null) {
                return;
            }
            if (this.selected !== value) {
                this.selected = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeNode.prototype.selectedChanged = function () {
        this.nodeSelectedChange.emit(this.selected);
    };
    Object.defineProperty(TreeNode.prototype, "selectable", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.treeSelectionService) {
                return this.treeSelectionService.selectable;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "nodeIndeterminate", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.indeterminate = value;
            this.activateSelection();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeNode.prototype.indeterminateChanged = function () {
        this.nodeIndeterminateChanged.emit(this.indeterminate);
    };
    /**
     * @return {?}
     */
    TreeNode.prototype.toggleExpand = function () {
        this.nodeExpand.expanded = !this.nodeExpand.expanded;
    };
    Object.defineProperty(TreeNode.prototype, "caretDirection", {
        /**
         * @return {?}
         */
        get: function () {
            return (this.nodeExpand.expanded) ? "down" : "right";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this.nodeExpand.expanded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this.nodeExpand.expanded !== value) {
                this.nodeExpand.expanded = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "state", {
        /**
         * @return {?}
         */
        get: function () {
            return (this.expanded && !this.nodeExpand.loading) ? "expanded" : "collapsed";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TreeNode.prototype.ngOnDestroy = function () {
        if (this.parent) {
            this.parent.unregister(this);
        }
    };
    return TreeNode;
}(AbstractTreeSelection));
TreeNode.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tree-node",
                template: "\n      <div class=\"clr-tree-node-content-container\">\n          <button\n              type=\"button\"\n              class=\"clr-treenode-caret\"\n              (click)=\"toggleExpand()\"\n              *ngIf=\"nodeExpand.expandable && !nodeExpand.loading\">\n              <clr-icon\n                  class=\"clr-treenode-caret-icon\"\n                  shape=\"caret\"\n                  [attr.dir]=\"caretDirection\"></clr-icon>\n          </button>\n          <div class=\"clr-treenode-spinner-container\" *ngIf=\"nodeExpand.expandable && nodeExpand.loading\">\n              <span class=\"clr-treenode-spinner spinner\">\n                  Loading...\n              </span>\n          </div>\n          <clr-checkbox\n              class=\"clr-treenode-checkbox\"\n              *ngIf=\"selectable\"\n              [(ngModel)]=\"selected\"\n              [(clrIndeterminate)]=\"indeterminate\"></clr-checkbox>\n          <div class=\"clr-treenode-content\">\n              <ng-content></ng-content>\n          </div>\n      </div>\n      <!-- FIXME: remove this string concatenation when boolean states are supported -->\n      <div\n          class=\"clr-treenode-children\"\n          [@childNodesState]=\"state\">\n          <ng-content select=\"clr-tree-node\"></ng-content>\n          <ng-content select=\"[clrIfExpanded]\"></ng-content>\n      </div>\n    ",
                providers: [
                    Expand, { provide: LoadingListener, useExisting: Expand }, {
                        provide: TreeSelectionService,
                        useFactory: clrTreeSelectionProviderFactory,
                        deps: [[new core.Optional(), new core.SkipSelf(), TreeSelectionService]]
                    }
                ],
                animations: [animations.trigger("childNodesState", [
                        animations.state("expanded", animations.style({ "height": "*", "overflow-y": "hidden" })),
                        animations.state("collapsed", animations.style({ "height": 0, "overflow-y": "hidden" })),
                        animations.transition("expanded <=> collapsed", animations.animate("0.2s ease-in-out"))
                    ])],
                host: { "class": ".clr-tree-node" }
            },] },
];
/**
 * @nocollapse
 */
TreeNode.ctorParameters = function () { return [
    { type: Expand, },
    { type: TreeNode, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
    { type: TreeSelectionService, },
]; };
TreeNode.propDecorators = {
    'nodeSelected': [{ type: core.Input, args: ["clrSelected",] },],
    'nodeSelectedChange': [{ type: core.Output, args: ["clrSelectedChange",] },],
    'nodeIndeterminate': [{ type: core.Input, args: ["clrIndeterminate",] },],
    'nodeIndeterminateChanged': [{ type: core.Output, args: ["clrIndeterminateChange",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TREE_VIEW_DIRECTIVES = [TreeNode];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTreeViewModule = (function () {
    function ClrTreeViewModule() {
    }
    return ClrTreeViewModule;
}());
ClrTreeViewModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, forms.FormsModule, ClrFormsModule],
                declarations: [TREE_VIEW_DIRECTIVES],
                exports: [TREE_VIEW_DIRECTIVES, ClrIfExpandModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTreeViewModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDataModule = (function () {
    function ClrDataModule() {
    }
    return ClrDataModule;
}());
ClrDataModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrDatagridModule, ClrStackViewModule, ClrTreeViewModule] },] },
];
/**
 * @nocollapse
 */
ClrDataModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var activeCounter = 0;
var IF_ACTIVE_ID = new core.InjectionToken("IF_ACTIVE_ID");
/**
 * @return {?}
 */
function tokenFactory() {
    return ++activeCounter;
}
var IF_ACTIVE_ID_PROVIDER = {
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
var IfActiveService = (function () {
    function IfActiveService() {
        /**
         * *****
         * \@property _currentChange
         *
         * \@description
         * A RXJS Subject that updates and provides subscriptions to for the current current state of a component template
         * implemting the IfActive structural directive.
         *
         */
        this._currentChange = new Subject.Subject();
    }
    Object.defineProperty(IfActiveService.prototype, "currentChange", {
        /**
         * ******
         * \@function currentChange
         *
         * \@description
         * A getter function that provides an observable for the _current Subject.
         *
         * @return {?}
         */
        get: function () {
            return this._currentChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IfActiveService.prototype, "current", {
        /**
         * ******
         *
         * \@function current
         *
         * \@description
         * A getter that returns the current value of this IfActive instance.
         * @return {?}
         */
        get: function () {
            return this._current;
        },
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
        set: function (value) {
            if (this._current !== value) {
                this._current = value;
                this._currentChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return IfActiveService;
}());
IfActiveService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
IfActiveService.ctorParameters = function () { return []; };
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
var IfActiveDirective = (function () {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} template
     * @param {?} container
     */
    function IfActiveDirective(ifActiveService, id, template, container) {
        var _this = this;
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
        this.activeChange = new core.EventEmitter(false);
        this.checkAndUpdateView(ifActiveService.current);
        this.subscription = this.ifActiveService.currentChange.subscribe(function (newCurrentId) {
            _this.checkAndUpdateView(newCurrentId);
        });
    }
    /**
     * @param {?} currentId
     * @return {?}
     */
    IfActiveDirective.prototype.checkAndUpdateView = function (currentId) {
        var /** @type {?} */ isNowActive = currentId === this.id;
        // only emit if the new active state is changed since last time.
        if (isNowActive !== this.wasActive) {
            this.updateView(isNowActive);
            this.activeChange.emit(isNowActive);
            this.wasActive = isNowActive;
        }
    };
    Object.defineProperty(IfActiveDirective.prototype, "active", {
        /**
         * *****
         * \@function active
         *
         * \@description
         * A getter that returns the current IfActiveService.active value.
         * @return {?}
         */
        get: function () {
            return this.ifActiveService.current === this.id;
        },
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
        set: function (value) {
            if (value) {
                this.ifActiveService.current = this.id;
            }
        },
        enumerable: true,
        configurable: true
    });
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
    IfActiveDirective.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    /**
     * @return {?}
     */
    IfActiveDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return IfActiveDirective;
}());
IfActiveDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrIfActive]" },] },
];
/**
 * @nocollapse
 */
IfActiveDirective.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
IfActiveDirective.propDecorators = {
    'active': [{ type: core.Input, args: ["clrIfActive",] },],
    'activeChange': [{ type: core.Output, args: ["clrIfActiveChange",] },],
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
var IfOpenDirective = (function () {
    /**
     * @param {?} ifOpenService
     * @param {?} template
     * @param {?} container
     */
    function IfOpenDirective(ifOpenService, template, container) {
        var _this = this;
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
        this.openChange = new core.EventEmitter(false);
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            _this.updateView(change);
            _this.openChange.emit(change);
        });
    }
    Object.defineProperty(IfOpenDirective.prototype, "open", {
        /**
         * *****
         * \@function open
         *
         * \@description
         * A getter that returns the current IfOpenService.open value.
         * @return {?}
         */
        get: function () {
            return this.ifOpenService.open;
        },
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
        set: function (value) {
            this.ifOpenService.open = value;
        },
        enumerable: true,
        configurable: true
    });
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
    IfOpenDirective.prototype.updateView = function (value) {
        if (value) {
            this.container.createEmbeddedView(this.template);
        }
        else {
            this.container.clear();
        }
    };
    /**
     * @return {?}
     */
    IfOpenDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return IfOpenDirective;
}());
IfOpenDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrIfOpen]" },] },
];
/**
 * @nocollapse
 */
IfOpenDirective.ctorParameters = function () { return [
    { type: IfOpenService, },
    { type: core.TemplateRef, },
    { type: core.ViewContainerRef, },
]; };
IfOpenDirective.propDecorators = {
    'open': [{ type: core.Input, args: ["clrIfOpen",] },],
    'openChange': [{ type: core.Output, args: ["clrIfOpenChange",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var CONDITIONAL_DIRECTIVES = [IfActiveDirective, IfOpenDirective];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrConditionalModule = (function () {
    function ClrConditionalModule() {
    }
    return ClrConditionalModule;
}());
ClrConditionalModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule], declarations: [CONDITIONAL_DIRECTIVES], exports: [CONDITIONAL_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrConditionalModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var RootDropdownService = (function () {
    function RootDropdownService() {
        this._changes = new Subject.Subject();
    }
    Object.defineProperty(RootDropdownService.prototype, "changes", {
        /**
         * @return {?}
         */
        get: function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RootDropdownService.prototype.closeMenus = function () {
        this._changes.next(false);
    };
    return RootDropdownService;
}());
RootDropdownService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
RootDropdownService.ctorParameters = function () { return []; };
/**
 * @param {?} existing
 * @return {?}
 */
function clrRootDropdownFactory(existing) {
    return existing || new RootDropdownService();
}
var ROOT_DROPDOWN_PROVIDER = {
    provide: RootDropdownService,
    useFactory: clrRootDropdownFactory,
    deps: [[new core.Optional(), new core.SkipSelf(), RootDropdownService]]
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Dropdown = (function () {
    /**
     * @param {?} parent
     * @param {?} ifOpenService
     * @param {?} dropdownService
     */
    function Dropdown(parent, ifOpenService, dropdownService) {
        var _this = this;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.isMenuClosable = true;
        this._subscription = dropdownService.changes.subscribe(function (value) { return _this.ifOpenService.open = value; });
    }
    /**
     * @return {?}
     */
    Dropdown.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return Dropdown;
}());
Dropdown.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dropdown",
                template: "<ng-content></ng-content>",
                host: {
                    "[class.dropdown]": "true",
                    // FIXME: remove this as soon as we stop supporting this old <div class="dropdown-menu"> syntax
                    "[class.open]": "ifOpenService.open"
                },
                providers: [IfOpenService, ROOT_DROPDOWN_PROVIDER, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Dropdown.ctorParameters = function () { return [
    { type: Dropdown, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
    { type: IfOpenService, },
    { type: RootDropdownService, },
]; };
Dropdown.propDecorators = {
    'isMenuClosable': [{ type: core.Input, args: ["clrCloseMenuOnItemClick",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DropdownItem = (function () {
    /**
     * @param {?} dropdown
     * @param {?} el
     * @param {?} _dropdownService
     */
    function DropdownItem(dropdown, el, _dropdownService) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
    }
    /**
     * @return {?}
     */
    DropdownItem.prototype.onDropdownItemClick = function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains("disabled")) {
            this._dropdownService.closeMenus();
        }
    };
    return DropdownItem;
}());
DropdownItem.decorators = [
    { type: core.Directive, args: [{ selector: "[clrDropdownItem]", host: { "[class.dropdown-item]": "true" } },] },
];
/**
 * @nocollapse
 */
DropdownItem.ctorParameters = function () { return [
    { type: Dropdown, },
    { type: core.ElementRef, },
    { type: RootDropdownService, },
]; };
DropdownItem.propDecorators = {
    'onDropdownItemClick': [{ type: core.HostListener, args: ["click",] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * @abstract
 */
var AbstractPopover = (function () {
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    function AbstractPopover(injector, parentHost) {
        var _this = this;
        this.parentHost = parentHost;
        this.updateAnchor = false;
        this.popoverOptions = {};
        this.closeOnOutsideClick = false;
        this.el = injector.get(core.ElementRef);
        this.ifOpenService = injector.get(IfOpenService);
        this.renderer = injector.get(core.Renderer2);
        // Default anchor is the parent host
        this.anchorElem = parentHost.nativeElement;
        this.popoverInstance = new Popover(this.el.nativeElement);
        this.subscription = this.ifOpenService.openChange.subscribe(function (change) {
            change ? _this.anchor() : _this.release();
        });
        if (this.ifOpenService.open) {
            this.anchor();
        }
    }
    /**
     * @return {?}
     */
    AbstractPopover.prototype.anchor = function () {
        this.updateAnchor = true;
        // Ugh
        this.ignore = this.ifOpenService.originalEvent;
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.release = function () {
        this.detachOutsideClickListener();
        this.popoverInstance.release();
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.updateAnchor) {
            this.updateAnchor = false;
            this.popoverInstance.anchor(this.anchorElem, this.anchorPoint, this.popoverPoint, this.popoverOptions)
                .subscribe(function () {
                // if a scroll event is detected, close the popover
                _this.ifOpenService.open = false;
            });
            this.attachOutsideClickListener();
        }
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.ngOnDestroy = function () {
        this.release();
        this.subscription.unsubscribe();
    };
    Object.defineProperty(AbstractPopover.prototype, "isOffScreen", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifOpenService.open ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AbstractPopover.prototype.attachOutsideClickListener = function () {
        var _this = this;
        if (this.closeOnOutsideClick) {
            this.hostListener = this.renderer.listen(this.el.nativeElement, "click", function (event) { return _this.ignore = event; });
            this.documentListener = this.renderer.listen("document", "click", function (event) {
                if (event === _this.ignore) {
                    delete _this.ignore;
                }
                else {
                    _this.ifOpenService.open = false;
                }
            });
        }
    };
    /**
     * @return {?}
     */
    AbstractPopover.prototype.detachOutsideClickListener = function () {
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
    };
    return AbstractPopover;
}());
AbstractPopover.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
AbstractPopover.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.SkipSelf },] },
]; };
AbstractPopover.propDecorators = {
    'isOffScreen': [{ type: core.HostBinding, args: ["class.is-off-screen",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DropdownMenu = (function (_super) {
    __extends(DropdownMenu, _super);
    /**
     * @param {?} injector
     * @param {?} parentHost
     * @param {?} nested
     */
    function DropdownMenu(injector, parentHost, nested) {
        var _this = this;
        if (!parentHost) {
            throw new Error("clr-dropdown-menu should only be used inside of a clr-dropdown");
        }
        _this = _super.call(this, injector, parentHost) || this;
        if (!nested) {
            // Default positioning for normal dropdown is bottom-left
            _this.anchorPoint = Point.BOTTOM_LEFT;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        else {
            // Default positioning for nested dropdown is right-top
            _this.anchorPoint = Point.RIGHT_TOP;
            _this.popoverPoint = Point.LEFT_TOP;
        }
        _this.popoverOptions.allowMultipleOpen = true;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    Object.defineProperty(DropdownMenu.prototype, "position", {
        /**
         * @param {?} position
         * @return {?}
         */
        set: function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    return DropdownMenu;
}(AbstractPopover));
DropdownMenu.decorators = [
    { type: core.Component, args: [{
                selector: "clr-dropdown-menu",
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    "[class.dropdown-menu]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
DropdownMenu.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
    { type: DropdownMenu, decorators: [{ type: core.Optional }, { type: core.SkipSelf },] },
]; };
DropdownMenu.propDecorators = {
    'position': [{ type: core.Input, args: ["clrPosition",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DropdownTrigger = (function () {
    /**
     * @param {?} dropdown
     * @param {?} ifOpenService
     */
    function DropdownTrigger(dropdown, ifOpenService) {
        this.dropdown = dropdown;
        this.ifOpenService = ifOpenService;
        this.isRootLevelToggle = true;
        // if the containing dropdown has a parent, then this is not the root level one
        if (dropdown.parent) {
            this.isRootLevelToggle = false;
        }
    }
    Object.defineProperty(DropdownTrigger.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifOpenService.open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DropdownTrigger.prototype.onDropdownTriggerClick = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return DropdownTrigger;
}());
DropdownTrigger.decorators = [
    { type: core.Directive, args: [{
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
DropdownTrigger.ctorParameters = function () { return [
    { type: Dropdown, },
    { type: IfOpenService, },
]; };
DropdownTrigger.propDecorators = {
    'onDropdownTriggerClick': [{ type: core.HostListener, args: ["click", ["$event"],] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DROPDOWN_DIRECTIVES = [Dropdown, DropdownMenu, DropdownTrigger, DropdownItem];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrDropdownModule = (function () {
    function ClrDropdownModule() {
    }
    return ClrDropdownModule;
}());
ClrDropdownModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule],
                declarations: [DROPDOWN_DIRECTIVES],
                exports: [DROPDOWN_DIRECTIVES, ClrConditionalModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrDropdownModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// TODO: alert-* types are deprecated and should be removed before 1.0!
var ALERT_TYPES = ["alert-info", "alert-warning", "alert-danger", "alert-success", "info", "warning", "danger", "success"];
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AlertIconAndTypesService = (function () {
    function AlertIconAndTypesService() {
        this.defaultIconShape = "info-circle";
        this._alertIconShape = "";
        this._alertType = "info";
    }
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertType", {
        /**
         * @return {?}
         */
        get: function () {
            return this._alertType;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (ALERT_TYPES.indexOf(val) > -1) {
                this._alertType = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertIconAndTypesService.prototype, "alertIconShape", {
        /**
         * @return {?}
         */
        get: function () {
            if ("" === this._alertIconShape) {
                return this.iconInfoFromType(this._alertType).shape;
            }
            return this._alertIconShape;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            if (!val) {
                this._alertIconShape = "";
            }
            else if (val !== this._alertIconShape) {
                this._alertIconShape = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @param {?=} classOrShape
     * @return {?}
     */
    AlertIconAndTypesService.prototype.iconInfoFromType = function (type, classOrShape) {
        if (classOrShape === void 0) { classOrShape = "shape"; }
        var /** @type {?} */ returnObj = { shape: "", cssClass: "" };
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
    };
    return AlertIconAndTypesService;
}());
AlertIconAndTypesService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
AlertIconAndTypesService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// providers
var Alert = (function () {
    /**
     * @param {?} iconService
     */
    function Alert(iconService) {
        this.iconService = iconService;
        this.isSmall = false;
        this.closable = true;
        this.isAppLevel = false;
        this._closed = false;
        this._closedChanged = new core.EventEmitter(false);
    }
    Object.defineProperty(Alert.prototype, "alertType", {
        /**
         * @return {?}
         */
        get: function () {
            return this.iconService.alertType;
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            this.iconService.alertType = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "alertIconShape", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.iconService.alertIconShape = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "alertClass", {
        /**
         * @return {?}
         */
        get: function () {
            return this.iconService.iconInfoFromType(this.iconService.alertType).cssClass;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Alert.prototype.close = function () {
        if (!this.closable) {
            return;
        }
        this._closed = true;
        this._closedChanged.emit(true);
    };
    /**
     * @return {?}
     */
    Alert.prototype.open = function () {
        this._closed = false;
        this._closedChanged.emit(false);
    };
    return Alert;
}());
Alert.decorators = [
    { type: core.Component, args: [{ selector: "clr-alert", providers: [AlertIconAndTypesService], template: "\n  <!--\n    ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.\n    ~ This software is released under MIT license.\n    ~ The full license information can be found in LICENSE in the root directory of this project.\n    -->\n\n  <div\n      *ngIf=\"!_closed\"\n      class=\"alert\"\n      [ngClass]=\"alertClass\"\n      [class.alert-sm]=\"isSmall\"\n      [class.alert-app-level]=\"isAppLevel\">\n      <div class=\"alert-items\">\n          <ng-content></ng-content>\n      </div>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" *ngIf=\"closable\" (click)=\"close()\">\n          <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n      </button>\n  </div>\n" },] },
];
/**
 * @nocollapse
 */
Alert.ctorParameters = function () { return [
    { type: AlertIconAndTypesService, },
]; };
Alert.propDecorators = {
    'isSmall': [{ type: core.Input, args: ["clrAlertSizeSmall",] },],
    'closable': [{ type: core.Input, args: ["clrAlertClosable",] },],
    'isAppLevel': [{ type: core.Input, args: ["clrAlertAppLevel",] },],
    '_closed': [{ type: core.Input, args: ["clrAlertClosed",] },],
    '_closedChanged': [{ type: core.Output, args: ["clrAlertClosedChange",] },],
    'alertType': [{ type: core.Input, args: ["clrAlertType",] },],
    'alertIconShape': [{ type: core.Input, args: ["clrAlertIcon",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AlertItem = (function () {
    /**
     * @param {?} iconService
     */
    function AlertItem(iconService) {
        this.iconService = iconService;
    }
    return AlertItem;
}());
AlertItem.decorators = [
    { type: core.Component, args: [{
                // the .alert-item selector is deprecated; the :not clause is to allow us to use static
                // examples in demos on the demo-app and website
                selector: ".alert-item:not(.static), clr-alert-item",
                template: "\n        <div class=\"alert-icon-wrapper\">\n            <clr-icon class=\"alert-icon\" [attr.shape]=\"iconService.alertIconShape\"></clr-icon>\n        </div>\n        <ng-content></ng-content>\n    ",
                host: { "class": "alert-item" }
            },] },
];
/**
 * @nocollapse
 */
AlertItem.ctorParameters = function () { return [
    { type: AlertIconAndTypesService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ALERT_DIRECTIVES = [Alert, AlertItem];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrAlertModule = (function () {
    function ClrAlertModule() {
    }
    return ClrAlertModule;
}());
ClrAlertModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [ALERT_DIRECTIVES],
                exports: [ALERT_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrAlertModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrEmphasisModule = (function () {
    function ClrEmphasisModule() {
    }
    return ClrEmphasisModule;
}());
ClrEmphasisModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrAlertModule] },] },
];
/**
 * @nocollapse
 */
ClrEmphasisModule.ctorParameters = function () { return []; };
var ClrResponsiveNavCodes = (function () {
    function ClrResponsiveNavCodes() {
    }
    return ClrResponsiveNavCodes;
}());
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
var ClrResponsiveNavControlMessage = (function () {
    /**
     * @param {?} _controlCode
     * @param {?} _navLevel
     */
    function ClrResponsiveNavControlMessage(_controlCode, _navLevel) {
        this._controlCode = _controlCode;
        this._navLevel = _navLevel;
    }
    Object.defineProperty(ClrResponsiveNavControlMessage.prototype, "controlCode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._controlCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrResponsiveNavControlMessage.prototype, "navLevel", {
        /**
         * @return {?}
         */
        get: function () {
            return this._navLevel;
        },
        enumerable: true,
        configurable: true
    });
    return ClrResponsiveNavControlMessage;
}());
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrResponsiveNavigationService = (function () {
    function ClrResponsiveNavigationService() {
        this.responsiveNavList = [];
        this.registerNavSubject = new Subject.Subject();
        this.controlNavSubject = new Subject.Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    Object.defineProperty(ClrResponsiveNavigationService.prototype, "registeredNavs", {
        /**
         * @return {?}
         */
        get: function () {
            return this.registerNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClrResponsiveNavigationService.prototype, "navControl", {
        /**
         * @return {?}
         */
        get: function () {
            return this.controlNavSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ClrResponsiveNavigationService.prototype.registerNav = function (navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    };
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ClrResponsiveNavigationService.prototype.isNavRegistered = function (navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error("Multiple clr-nav-level " + navLevel +
                " attributes found. Please make sure that only one exists");
            return true;
        }
        return false;
    };
    /**
     * @param {?} navLevel
     * @return {?}
     */
    ClrResponsiveNavigationService.prototype.unregisterNav = function (navLevel) {
        var /** @type {?} */ index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    };
    /**
     * @param {?} controlCode
     * @param {?} navLevel
     * @return {?}
     */
    ClrResponsiveNavigationService.prototype.sendControlMessage = function (controlCode, navLevel) {
        var /** @type {?} */ message = new ClrResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    };
    /**
     * @return {?}
     */
    ClrResponsiveNavigationService.prototype.closeAllNavs = function () {
        var /** @type {?} */ message = new ClrResponsiveNavControlMessage(ClrResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    };
    return ClrResponsiveNavigationService;
}());
ClrResponsiveNavigationService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ClrResponsiveNavigationService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var MainContainer = (function () {
    /**
     * @param {?} elRef
     * @param {?} responsiveNavService
     */
    function MainContainer(elRef, responsiveNavService) {
        this.elRef = elRef;
        this.responsiveNavService = responsiveNavService;
    }
    /**
     * @return {?}
     */
    MainContainer.prototype.ngOnInit = function () {
        var _this = this;
        this._classList = this.elRef.nativeElement.classList;
        this._subscription = this.responsiveNavService.navControl.subscribe({
            next: function (message) {
                _this.processMessage(message);
            }
        });
    };
    /**
     * @param {?} message
     * @return {?}
     */
    MainContainer.prototype.processMessage = function (message) {
        var /** @type {?} */ navClass = ClrResponsiveNavCodes.NAV_CLASS_HAMBURGER_MENU;
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
    };
    /**
     * @param {?} controlCode
     * @param {?} navClass
     * @return {?}
     */
    MainContainer.prototype.controlNav = function (controlCode, navClass) {
        if (controlCode === ClrResponsiveNavCodes.NAV_OPEN) {
            this._classList.add(navClass);
        }
        else if (controlCode === ClrResponsiveNavCodes.NAV_CLOSE) {
            this._classList.remove(navClass);
        }
        else if (controlCode === ClrResponsiveNavCodes.NAV_TOGGLE) {
            this._classList.toggle(navClass);
        }
    };
    /**
     * @return {?}
     */
    MainContainer.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return MainContainer;
}());
MainContainer.decorators = [
    { type: core.Directive, args: [{ selector: "clr-main-container", host: { "[class.main-container]": "true" } },] },
];
/**
 * @nocollapse
 */
MainContainer.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: ClrResponsiveNavigationService, },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var LAYOUT_DIRECTIVES = [MainContainer];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrMainContainerModule = (function () {
    function ClrMainContainerModule() {
    }
    return ClrMainContainerModule;
}());
ClrMainContainerModule.decorators = [
    { type: core.NgModule, args: [{ imports: [common.CommonModule, ClrIconModule], declarations: [LAYOUT_DIRECTIVES], exports: [LAYOUT_DIRECTIVES] },] },
];
/**
 * @nocollapse
 */
ClrMainContainerModule.ctorParameters = function () { return []; };
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
var MainContainerWillyWonka = (function (_super) {
    __extends(MainContainerWillyWonka, _super);
    function MainContainerWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MainContainerWillyWonka;
}(WillyWonka));
MainContainerWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: "clr-main-container" },] },
];
/**
 * @nocollapse
 */
MainContainerWillyWonka.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NavDetectionOompaLoompa = (function (_super) {
    __extends(NavDetectionOompaLoompa, _super);
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} responsiveNavService
     */
    function NavDetectionOompaLoompa(cdr, willyWonka, responsiveNavService) {
        var _this = this;
        if (!willyWonka) {
            throw new Error("clr-header should only be used inside of a clr-main-container");
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.responsiveNavService = responsiveNavService;
        return _this;
    }
    Object.defineProperty(NavDetectionOompaLoompa.prototype, "flavor", {
        /**
         * @return {?}
         */
        get: function () {
            return this.responsiveNavService.responsiveNavList.reduce(function (sum, navLevel) { return sum + navLevel; }, 0);
        },
        enumerable: true,
        configurable: true
    });
    return NavDetectionOompaLoompa;
}(OompaLoompa));
NavDetectionOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: "clr-header" },] },
];
/**
 * @nocollapse
 */
NavDetectionOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: MainContainerWillyWonka, decorators: [{ type: core.Optional },] },
    { type: ClrResponsiveNavigationService, },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Header = (function () {
    /**
     * @param {?} responsiveNavService
     */
    function Header(responsiveNavService) {
        var _this = this;
        this.responsiveNavService = responsiveNavService;
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
        this._subscription = this.responsiveNavService.registeredNavs.subscribe({
            next: function (navLevelList) {
                _this.initializeNavTriggers(navLevelList);
            }
        });
    }
    Object.defineProperty(Header.prototype, "responsiveNavCodes", {
        /**
         * @return {?}
         */
        get: function () {
            return ClrResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Header.prototype.resetNavTriggers = function () {
        this.isNavLevel1OnPage = false;
        this.isNavLevel2OnPage = false;
    };
    /**
     * @param {?} navList
     * @return {?}
     */
    Header.prototype.initializeNavTriggers = function (navList) {
        var _this = this;
        this.resetNavTriggers();
        if (navList.length > 2) {
            console.error("More than 2 Nav Levels detected.");
            return;
        }
        navList.forEach(function (navLevel) {
            if (navLevel === ClrResponsiveNavCodes.NAV_LEVEL_1) {
                _this.isNavLevel1OnPage = true;
            }
            else if (navLevel === ClrResponsiveNavCodes.NAV_LEVEL_2) {
                _this.isNavLevel2OnPage = true;
            }
        });
    };
    /**
     * @return {?}
     */
    Header.prototype.closeOpenNav = function () {
        this.responsiveNavService.closeAllNavs();
    };
    /**
     * @param {?} navLevel
     * @return {?}
     */
    Header.prototype.toggleNav = function (navLevel) {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_TOGGLE, navLevel);
    };
    /**
     * @return {?}
     */
    Header.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return Header;
}());
Header.decorators = [
    { type: core.Component, args: [{
                selector: "clr-header",
                template: "\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel1OnPage\"\n            class=\"header-hamburger-trigger\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_1)\">\n            <span></span>\n        </button>\n        <ng-content></ng-content>\n        <button\n            type=\"button\"\n            *ngIf=\"isNavLevel2OnPage\"\n            class=\"header-overflow-trigger\"\n            (click)=\"toggleNav(responsiveNavCodes.NAV_LEVEL_2)\">\n            <span></span>\n        </button>\n        <div class=\"header-backdrop\" (click)=\"closeOpenNav()\"></div>\n    ",
                host: { "[class.header]": "true" }
            },] },
];
/**
 * @nocollapse
 */
Header.ctorParameters = function () { return [
    { type: ClrResponsiveNavigationService, },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NavLevelDirective = (function () {
    /**
     * @param {?} responsiveNavService
     * @param {?} elementRef
     */
    function NavLevelDirective(responsiveNavService, elementRef) {
        this.responsiveNavService = responsiveNavService;
        this.elementRef = elementRef;
    }
    /**
     * @return {?}
     */
    NavLevelDirective.prototype.ngOnInit = function () {
        if (this.level !== ClrResponsiveNavCodes.NAV_LEVEL_1 && this.level !== ClrResponsiveNavCodes.NAV_LEVEL_2) {
            console.error("Nav Level can only be 1 or 2");
            return;
        }
        this.responsiveNavService.registerNav(this.level);
        this.addNavClass(this.level);
    };
    /**
     * @param {?} level
     * @return {?}
     */
    NavLevelDirective.prototype.addNavClass = function (level) {
        var /** @type {?} */ navHostClassList = this.elementRef.nativeElement.classList;
        if (level === ClrResponsiveNavCodes.NAV_LEVEL_1) {
            navHostClassList.add(ClrResponsiveNavCodes.NAV_CLASS_LEVEL_1);
        }
        else if (level === ClrResponsiveNavCodes.NAV_LEVEL_2) {
            navHostClassList.add(ClrResponsiveNavCodes.NAV_CLASS_LEVEL_2);
        }
    };
    Object.defineProperty(NavLevelDirective.prototype, "level", {
        /**
         * @return {?}
         */
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavLevelDirective.prototype, "responsiveNavCodes", {
        /**
         * @return {?}
         */
        get: function () {
            return ClrResponsiveNavCodes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NavLevelDirective.prototype.open = function () {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_OPEN, this.level);
    };
    /**
     * @return {?}
     */
    NavLevelDirective.prototype.close = function () {
        this.responsiveNavService.sendControlMessage(ClrResponsiveNavCodes.NAV_CLOSE, this.level);
    };
    /**
     * @param {?} target
     * @return {?}
     */
    NavLevelDirective.prototype.onMouseClick = function (target) {
        var /** @type {?} */ current = target; // Get the element in the DOM on which the mouse was clicked
        var /** @type {?} */ navHost = this.elementRef.nativeElement; // Get the current nav native HTML element
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
    };
    /**
     * @return {?}
     */
    NavLevelDirective.prototype.ngOnDestroy = function () {
        this.responsiveNavService.unregisterNav(this.level);
    };
    return NavLevelDirective;
}());
NavLevelDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clr-nav-level]" },] },
];
/**
 * @nocollapse
 */
NavLevelDirective.ctorParameters = function () { return [
    { type: ClrResponsiveNavigationService, },
    { type: core.ElementRef, },
]; };
NavLevelDirective.propDecorators = {
    '_level': [{ type: core.Input, args: ["clr-nav-level",] },],
    'onMouseClick': [{ type: core.HostListener, args: ["click", ["$event.target"],] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var NAVIGATION_DIRECTIVES = [Header, NavLevelDirective, NavDetectionOompaLoompa, MainContainerWillyWonka];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrNavigationModule = (function () {
    function ClrNavigationModule() {
    }
    return ClrNavigationModule;
}());
ClrNavigationModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrDropdownModule],
                declarations: [NAVIGATION_DIRECTIVES],
                providers: [{
                        provide: ClrResponsiveNavigationService,
                        useFactory: clrResponsiveNavigationProvider,
                        deps: [[new core.Optional(), new core.SkipSelf(), ClrResponsiveNavigationService]]
                    }],
                exports: [NAVIGATION_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrNavigationModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TemplateRefContainer = (function () {
    function TemplateRefContainer() {
    }
    return TemplateRefContainer;
}());
TemplateRefContainer.decorators = [
    { type: core.Component, args: [{
                template: "\n      <ng-template>\n        <ng-content></ng-content>\n      </ng-template>\n    ",
            },] },
];
/**
 * @nocollapse
 */
TemplateRefContainer.ctorParameters = function () { return []; };
TemplateRefContainer.propDecorators = {
    'template': [{ type: core.ViewChild, args: [core.TemplateRef,] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TEMPLATE_REF_DIRECTIVES = [TemplateRefContainer];
/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTemplateRefModule = (function () {
    function ClrTemplateRefModule() {
    }
    return ClrTemplateRefModule;
}());
ClrTemplateRefModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [TEMPLATE_REF_DIRECTIVES],
                entryComponents: [TEMPLATE_REF_DIRECTIVES],
                exports: [TEMPLATE_REF_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrTemplateRefModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TabsWillyWonka = (function (_super) {
    __extends(TabsWillyWonka, _super);
    function TabsWillyWonka() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TabsWillyWonka;
}(WillyWonka));
TabsWillyWonka.decorators = [
    { type: core.Directive, args: [{ selector: "clr-tabs" },] },
];
/**
 * @nocollapse
 */
TabsWillyWonka.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ActiveOompaLoompa = (function (_super) {
    __extends(ActiveOompaLoompa, _super);
    /**
     * @param {?} cdr
     * @param {?} willyWonka
     * @param {?} id
     * @param {?} ifActive
     */
    function ActiveOompaLoompa(cdr, willyWonka, id, ifActive) {
        var _this = this;
        if (!willyWonka) {
            throw new Error("clrTabLink and clr-tab-content should only be used inside of a clr-tabs");
        }
        _this = _super.call(this, cdr, willyWonka) || this;
        _this.ifActive = ifActive;
        _this.id = id;
        return _this;
    }
    Object.defineProperty(ActiveOompaLoompa.prototype, "flavor", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifActive.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return ActiveOompaLoompa;
}(OompaLoompa));
ActiveOompaLoompa.decorators = [
    { type: core.Directive, args: [{ selector: "[clrTabLink], clr-tab-content" },] },
];
/**
 * @nocollapse
 */
ActiveOompaLoompa.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: TabsWillyWonka, decorators: [{ type: core.Optional },] },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: IfActiveService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var AriaService = (function () {
    function AriaService() {
    }
    return AriaService;
}());
AriaService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
AriaService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbTabContentComponents = 0;
var TabContent = (function () {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     */
    function TabContent(ifActiveService, id, ariaService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.ariaService = ariaService;
        if (!this.tabContentId) {
            this.tabContentId = "clr-tab-content-" + (nbTabContentComponents++);
        }
    }
    Object.defineProperty(TabContent.prototype, "ariaLabelledBy", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabContent.prototype, "tabContentId", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ariaService.ariaControls;
        },
        /**
         * @param {?} id
         * @return {?}
         */
        set: function (id) {
            this.ariaService.ariaControls = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabContent.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return TabContent;
}());
TabContent.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tab-content",
                template: "\n        <ng-content></ng-content>\n    ",
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
TabContent.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
]; };
TabContent.propDecorators = {
    'templateRef': [{ type: core.ViewChild, args: ["tabContentProjectedRef",] },],
    'tabContentId': [{ type: core.Input, args: ["id",] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var nbTabLinkComponents = 0;
var TabLinkDirective = (function () {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} ariaService
     * @param {?} el
     * @param {?} cfr
     * @param {?} viewContainerRef
     */
    function TabLinkDirective(ifActiveService, id, ariaService, el, cfr, viewContainerRef) {
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
        var factory = this.cfr.resolveComponentFactory(TemplateRefContainer);
        this.templateRefContainer =
            this.viewContainerRef.createComponent(factory, 1, undefined, [[this.el.nativeElement]]).instance;
    }
    Object.defineProperty(TabLinkDirective.prototype, "ariaControls", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ariaService.ariaControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabLinkDirective.prototype, "tabLinkId", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ariaService.ariaLabelledBy;
        },
        /**
         * @param {?} id
         * @return {?}
         */
        set: function (id) {
            this.ariaService.ariaLabelledBy = id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TabLinkDirective.prototype.activate = function () {
        this.ifActiveService.current = this.id;
    };
    Object.defineProperty(TabLinkDirective.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return TabLinkDirective;
}());
TabLinkDirective.decorators = [
    { type: core.Directive, args: [{
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
TabLinkDirective.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: AriaService, },
    { type: core.ElementRef, },
    { type: core.ComponentFactoryResolver, },
    { type: core.ViewContainerRef, },
]; };
TabLinkDirective.propDecorators = {
    'inOverflow': [{ type: core.Input, args: ["clrTabLinkInOverflow",] },],
    'tabLinkId': [{ type: core.Input, args: ["id",] },],
    'activate': [{ type: core.HostListener, args: ["click",] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TabsService = (function () {
    function TabsService() {
        this._children = [];
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.register = function (tab) {
        this._children.push(tab);
    };
    Object.defineProperty(TabsService.prototype, "children", {
        /**
         * @return {?}
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "activeTab", {
        /**
         * @return {?}
         */
        get: function () {
            return this.children.find(function (tab) {
                return tab.active;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsService.prototype, "overflowTabs", {
        /**
         * @return {?}
         */
        get: function () {
            return this.children.filter(function (tab) {
                return tab.tabLink.inOverflow === true;
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tab
     * @return {?}
     */
    TabsService.prototype.unregister = function (tab) {
        var /** @type {?} */ index = this.children.indexOf(tab);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    return TabsService;
}());
TabsService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
TabsService.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Tab = (function () {
    /**
     * @param {?} ifActiveService
     * @param {?} id
     * @param {?} tabsService
     */
    function Tab(ifActiveService, id, tabsService) {
        this.ifActiveService = ifActiveService;
        this.id = id;
        this.tabsService = tabsService;
        tabsService.register(this);
    }
    /**
     * @return {?}
     */
    Tab.prototype.ngOnDestroy = function () {
        this.tabsService.unregister(this);
    };
    Object.defineProperty(Tab.prototype, "active", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ifActiveService.current === this.id;
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
}());
Tab.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tab",
                template: "\n        <ng-content></ng-content>\n    ",
                providers: [IF_ACTIVE_ID_PROVIDER, AriaService]
            },] },
];
/**
 * @nocollapse
 */
Tab.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: undefined, decorators: [{ type: core.Inject, args: [IF_ACTIVE_ID,] },] },
    { type: TabsService, },
]; };
Tab.propDecorators = {
    'tabLink': [{ type: core.ContentChild, args: [TabLinkDirective,] },],
    'tabContent': [{ type: core.ContentChild, args: [TabContent,] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TabOverflowContent = (function (_super) {
    __extends(TabOverflowContent, _super);
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    function TabOverflowContent(injector, parentHost) {
        var _this = _super.call(this, injector, parentHost) || this;
        _this.anchorPoint = Point.BOTTOM_RIGHT;
        _this.popoverPoint = Point.RIGHT_TOP;
        _this.closeOnOutsideClick = true;
        return _this;
    }
    return TabOverflowContent;
}(AbstractPopover));
TabOverflowContent.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tab-overflow-content",
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    "[class.dropdown-menu]": "true",
                }
            },] },
];
/**
 * @nocollapse
 */
TabOverflowContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.SkipSelf },] },
]; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Tabs = (function () {
    /**
     * @param {?} ifActiveService
     * @param {?} ifOpenService
     * @param {?} tabsService
     */
    function Tabs(ifActiveService, ifOpenService, tabsService) {
        this.ifActiveService = ifActiveService;
        this.ifOpenService = ifOpenService;
        this.tabsService = tabsService;
    }
    Object.defineProperty(Tabs.prototype, "activeTabInOverflow", {
        /**
         * @return {?}
         */
        get: function () {
            return this.tabsService.overflowTabs.indexOf(this.tabsService.activeTab) > -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Tabs.prototype.ngAfterContentInit = function () {
        if (typeof this.ifActiveService.current === "undefined") {
            this.tabLinkDirectives.first.activate();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Tabs.prototype.toggleOverflow = function (event) {
        this.ifOpenService.toggleWithEvent(event);
    };
    return Tabs;
}());
Tabs.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tabs",
                template: "        \n        <ul class=\"nav\" role=\"tablist\">\n            <!--tab links-->\n            <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                <ng-container *ngIf=\"!link.inOverflow\"\n                              [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"tabsService.overflowTabs.length > 0\">\n                <div class=\"tabs-overflow bottom-right\" [class.open]=\"ifOpenService.open\" \n                     (click)=\"toggleOverflow($event)\">\n                    <li role=\"presentation\" class=\"nav-item\">\n                        <button class=\"btn btn-link nav-link dropdown-toggle\" [class.active]=\"activeTabInOverflow\">\n                            <clr-icon shape=\"ellipsis-horizontal\" [class.is-info]=\"ifOpenService.open\"></clr-icon>\n                        </button>\n                    </li>\n                    <!--tab links in overflow menu-->\n                    <clr-tab-overflow-content>\n                        <ng-container *ngFor=\"let link of tabLinkDirectives\">\n                            <ng-container *ngIf=\"link.inOverflow\"\n                                          [ngTemplateOutlet]=\"link.templateRefContainer.template\">\n                            </ng-container>\n                        </ng-container>\n                    </clr-tab-overflow-content>\n                </div>\n            </ng-container>\n        </ul>\n        <!--tab content-->\n        <ng-content></ng-content>\n    ",
                providers: [IfActiveService, IfOpenService, TabsService]
            },] },
];
/**
 * @nocollapse
 */
Tabs.ctorParameters = function () { return [
    { type: IfActiveService, },
    { type: IfOpenService, },
    { type: TabsService, },
]; };
Tabs.propDecorators = {
    'tabLinkDirectives': [{ type: core.ContentChildren, args: [TabLinkDirective, { descendants: true },] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TABS_DIRECTIVES = [TabContent, Tab, Tabs, TabOverflowContent, TabLinkDirective, TabsWillyWonka, ActiveOompaLoompa];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTabsModule = (function () {
    function ClrTabsModule() {
    }
    return ClrTabsModule;
}());
ClrTabsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule, ClrConditionalModule, ClrIconModule, ClrTemplateRefModule],
                declarations: [TABS_DIRECTIVES],
                exports: [TABS_DIRECTIVES, ClrConditionalModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTabsModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavGroupRegistrationService = (function () {
    function VerticalNavGroupRegistrationService() {
        this.navGroupCount = 0;
    }
    /**
     * @return {?}
     */
    VerticalNavGroupRegistrationService.prototype.registerNavGroup = function () {
        this.navGroupCount++;
    };
    /**
     * @return {?}
     */
    VerticalNavGroupRegistrationService.prototype.unregisterNavGroup = function () {
        this.navGroupCount--;
    };
    return VerticalNavGroupRegistrationService;
}());
VerticalNavGroupRegistrationService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
VerticalNavGroupRegistrationService.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavIconService = (function () {
    function VerticalNavIconService() {
        this._icons = 0;
    }
    Object.defineProperty(VerticalNavIconService.prototype, "hasIcons", {
        /**
         * @return {?}
         */
        get: function () {
            return this._icons > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavIconService.prototype.registerIcon = function () {
        this._icons++;
    };
    /**
     * @return {?}
     */
    VerticalNavIconService.prototype.unregisterIcon = function () {
        this._icons--;
    };
    return VerticalNavIconService;
}());
VerticalNavIconService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
VerticalNavIconService.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavService = (function () {
    function VerticalNavService() {
        this._animateOnCollapsed = new Subject.Subject();
        this._collapsedChanged = new Subject.Subject();
        this._collapsed = false;
        this._collapsible = false;
    }
    Object.defineProperty(VerticalNavService.prototype, "animateOnCollapsed", {
        /**
         * @return {?}
         */
        get: function () {
            return this._animateOnCollapsed.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsedChanged", {
        /**
         * @return {?}
         */
        get: function () {
            return this._collapsedChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsed", {
        /**
         * @return {?}
         */
        get: function () {
            return this._collapsed;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this.collapsible && (this._collapsed !== value)) {
                this.updateCollapseBehavior(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavService.prototype, "collapsible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._collapsible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this._collapsible !== value) {
                if (!value && this.collapsed) {
                    this.updateCollapseBehavior(false);
                }
                this._collapsible = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    VerticalNavService.prototype.updateCollapseBehavior = function (value) {
        this._animateOnCollapsed.next(value);
        this._collapsed = value;
        this._collapsedChanged.next(value);
    };
    return VerticalNavService;
}());
VerticalNavService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
VerticalNavService.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNav = (function () {
    /**
     * @param {?} _navService
     * @param {?} _navIconService
     * @param {?} _navGroupRegistrationService
     */
    function VerticalNav(_navService, _navIconService, _navGroupRegistrationService) {
        var _this = this;
        this._navService = _navService;
        this._navIconService = _navIconService;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._collapsedChanged = new core.EventEmitter(true);
        this._sub = this._navService.collapsedChanged.subscribe(function (value) {
            _this._collapsedChanged.emit(value);
        });
    }
    Object.defineProperty(VerticalNav.prototype, "collapsible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._navService.collapsible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._navService.collapsible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNav.prototype, "collapsed", {
        /**
         * @return {?}
         */
        get: function () {
            return this._navService.collapsed;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._navService.collapsed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNav.prototype, "hasNavGroups", {
        /**
         * @return {?}
         */
        get: function () {
            return this._navGroupRegistrationService.navGroupCount > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNav.prototype, "hasIcons", {
        /**
         * @return {?}
         */
        get: function () {
            return this._navIconService.hasIcons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNav.prototype.toggleByButton = function () {
        this.collapsed = !this.collapsed;
    };
    /**
     * @return {?}
     */
    VerticalNav.prototype.ngOnDestroy = function () {
        this._sub.unsubscribe();
    };
    return VerticalNav;
}());
VerticalNav.decorators = [
    { type: core.Component, args: [{
                selector: "clr-vertical-nav",
                template: "\n      <button type=\"button\" class=\"nav-trigger\"\n              [class.on-collapse]=\"collapsed\"\n              (click)=\"toggleByButton()\"\n              *ngIf=\"collapsible\">\n          <clr-icon shape=\"angle-double\" class=\"nav-trigger-icon\" [attr.dir]=\"(this.collapsed) ? 'right' : 'left'\"></clr-icon>\n      </button>\n      <!-- Click handler on .nav-content is bad but required :-( -->\n      <div class=\"nav-content\">\n          <ng-content></ng-content>\n          <button (click)=\"collapsed = false\" class=\"nav-btn\" *ngIf=\"collapsible && collapsed\"></button>\n      </div>\n    ",
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
VerticalNav.ctorParameters = function () { return [
    { type: VerticalNavService, },
    { type: VerticalNavIconService, },
    { type: VerticalNavGroupRegistrationService, },
]; };
VerticalNav.propDecorators = {
    'collapsible': [{ type: core.Input, args: ["clrVerticalNavCollapsible",] },],
    'collapsed': [{ type: core.Input, args: ["clrVerticalNavCollapsed",] },],
    '_collapsedChanged': [{ type: core.Output, args: ["clrVerticalNavCollapsedChange",] },],
};
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavGroupService = (function () {
    function VerticalNavGroupService() {
        this._expandChange = new Subject.Subject();
    }
    Object.defineProperty(VerticalNavGroupService.prototype, "expandChange", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expandChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavGroupService.prototype.expand = function () {
        this._expandChange.next(true);
    };
    return VerticalNavGroupService;
}());
VerticalNavGroupService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
VerticalNavGroupService.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var EXPANDED_STATE = "expanded";
var COLLAPSED_STATE = "collapsed";
var VerticalNavGroup = (function () {
    /**
     * @param {?} _itemExpand
     * @param {?} _navGroupRegistrationService
     * @param {?} _navGroupService
     * @param {?} _navService
     */
    function VerticalNavGroup(_itemExpand, _navGroupRegistrationService, _navGroupService, _navService) {
        var _this = this;
        this._itemExpand = _itemExpand;
        this._navGroupRegistrationService = _navGroupRegistrationService;
        this._navGroupService = _navGroupService;
        this._navService = _navService;
        this.wasExpanded = false;
        this.expandedChange = new core.EventEmitter(true);
        this._subscriptions = [];
        this._expandAnimationState = COLLAPSED_STATE;
        this._navGroupRegistrationService.registerNavGroup();
        // FIXME: This subscription handles a corner case
        // Vertical Nav collapse requires the animation to run first and then
        // remove the nodes from the DOM. If the user directly sets the input
        // on the clrIfExpanded directive, we have no chance to run the animation
        // and wait for it to complete. This subscription makes sure that the
        // animation states are correct for that edge case.
        this._subscriptions.push(this._itemExpand.expandChange.subscribe(function (value) {
            if (value && _this.expandAnimationState === COLLAPSED_STATE) {
                if (_this._navService.collapsed) {
                    _this._navService.collapsed = false;
                }
                _this.expandAnimationState = EXPANDED_STATE;
            }
            else if (!value && _this.expandAnimationState === EXPANDED_STATE) {
                _this.expandAnimationState = COLLAPSED_STATE;
            }
        }));
        // 1. If the nav is collapsing, close the open nav group + save its state
        // 2. If the nav is expanding, expand the nav group if the previous state was expanded
        this._subscriptions.push(this._navService.animateOnCollapsed.subscribe(function (goingToCollapse) {
            if (goingToCollapse && _this.expanded) {
                _this.wasExpanded = true;
                _this.expandAnimationState = COLLAPSED_STATE;
            }
            else if (!goingToCollapse && _this.wasExpanded) {
                _this.expandGroup();
                _this.wasExpanded = false;
            }
        }));
        // If a link is clicked, expand the nav group
        this._subscriptions.push(this._navGroupService.expandChange.subscribe(function (expand) {
            if (expand && !_this.expanded) {
                _this.expandGroup();
            }
        }));
    }
    Object.defineProperty(VerticalNavGroup.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this._itemExpand.expanded;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this._itemExpand.expanded !== value) {
                this._itemExpand.expanded = value;
                this.expandedChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerticalNavGroup.prototype, "userExpandedInput", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            value = !!value;
            if (this.expanded !== value) {
                // We have to call toggleExpand because some cases require animations to occur first
                // Directly setting the Expand service value skips the animation and can result in
                // nodes in the DOM but the nav group still being collapsed
                this.toggleExpand();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavGroup.prototype.expandGroup = function () {
        this.expanded = true;
        // Expanded animation occurs after Expand.expand is set to true
        this.expandAnimationState = EXPANDED_STATE;
    };
    /**
     * @return {?}
     */
    VerticalNavGroup.prototype.collapseGroup = function () {
        // If a Vertical Nav Group toggle button is clicked while the Vertical Nav is in Collapsed state,
        // the Vertical Nav should be expanded first.
        this.expandAnimationState = COLLAPSED_STATE;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    VerticalNavGroup.prototype.expandAnimationDone = function ($event) {
        if ($event.toState === COLLAPSED_STATE) {
            this.expanded = false;
        }
    };
    Object.defineProperty(VerticalNavGroup.prototype, "expandAnimationState", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expandAnimationState;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value !== this._expandAnimationState) {
                this._expandAnimationState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VerticalNavGroup.prototype.toggleExpand = function () {
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
    };
    /**
     * @return {?}
     */
    VerticalNavGroup.prototype.ngAfterContentInit = function () {
        // This makes sure that if someone marks a nav group expanded in a collapsed nav
        // the expanded property is switched back to collapsed state.
        if (this._navService.collapsed && this.expanded) {
            this.wasExpanded = true;
            this.expandAnimationState = COLLAPSED_STATE;
        }
    };
    /**
     * @return {?}
     */
    VerticalNavGroup.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._navGroupRegistrationService.unregisterNavGroup();
    };
    return VerticalNavGroup;
}());
VerticalNavGroup.decorators = [
    { type: core.Component, args: [{
                selector: "clr-vertical-nav-group",
                template: "\n      <div class=\"nav-group-content\">\n          <ng-content select=\"[clrVerticalNavLink]\"></ng-content>\n          <button\n              class=\"nav-group-trigger\"\n              type=\"button\"\n              (click)=\"toggleExpand()\">\n              <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n              <div class=\"nav-group-text\">\n                  <ng-content></ng-content>\n              </div>\n              <clr-icon shape=\"caret\"\n                        class=\"nav-group-trigger-icon\"\n                        [attr.dir]=\"(this.expanded) ? 'down' : 'right'\">\n              </clr-icon>\n          </button>\n      </div>\n      <!--TODO: This animation needs to be added to the clr-vertical-nav-group-children component-->\n      <div class=\"nav-group-children\"\n           [@clrExpand]=\"expandAnimationState\"\n           (@clrExpand.done)=\"expandAnimationDone($event)\">\n          <ng-content select=\"[clrIfExpanded], clr-vertical-nav-group-children\"></ng-content>\n      </div>\n    ",
                providers: [Expand, VerticalNavGroupService],
                animations: [animations.trigger("clrExpand", [
                        animations.state(EXPANDED_STATE, animations.style({ "height": "*" })),
                        animations.state(COLLAPSED_STATE, animations.style({ "height": 0, "overflow-y": "hidden", "visibility": "hidden" })),
                        animations.transition(EXPANDED_STATE + " <=> " + COLLAPSED_STATE, animations.animate("0.2s ease-in-out"))
                    ])],
                host: { "class": "nav-group" }
            },] },
];
/**
 * @nocollapse
 */
VerticalNavGroup.ctorParameters = function () { return [
    { type: Expand, },
    { type: VerticalNavGroupRegistrationService, },
    { type: VerticalNavGroupService, },
    { type: VerticalNavService, },
]; };
VerticalNavGroup.propDecorators = {
    'expanded': [{ type: core.HostBinding, args: ["class.is-expanded",] },],
    'userExpandedInput': [{ type: core.Input, args: ["clrVerticalNavGroupExpanded",] },],
    'expandedChange': [{ type: core.Output, args: ["clrVerticalNavGroupExpandedChange",] },],
};
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavGroupChildren = (function () {
    function VerticalNavGroupChildren() {
    }
    return VerticalNavGroupChildren;
}());
VerticalNavGroupChildren.decorators = [
    { type: core.Component, args: [{
                selector: "clr-vertical-nav-group-children",
                template: "\n        <ng-content></ng-content>\n    "
            },] },
];
/**
 * @nocollapse
 */
VerticalNavGroupChildren.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavIcon = (function () {
    /**
     * @param {?} _verticalNavIconService
     */
    function VerticalNavIcon(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    /**
     * @return {?}
     */
    VerticalNavIcon.prototype.ngOnDestroy = function () {
        this._verticalNavIconService.unregisterIcon();
    };
    return VerticalNavIcon;
}());
VerticalNavIcon.decorators = [
    { type: core.Directive, args: [{ selector: "[clrVerticalNavIcon]", host: { "class": "nav-icon" } },] },
];
/**
 * @nocollapse
 */
VerticalNavIcon.ctorParameters = function () { return [
    { type: VerticalNavIconService, },
]; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VerticalNavLink = (function () {
    /**
     * @param {?} _navGroupService
     */
    function VerticalNavLink(_navGroupService) {
        this._navGroupService = _navGroupService;
    }
    /**
     * @return {?}
     */
    VerticalNavLink.prototype.expandParentNavGroup = function () {
        if (this._navGroupService) {
            this._navGroupService.expand();
        }
    };
    return VerticalNavLink;
}());
VerticalNavLink.decorators = [
    { type: core.Component, args: [{
                selector: "[clrVerticalNavLink]",
                template: "\n        <ng-content select=\"[clrVerticalNavIcon]\"></ng-content>\n        <span class=\"nav-text\">\n            <ng-content></ng-content>    \n        </span>\n    ",
                host: { "class": "nav-link" }
            },] },
];
/**
 * @nocollapse
 */
VerticalNavLink.ctorParameters = function () { return [
    { type: VerticalNavGroupService, decorators: [{ type: core.Optional },] },
]; };
VerticalNavLink.propDecorators = {
    'expandParentNavGroup': [{ type: core.HostListener, args: ["click",] },],
};
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var VERTICAL_NAV_DIRECTIVES = [VerticalNav, VerticalNavLink, VerticalNavGroup, VerticalNavGroupChildren, VerticalNavIcon];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrVerticalNavModule = (function () {
    function ClrVerticalNavModule() {
    }
    return ClrVerticalNavModule;
}());
ClrVerticalNavModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrIfExpandModule],
                declarations: [VERTICAL_NAV_DIRECTIVES],
                exports: [VERTICAL_NAV_DIRECTIVES, ClrIfExpandModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrVerticalNavModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrLayoutModule = (function () {
    function ClrLayoutModule() {
    }
    return ClrLayoutModule;
}());
ClrLayoutModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule] },] },
];
/**
 * @nocollapse
 */
ClrLayoutModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FocusTrapTracker = (function () {
    function FocusTrapTracker() {
        this._previousFocusTraps = [];
    }
    Object.defineProperty(FocusTrapTracker.prototype, "current", {
        /**
         * @return {?}
         */
        get: function () {
            return this._current;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._previousFocusTraps.push(this._current);
            this._current = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FocusTrapTracker.prototype.activatePreviousTrapper = function () {
        this._current = this._previousFocusTraps.pop();
    };
    return FocusTrapTracker;
}());
FocusTrapTracker.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
FocusTrapTracker.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FocusTrapDirective = (function () {
    /**
     * @param {?} elementRef
     * @param {?} injector
     * @param {?} focusTrapsTracker
     * @param {?} platformId
     */
    function FocusTrapDirective(elementRef, injector, focusTrapsTracker, platformId) {
        this.elementRef = elementRef;
        this.focusTrapsTracker = focusTrapsTracker;
        this.platformId = platformId;
        this.document = injector.get(common.DOCUMENT);
        this.focusTrapsTracker.current = this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    FocusTrapDirective.prototype.onFocusIn = function (event) {
        var /** @type {?} */ nativeElement = this.elementRef.nativeElement;
        if (this.focusTrapsTracker.current === this && !nativeElement.contains(event.target)) {
            nativeElement.focus();
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngAfterViewInit = function () {
        if (common.isPlatformBrowser(this.platformId)) {
            this._previousActiveElement = (document.activeElement);
            var /** @type {?} */ nativeElement = this.elementRef.nativeElement;
            nativeElement.setAttribute("tabindex", "0");
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.setPreviousFocus = function () {
        if (this._previousActiveElement && this._previousActiveElement.focus) {
            this._previousActiveElement.focus();
        }
    };
    /**
     * @return {?}
     */
    FocusTrapDirective.prototype.ngOnDestroy = function () {
        this.setPreviousFocus();
        this.focusTrapsTracker.activatePreviousTrapper();
    };
    return FocusTrapDirective;
}());
FocusTrapDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrFocusTrap]" },] },
];
/**
 * @nocollapse
 */
FocusTrapDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Injector, },
    { type: FocusTrapTracker, },
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
FocusTrapDirective.propDecorators = {
    'onFocusIn': [{ type: core.HostListener, args: ["document:focusin", ["$event"],] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var FOCUS_TRAP_DIRECTIVES = [FocusTrapDirective];
/**
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrFocusTrapModule = (function () {
    function ClrFocusTrapModule() {
    }
    return ClrFocusTrapModule;
}());
ClrFocusTrapModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                providers: [FocusTrapTracker],
                declarations: [FOCUS_TRAP_DIRECTIVES],
                exports: [FOCUS_TRAP_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrFocusTrapModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ScrollingService = (function () {
    /**
     * @param {?} _document
     */
    function ScrollingService(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    ScrollingService.prototype.stopScrolling = function () {
        this._document.body.classList.add("no-scrolling");
    };
    /**
     * @return {?}
     */
    ScrollingService.prototype.resumeScrolling = function () {
        if (this._document.body.classList.contains("no-scrolling")) {
            this._document.body.classList.remove("no-scrolling");
        }
    };
    return ScrollingService;
}());
ScrollingService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ScrollingService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [platformBrowser.DOCUMENT,] },] },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var GHOST_PAGE_ANIMATION = {
    STATES: { NO_PAGES: "inactive", ALL_PAGES: "ready", NEXT_TO_LAST_PAGE: "penultimateGhost", LAST_PAGE: "lastGhost" },
    TRANSITIONS: { IN: "100ms ease-out", OUT: "100ms ease-in" }
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Modal = (function () {
    /**
     * @param {?} _scrollingService
     */
    function Modal(_scrollingService) {
        this._scrollingService = _scrollingService;
        this._open = false;
        this._openChanged = new core.EventEmitter(false);
        this.closable = true;
        this.staticBackdrop = false;
        this.skipAnimation = "false";
        // presently this is only used by wizards
        this.ghostPageState = "hidden";
        this.bypassScrollService = false;
        this.stopClose = false;
        this.altClose = new core.EventEmitter(false);
    }
    Object.defineProperty(Modal.prototype, "sizeClass", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.size) {
                return "modal-" + this.size;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    Modal.prototype.ngOnChanges = function (changes) {
        if (!this.bypassScrollService && changes && changes.hasOwnProperty("_open")) {
            if (changes._open.currentValue) {
                this._scrollingService.stopScrolling();
            }
            else {
                this._scrollingService.resumeScrolling();
            }
        }
    };
    /**
     * @return {?}
     */
    Modal.prototype.ngOnDestroy = function () {
        this._scrollingService.resumeScrolling();
    };
    /**
     * @return {?}
     */
    Modal.prototype.open = function () {
        if (this._open === true) {
            return;
        }
        this._open = true;
        this._openChanged.emit(true);
    };
    /**
     * @return {?}
     */
    Modal.prototype.close = function () {
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
    };
    /**
     * @param {?} e
     * @return {?}
     */
    Modal.prototype.fadeDone = function (e) {
        if (e.toState === "void") {
            this._openChanged.emit(false);
        }
    };
    return Modal;
}());
Modal.decorators = [
    { type: core.Component, args: [{
                selector: "clr-modal",
                viewProviders: [ScrollingService],
                template: "\n\n      <!--\n        ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.\n        ~ This software is released under MIT license.\n        ~ The full license information can be found in LICENSE in the root directory of this project.\n        -->\n\n      <div clrFocusTrap class=\"modal\" *ngIf=\"_open\">\n          <!--fixme: revisit when ngClass works with exit animation-->\n          <div [@fadeDown]=\"skipAnimation\" (@fadeDown.done)=\"fadeDone($event)\"\n               class=\"modal-dialog\"\n               [class.modal-sm]=\"size == 'sm'\"\n               [class.modal-lg]=\"size == 'lg'\"\n               [class.modal-xl]=\"size == 'xl'\"\n               role=\"dialog\" aria-hidden=\"true\">\n\n              <div class=\"modal-outer-wrapper\">\n                  <div class=\"modal-content-wrapper\">\n                      <!-- only used in wizards -->\n                      <ng-content select=\".modal-nav\"></ng-content>\n\n                      <div class=\"modal-content\">\n                          <div class=\"modal-header\">\n                              <button type=\"button\" class=\"close\" aria-label=\"Close\"\n                                      *ngIf=\"closable\" (click)=\"close()\">\n                                  <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                              </button>\n                              <ng-content select=\".modal-title\"></ng-content>\n                          </div>\n                          <ng-content select=\".modal-body\"></ng-content>\n                          <ng-content select=\".modal-footer\"></ng-content>\n                      </div>\n                  </div>\n                  <div class=\"modal-ghost-wrapper\">\n                      <div [@ghostPageOneState]=\"ghostPageState\" class=\"modal-ghost modal-ghost-1\"></div>\n                      <div [@ghostPageTwoState]=\"ghostPageState\" class=\"modal-ghost modal-ghost-2\"></div>\n                  </div>\n              </div>\n          </div>\n\n          <div [@fade] class=\"modal-backdrop\"\n               aria-hidden=\"true\"\n               (click)=\"staticBackdrop || close()\"></div>\n      </div>\n    ",
                styles: ["\n        :host { display: inline-block; }\n    "],
                animations: [
                    animations.trigger("fadeDown", [
                        animations.transition("* => false", [animations.style({ opacity: 0, transform: "translate(0, -25%)" }), animations.animate("0.2s ease-in-out")]),
                        animations.transition("false => *", [animations.animate("0.2s ease-in-out", animations.style({ opacity: 0, transform: "translate(0, -25%)" }))])
                    ]),
                    animations.trigger("fade", [
                        animations.transition("void => *", [animations.style({ opacity: 0 }), animations.animate("0.2s ease-in-out", animations.style({ opacity: 0.85 }))]),
                        animations.transition("* => void", [animations.animate("0.2s ease-in-out", animations.style({ opacity: 0 }))])
                    ]),
                    animations.trigger("ghostPageOneState", [
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, animations.style({ left: "-24px" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, animations.style({ left: "0" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, animations.style({ left: "-24px" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, animations.style({ left: "-24px" })),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT))
                    ]),
                    // TODO: USE TRANSFORM, NOT LEFT...
                    animations.trigger("ghostPageTwoState", [
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NO_PAGES, animations.style({ left: "-24px", top: "24px", bottom: "24px" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES, animations.style({ left: "24px" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE, animations.style({ left: "0px", top: "24px", bottom: "24px", background: "#bbb" })),
                        animations.state(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE, animations.style({ left: "-24px", top: "24px", bottom: "24px" })),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NO_PAGES + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.ALL_PAGES + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.LAST_PAGE + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.IN)),
                        animations.transition(GHOST_PAGE_ANIMATION.STATES.NEXT_TO_LAST_PAGE + " => *", animations.animate(GHOST_PAGE_ANIMATION.TRANSITIONS.OUT))
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
Modal.ctorParameters = function () { return [
    { type: ScrollingService, },
]; };
Modal.propDecorators = {
    'focusTrap': [{ type: core.ViewChild, args: [FocusTrapDirective,] },],
    '_open': [{ type: core.Input, args: ["clrModalOpen",] },],
    '_openChanged': [{ type: core.Output, args: ["clrModalOpenChange",] },],
    'closable': [{ type: core.Input, args: ["clrModalClosable",] },],
    'size': [{ type: core.Input, args: ["clrModalSize",] },],
    'staticBackdrop': [{ type: core.Input, args: ["clrModalStaticBackdrop",] },],
    'skipAnimation': [{ type: core.Input, args: ["clrModalSkipAnimation",] },],
    'ghostPageState': [{ type: core.Input, args: ["clrModalGhostPageState",] },],
    'bypassScrollService': [{ type: core.Input, args: ["clrModalOverrideScrollService",] },],
    'stopClose': [{ type: core.Input, args: ["clrModalPreventClose",] },],
    'altClose': [{ type: core.Output, args: ["clrModalAlternateClose",] },],
    'close': [{ type: core.HostListener, args: ["body:keyup.escape",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var MODAL_DIRECTIVES = [Modal];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrModalModule = (function () {
    function ClrModalModule() {
    }
    return ClrModalModule;
}());
ClrModalModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrIconModule, ClrFocusTrapModule],
                declarations: [MODAL_DIRECTIVES],
                exports: [MODAL_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrModalModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var SIGNPOST_POSITIONS = {
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
var POSITIONS = [
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
var SignpostContent = (function (_super) {
    __extends(SignpostContent, _super);
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    function SignpostContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error("clr-signpost-content should only be used inside of a clr-signpost");
        }
        _this = _super.call(this, injector, parentHost) || this;
        // Defaults
        _this.position = "right-middle";
        _this.closeOnOutsideClick = true;
        return _this;
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
    SignpostContent.prototype.close = function () {
        this.ifOpenService.open = false;
    };
    Object.defineProperty(SignpostContent.prototype, "position", {
        /**
         * @return {?}
         */
        get: function () {
            return this._position;
        },
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
        set: function (position) {
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
            var /** @type {?} */ setPosition = SIGNPOST_POSITIONS[this.position];
            this.anchorPoint = setPosition.anchorPoint;
            this.popoverPoint = setPosition.popoverPoint;
            this.popoverOptions.offsetY = setPosition.offsetY;
            this.popoverOptions.offsetX = setPosition.offsetX;
        },
        enumerable: true,
        configurable: true
    });
    return SignpostContent;
}(AbstractPopover));
SignpostContent.decorators = [
    { type: core.Component, args: [{
                selector: "clr-signpost-content",
                template: "\n        <div class=\"signpost-flex-wrap\">\n            <div class=\"popover-pointer\"></div>\n            <div class=\"signpost-content-header\">\n                <button type=\"button\" class=\"signpost-action close\" aria-label=\"Close\" (click)=\"close()\">\n                    <clr-icon aria-hidden=\"true\" shape=\"close\"></clr-icon>\n                </button>\n            </div>\n            <div class=\"signpost-content-body\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
                host: { "[class.signpost-content]": "true" }
            },] },
];
/**
 * @nocollapse
 */
SignpostContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
]; };
SignpostContent.propDecorators = {
    'position': [{ type: core.Input, args: ["clrPosition",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var SIGNPOST_DIRECTIVES = [Signpost, SignpostContent, SignpostTriggerDirective];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrSignpostModule = (function () {
    function ClrSignpostModule() {
    }
    return ClrSignpostModule;
}());
ClrSignpostModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule, ClrIconModule],
                declarations: [SIGNPOST_DIRECTIVES],
                exports: [SIGNPOST_DIRECTIVES, ClrConditionalModule],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
ClrSignpostModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var Tooltip = (function () {
    function Tooltip() {
    }
    return Tooltip;
}());
Tooltip.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tooltip",
                template: "\n        <ng-content></ng-content>\n    ",
                host: {
                    "[class.tooltip]": "true",
                },
                providers: [IfOpenService, { provide: POPOVER_HOST_ANCHOR, useExisting: core.ElementRef }]
            },] },
];
/**
 * @nocollapse
 */
Tooltip.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var POSITIONS$1 = ["bottom-left", "bottom-right", "top-left", "top-right", "right", "left"];
var SIZES = ["xs", "sm", "md", "lg"];
var TooltipContent = (function (_super) {
    __extends(TooltipContent, _super);
    /**
     * @param {?} injector
     * @param {?} parentHost
     */
    function TooltipContent(injector, parentHost) {
        var _this = this;
        if (!parentHost) {
            throw new Error("clr-tooltip-content should only be used inside of a clr-tooltip");
        }
        _this = _super.call(this, injector, parentHost) || this;
        // Defaults
        _this.position = "right";
        _this.size = "sm";
        return _this;
    }
    Object.defineProperty(TooltipContent.prototype, "position", {
        /**
         * @return {?}
         */
        get: function () {
            return this._position;
        },
        /**
         * @param {?} position
         * @return {?}
         */
        set: function (position) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipContent.prototype, "size", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size;
        },
        /**
         * @param {?} size
         * @return {?}
         */
        set: function (size) {
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
        },
        enumerable: true,
        configurable: true
    });
    return TooltipContent;
}(AbstractPopover));
TooltipContent.decorators = [
    { type: core.Component, args: [{
                selector: "clr-tooltip-content",
                template: "\n        <ng-content></ng-content>\n    ",
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
TooltipContent.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: core.ElementRef, decorators: [{ type: core.Optional }, { type: core.Inject, args: [POPOVER_HOST_ANCHOR,] },] },
]; };
TooltipContent.propDecorators = {
    'position': [{ type: core.Input, args: ["clrPosition",] },],
    'size': [{ type: core.Input, args: ["clrSize",] },],
};
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TooltipTrigger = (function () {
    /**
     * @param {?} ifOpenService
     */
    function TooltipTrigger(ifOpenService) {
        this.ifOpenService = ifOpenService;
    }
    /**
     * @return {?}
     */
    TooltipTrigger.prototype.showTooltip = function () {
        this.ifOpenService.open = true;
    };
    /**
     * @return {?}
     */
    TooltipTrigger.prototype.hideTooltip = function () {
        this.ifOpenService.open = false;
    };
    return TooltipTrigger;
}());
TooltipTrigger.decorators = [
    { type: core.Directive, args: [{ selector: "[clrTooltipTrigger]", host: { "[attr.tabindex]": "0" } },] },
];
/**
 * @nocollapse
 */
TooltipTrigger.ctorParameters = function () { return [
    { type: IfOpenService, },
]; };
TooltipTrigger.propDecorators = {
    'showTooltip': [{ type: core.HostListener, args: ["mouseenter",] }, { type: core.HostListener, args: ["focus",] },],
    'hideTooltip': [{ type: core.HostListener, args: ["mouseleave",] }, { type: core.HostListener, args: ["blur",] },],
};
/*
 * Copyright (c) 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var TOOLTIP_DIRECTIVES = [Tooltip, TooltipTrigger, TooltipContent];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrTooltipModule = (function () {
    function ClrTooltipModule() {
    }
    return ClrTooltipModule;
}());
ClrTooltipModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrCommonPopoverModule],
                declarations: [TOOLTIP_DIRECTIVES],
                exports: [TOOLTIP_DIRECTIVES, ClrConditionalModule, ClrIconModule]
            },] },
];
/**
 * @nocollapse
 */
ClrTooltipModule.ctorParameters = function () { return []; };
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrPopoverModule = (function () {
    function ClrPopoverModule() {
    }
    return ClrPopoverModule;
}());
ClrPopoverModule.decorators = [
    { type: core.NgModule, args: [{ exports: [ClrDropdownModule, ClrSignpostModule, ClrTooltipModule] },] },
];
/**
 * @nocollapse
 */
ClrPopoverModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardPageButtonsDirective = (function () {
    /**
     * @param {?} pageButtonsTemplateRef
     */
    function WizardPageButtonsDirective(pageButtonsTemplateRef) {
        this.pageButtonsTemplateRef = pageButtonsTemplateRef;
    }
    return WizardPageButtonsDirective;
}());
WizardPageButtonsDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrPageButtons]" },] },
];
/**
 * @nocollapse
 */
WizardPageButtonsDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardPageHeaderActionsDirective = (function () {
    /**
     * @param {?} pageHeaderActionsTemplateRef
     */
    function WizardPageHeaderActionsDirective(pageHeaderActionsTemplateRef) {
        this.pageHeaderActionsTemplateRef = pageHeaderActionsTemplateRef;
    }
    return WizardPageHeaderActionsDirective;
}());
WizardPageHeaderActionsDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrPageHeaderActions]" },] },
];
/**
 * @nocollapse
 */
WizardPageHeaderActionsDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardPageNavTitleDirective = (function () {
    /**
     * @param {?} pageNavTitleTemplateRef
     */
    function WizardPageNavTitleDirective(pageNavTitleTemplateRef) {
        this.pageNavTitleTemplateRef = pageNavTitleTemplateRef;
    }
    return WizardPageNavTitleDirective;
}());
WizardPageNavTitleDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrPageNavTitle]" },] },
];
/**
 * @nocollapse
 */
WizardPageNavTitleDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardPageTitleDirective = (function () {
    /**
     * @param {?} pageTitleTemplateRef
     */
    function WizardPageTitleDirective(pageTitleTemplateRef) {
        this.pageTitleTemplateRef = pageTitleTemplateRef;
    }
    return WizardPageTitleDirective;
}());
WizardPageTitleDirective.decorators = [
    { type: core.Directive, args: [{ selector: "[clrPageTitle]" },] },
];
/**
 * @nocollapse
 */
WizardPageTitleDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ButtonHubService = (function () {
    function ButtonHubService() {
        this.buttonsReady = false;
        this._previousBtnClicked = new Subject.Subject();
        this._nextBtnClicked = new Subject.Subject();
        this._dangerBtnClicked = new Subject.Subject();
        this._cancelBtnClicked = new Subject.Subject();
        this._finishBtnClicked = new Subject.Subject();
        this._customBtnClicked = new Subject.Subject();
    }
    Object.defineProperty(ButtonHubService.prototype, "previousBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._previousBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "nextBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._nextBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "dangerBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._dangerBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "cancelBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._cancelBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "finishBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._finishBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonHubService.prototype, "customBtnClicked", {
        /**
         * @return {?}
         */
        get: function () {
            return this._customBtnClicked.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} buttonType
     * @return {?}
     */
    ButtonHubService.prototype.buttonClicked = function (buttonType) {
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
    };
    return ButtonHubService;
}());
ButtonHubService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
ButtonHubService.ctorParameters = function () { return []; };
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
var PageCollectionService = (function () {
    function PageCollectionService() {
        /**
         *
         *
         * \@memberof PageCollectionService
         */
        this._pagesReset = new Subject.Subject();
    }
    Object.defineProperty(PageCollectionService.prototype, "pagesAsArray", {
        /**
         * Converts the PageCollectionService.pages QueryList to an array and returns it.
         *
         * Useful for many instances when you would prefer a QueryList to act like an array.
         *
         * \@readonly
         * \@memberof PageCollectionService
         * @return {?}
         */
        get: function () {
            return this.pages ? this.pages.toArray() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "pagesCount", {
        /**
         * Returns the length of the pages query list.
         *
         * \@readonly
         * \@memberof PageCollectionService
         * @return {?}
         */
        get: function () {
            return this.pages ? this.pages.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "penultimatePage", {
        /**
         * Returns the next-to-last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@readonly
         * \@memberof PageCollectionService
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ pageCount = this.pagesCount;
            if (pageCount < 2) {
                return;
            }
            return this.pagesAsArray[pageCount - 2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "lastPage", {
        /**
         * Returns the last page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@readonly
         * \@memberof PageCollectionService
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ pageCount = this.pagesCount;
            if (pageCount < 1) {
                return;
            }
            return this.pagesAsArray[pageCount - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageCollectionService.prototype, "firstPage", {
        /**
         * Returns the first page in the query list of pages. Operates as a getter
         * so that it isn't working with stale data.
         *
         * \@readonly
         * \@memberof PageCollectionService
         * @return {?}
         */
        get: function () {
            if (!this.pagesCount) {
                return;
            }
            return this.pagesAsArray[0];
        },
        enumerable: true,
        configurable: true
    });
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
    PageCollectionService.prototype.getPageById = function (id) {
        var /** @type {?} */ foundPages = this.pages.filter(function (page) { return id === page.id; });
        return this.checkResults(foundPages, id);
    };
    /**
     * Accepts s number as a parameter and treats that number as the index of the page
     * you're looking for in the collection of pages. Returns a  wizard page object.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} index
     * @return {?}
     */
    PageCollectionService.prototype.getPageByIndex = function (index) {
        var /** @type {?} */ pageCount = this.pagesCount;
        var /** @type {?} */ pagesLastIndex = (pageCount > 1) ? pageCount - 1 : 0;
        if (index < 0) {
            throw new Error("Cannot retrieve page with index of " + index);
        }
        if (index > pagesLastIndex) {
            throw new Error("Page index is greater than length of pages array.");
        }
        return this.pagesAsArray[index];
    };
    /**
     * Takes a wizard page object as a parameter and returns its index in the
     * collection of pages.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getPageIndex = function (page) {
        var /** @type {?} */ index = this.pagesAsArray.indexOf(page);
        if (index < 0) {
            throw new Error("Requested page cannot be found in collection of pages.");
        }
        return index;
    };
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
    PageCollectionService.prototype.checkResults = function (results, requestedPageId) {
        var /** @type {?} */ foundPagesCount = results.length || 0;
        if (foundPagesCount > 1) {
            throw new Error("More than one page has the requested id " + requestedPageId + ".");
        }
        else if (foundPagesCount < 1) {
            throw new Error("No page can be found with the id " + requestedPageId + ".");
        }
        else {
            return results[0];
        }
    };
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
    PageCollectionService.prototype.pageRange = function (start, end) {
        var /** @type {?} */ pages = [];
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
    };
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
    PageCollectionService.prototype.getPageRangeFromPages = function (page, otherPage) {
        var /** @type {?} */ pageIndex = this.getPageIndex(page);
        var /** @type {?} */ otherPageIndex = this.getPageIndex(otherPage);
        var /** @type {?} */ startIndex;
        var /** @type {?} */ endIndex;
        if (pageIndex <= otherPageIndex) {
            startIndex = pageIndex;
            endIndex = otherPageIndex;
        }
        else {
            startIndex = otherPageIndex;
            endIndex = pageIndex;
        }
        return this.pageRange(startIndex, endIndex);
    };
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
    PageCollectionService.prototype.getPreviousPage = function (page) {
        var /** @type {?} */ myPageIndex = this.getPageIndex(page);
        var /** @type {?} */ previousPageIndex = myPageIndex - 1;
        if (previousPageIndex < 0) {
            return null;
        }
        return this.getPageByIndex(previousPageIndex);
    };
    /**
     * Accepts a wizard page object as a parameter and returns a Boolean that says if
     * the page you sent it is complete.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.previousPageIsCompleted = function (page) {
        var /** @type {?} */ previousPage;
        if (!page) {
            return false;
        }
        previousPage = this.getPreviousPage(page);
        if (null === previousPage) {
            // page is the first page. no previous page.
            return true;
        }
        return previousPage.completed;
    };
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
    PageCollectionService.prototype.getNextPage = function (page) {
        var /** @type {?} */ myPageIndex = this.getPageIndex(page);
        var /** @type {?} */ nextPageIndex = myPageIndex + 1;
        if (nextPageIndex >= this.pagesAsArray.length) {
            return null;
        }
        return this.getPageByIndex(nextPageIndex);
    };
    /**
     * Takes a wizard page object as a parameter and generates a step item id from the
     * page ID. Returns the generated step item ID as a string.
     *
     *
     * \@memberof PageCollectionService
     * @param {?} page
     * @return {?}
     */
    PageCollectionService.prototype.getStepItemIdForPage = function (page) {
        var /** @type {?} */ pageId = page.id;
        var /** @type {?} */ pageIdParts = pageId.split("-").reverse();
        pageIdParts[1] = "step";
        return pageIdParts.reverse().join("-");
    };
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
    PageCollectionService.prototype.commitPage = function (page) {
        var /** @type {?} */ pageHasOverrides = page.stopNext || page.preventDefault;
        page.completed = true;
        if (!pageHasOverrides) {
            // prevent loop of event emission; alternate flows work off
            // of event emitters this is how they break that cycle.
            page.onCommit.emit(page.id);
        }
    };
    Object.defineProperty(PageCollectionService.prototype, "pagesReset", {
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
        get: function () {
            return this._pagesReset.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets all completed states of the pages in the page collection to false and
     * notifies the navigation service to likewise reset the navigation.
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    PageCollectionService.prototype.reset = function () {
        this.pagesAsArray.forEach(function (page) {
            page.completed = false;
        });
        this._pagesReset.next(true);
    };
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
    PageCollectionService.prototype.updateCompletedStates = function () {
        var /** @type {?} */ firstIncompleteIndex = this.findFirstIncompletePageIndex();
        if (firstIncompleteIndex === this.pagesAsArray.length - 1) {
            // all complete no need to do anything
            return;
        }
        this.pagesAsArray.forEach(function (page, index) {
            if (index > firstIncompleteIndex) {
                page.completed = false;
            }
        });
    };
    /**
     * Retrieves the index of the first incomplete page in the page collection.
     *
     *
     * \@memberof PageCollectionService
     * @return {?}
     */
    PageCollectionService.prototype.findFirstIncompletePageIndex = function () {
        var /** @type {?} */ returnIndex = null;
        this.pagesAsArray.forEach(function (page, index) {
            if (null === returnIndex && false === page.completed) {
                returnIndex = index;
            }
        });
        // fallthrough, all completed, return last page
        if (null === returnIndex) {
            returnIndex = this.pagesCount - 1;
        }
        return returnIndex;
    };
    /**
     * @return {?}
     */
    PageCollectionService.prototype.findFirstIncompletePage = function () {
        var /** @type {?} */ myIncompleteIndex = this.findFirstIncompletePageIndex();
        return this.pagesAsArray[myIncompleteIndex];
    };
    return PageCollectionService;
}());
PageCollectionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
PageCollectionService.ctorParameters = function () { return []; };
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
var WizardNavigationService = (function () {
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
    function WizardNavigationService(pageCollection, buttonService) {
        var _this = this;
        this.pageCollection = pageCollection;
        this.buttonService = buttonService;
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._currentChanged = new Subject.Subject();
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
        this._movedToNextPage = new Subject.Subject();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._wizardFinished = new Subject.Subject();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._movedToPreviousPage = new Subject.Subject();
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         */
        this._cancelWizard = new Subject.Subject();
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
        this.previousButtonSubscription = this.buttonService.previousBtnClicked.subscribe(function () {
            var currentPage = _this.currentPage;
            if (_this.currentPageIsFirst || currentPage.previousStepDisabled) {
                return;
            }
            currentPage.previousButtonClicked.emit(currentPage);
            if (!currentPage.preventDefault) {
                _this.previous();
            }
        });
        this.nextButtonSubscription = this.buttonService.nextBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage("next");
        });
        this.dangerButtonSubscription = this.buttonService.dangerBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage("danger");
        });
        this.finishButtonSubscription = this.buttonService.finishBtnClicked.subscribe(function () {
            _this.checkAndCommitCurrentPage("finish");
        });
        this.customButtonSubscription = this.buttonService.customBtnClicked.subscribe(function (type) {
            if (!_this.wizardStopNavigation) {
                _this.currentPage.customButtonClicked.emit(type);
            }
        });
        this.cancelButtonSubscription = this.buttonService.cancelBtnClicked.subscribe(function () {
            if (_this.wizardStopNavigation) {
                return;
            }
            if (_this.currentPage.preventDefault) {
                _this.currentPage.pageOnCancel.emit(_this.currentPage);
            }
            else {
                _this.cancel();
            }
        });
        this.pagesResetSubscription = this.pageCollection.pagesReset.subscribe(function () {
            _this.setFirstPageCurrent();
        });
    }
    /**
     *
     * \@ignore
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.ngOnDestroy = function () {
        this.previousButtonSubscription.unsubscribe();
        this.nextButtonSubscription.unsubscribe();
        this.dangerButtonSubscription.unsubscribe();
        this.finishButtonSubscription.unsubscribe();
        this.customButtonSubscription.unsubscribe();
        this.cancelButtonSubscription.unsubscribe();
        this.pagesResetSubscription.unsubscribe();
    };
    Object.defineProperty(WizardNavigationService.prototype, "currentPageChanged", {
        /**
         * An Observable that is predominantly used amongst the subcomponents and services
         * of the wizard. It is recommended that users listen to the WizardPage.onLoad
         * (clrWizardPageOnLoad) output instead of this Observable.
         *
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            // TODO: MAKE SURE EXTERNAL OUTPUTS SAY 'CHANGE' NOT 'CHANGED'
            // A BREAKING CHANGE SO AWAITING MINOR RELEASE
            return this._currentChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageTitle", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            // when the querylist of pages is empty. this is the first place it fails...
            if (!this.currentPage) {
                return null;
            }
            return this.currentPage.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsFirst", {
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
        get: function () {
            return this.pageCollection.firstPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsNextToLast", {
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
        get: function () {
            return this.pageCollection.penultimatePage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPageIsLast", {
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
        get: function () {
            return this.pageCollection.lastPage === this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "currentPage", {
        /**
         * Returns the WizardPage object of the current page or null.
         *
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            if (!this._currentPage) {
                return null;
            }
            return this._currentPage;
        },
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
        set: function (page) {
            if (this._currentPage !== page && !this.wizardStopNavigation) {
                this._currentPage = page;
                page.onLoad.emit(page.id);
                this._currentChanged.next(page);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.setCurrentPage = function (page) {
        this.currentPage = page;
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToNextPage", {
        /**
         * An observable used internally to alert the wizard that forward navigation
         * has occurred. It is recommended that you use the Wizard.onMoveNext
         * (clrWizardOnNext) output instead of this one.
         *
         * \@readonly
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            return this._movedToNextPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "wizardFinished", {
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
        get: function () {
            return this._wizardFinished.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.next = function () {
        if (this.currentPageIsLast) {
            this.checkAndCommitCurrentPage("finish");
            return;
        }
        this.checkAndCommitCurrentPage("next");
        if (!this.wizardHasAltNext && !this.wizardStopNavigation) {
            this._movedToNextPage.next(true);
        }
    };
    /**
     * Bypasses checks and most event emissions to force a page to navigate forward.
     *
     * Comparable to calling Wizard.next() or Wizard.forceNext().
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.forceNext = function () {
        var /** @type {?} */ currentPage = this.currentPage;
        var /** @type {?} */ nextPage = this.pageCollection.getNextPage(currentPage);
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
    };
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
    WizardNavigationService.prototype.checkAndCommitCurrentPage = function (buttonType) {
        var /** @type {?} */ currentPage = this.currentPage;
        var /** @type {?} */ iAmTheLastPage;
        var /** @type {?} */ isNext;
        var /** @type {?} */ isDanger;
        var /** @type {?} */ isDangerNext;
        var /** @type {?} */ isDangerFinish;
        var /** @type {?} */ isFinish;
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
    };
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
    WizardNavigationService.prototype.finish = function () {
        this.checkAndCommitCurrentPage("finish");
    };
    Object.defineProperty(WizardNavigationService.prototype, "movedToPreviousPage", {
        /**
         * Notifies the wizard when backwards navigation has occurred via the
         * previous button.
         *
         * \@readonly
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            return this._movedToPreviousPage.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.previous = function () {
        var /** @type {?} */ previousPage;
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
    };
    Object.defineProperty(WizardNavigationService.prototype, "notifyWizardCancel", {
        /**
         * Notifies the wizard that a user is trying to cancel it.
         *
         * \@readonly
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            return this._cancelWizard.asObservable();
        },
        enumerable: true,
        configurable: true
    });
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
    WizardNavigationService.prototype.cancel = function () {
        this._cancelWizard.next();
    };
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
    WizardNavigationService.prototype.goTo = function (pageToGoToOrId, lazyComplete) {
        if (lazyComplete === void 0) { lazyComplete = false; }
        var /** @type {?} */ pageToGoTo;
        var /** @type {?} */ currentPage;
        var /** @type {?} */ myPages;
        var /** @type {?} */ pagesToCheck;
        var /** @type {?} */ okayToMove = true;
        var /** @type {?} */ goingForward;
        var /** @type {?} */ currentPageIndex;
        var /** @type {?} */ goToPageIndex;
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
            pagesToCheck.forEach(function (page) {
                if (page !== pageToGoTo) {
                    page.completed = true;
                }
            });
        }
        else if (!goingForward && this.forceForwardNavigation) {
            pagesToCheck.forEach(function (page) {
                page.completed = false;
            });
        }
        this.currentPage = pageToGoTo;
    };
    /**
     * Accepts a range of WizardPage objects as a parameter. Performs the work of checking
     * those objects to determine if navigation can be accomplished.
     *
     *
     * \@memberof WizardNavigationService
     * @param {?} pagesToCheck
     * @return {?}
     */
    WizardNavigationService.prototype.canGoTo = function (pagesToCheck) {
        var /** @type {?} */ okayToMove = true;
        var /** @type {?} */ myPages = this.pageCollection;
        // previous page can be important when moving because if it's completed it
        // allows us to move to the page even if it's incomplete...
        var /** @type {?} */ previousPagePasses;
        if (!pagesToCheck || pagesToCheck.length < 1) {
            return false;
        }
        pagesToCheck.forEach(function (page) {
            var /** @type {?} */ previousPage;
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
    };
    /**
     * Looks through the collection of pages to find the first one that is incomplete
     * and makes that page the current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.setLastEnabledPageCurrent = function () {
        var /** @type {?} */ allPages = this.pageCollection.pagesAsArray;
        var /** @type {?} */ lastCompletedPageIndex = null;
        allPages.forEach(function (page, index) {
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
    };
    /**
     * Finds the first page in the collection of pages and makes that page the
     * current/active page.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.setFirstPageCurrent = function () {
        this.currentPage = this.pageCollection.pagesAsArray[0];
    };
    Object.defineProperty(WizardNavigationService.prototype, "wizardGhostPageState", {
        /**
         *
         * \@ignore
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            return this._wizardGhostPageState;
        },
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this.hideWizardGhostPages) {
                this._wizardGhostPageState = GHOST_PAGE_ANIMATION.STATES.NO_PAGES;
            }
            else {
                this._wizardGhostPageState = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardNavigationService.prototype, "hideWizardGhostPages", {
        /**
         *
         * \@ignore
         * \@memberof WizardNavigationService
         * @return {?}
         */
        get: function () {
            return this._hideWizardGhostPages;
        },
        /**
         *
         * \@ignore
         *
         * \@memberof WizardNavigationService
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hideWizardGhostPages = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the stepnav on the left side of the wizard when pages are dynamically
     * added or removed from the collection of pages.
     *
     * \@memberof WizardNavigationService
     * @return {?}
     */
    WizardNavigationService.prototype.updateNavigation = function () {
        var /** @type {?} */ toSetCurrent;
        var /** @type {?} */ currentPageRemoved;
        this.pageCollection.updateCompletedStates();
        currentPageRemoved = this.pageCollection.pagesAsArray.indexOf(this.currentPage) < 0;
        if (currentPageRemoved) {
            toSetCurrent = this.pageCollection.findFirstIncompletePage();
            this.currentPage = toSetCurrent;
        }
    };
    return WizardNavigationService;
}());
WizardNavigationService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
WizardNavigationService.ctorParameters = function () { return [
    { type: PageCollectionService, },
    { type: ButtonHubService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var HeaderActionService = (function () {
    /**
     * @param {?} navService
     */
    function HeaderActionService(navService) {
        this.navService = navService;
    }
    Object.defineProperty(HeaderActionService.prototype, "wizardHasHeaderActions", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ wizardHdrActions = this.wizardHeaderActions;
            if (!wizardHdrActions) {
                return false;
            }
            return wizardHdrActions.toArray().length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "currentPageHasHeaderActions", {
        /**
         * @return {?}
         */
        get: function () {
            return this.navService.currentPage ? this.navService.currentPage.hasHeaderActions : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "showWizardHeaderActions", {
        /**
         * @return {?}
         */
        get: function () {
            return !this.currentPageHasHeaderActions && this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderActionService.prototype, "displayHeaderActionsWrapper", {
        /**
         * @return {?}
         */
        get: function () {
            return this.currentPageHasHeaderActions || this.wizardHasHeaderActions;
        },
        enumerable: true,
        configurable: true
    });
    return HeaderActionService;
}());
HeaderActionService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
HeaderActionService.ctorParameters = function () { return [
    { type: WizardNavigationService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var wizardHeaderActionIndex = 0;
var WizardHeaderAction = (function () {
    function WizardHeaderAction() {
        // title is explanatory text added to the header action
        this.title = "";
        // If our host has an ID attribute, we use this instead of our index.
        this._id = (wizardHeaderActionIndex++).toString();
        this.disabled = false;
        this.headerActionClicked = new core.EventEmitter(false);
    }
    Object.defineProperty(WizardHeaderAction.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return "clr-wizard-header-action-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardHeaderAction.prototype.click = function () {
        if (this.disabled) {
            return;
        }
        // passing the header action id allows users to have one method that
        // routes to many different actions based on the type of header action
        // clicked. this is further aided by users being able to specify ids
        // for their header actions.
        this.headerActionClicked.emit(this._id);
    };
    return WizardHeaderAction;
}());
WizardHeaderAction.decorators = [
    { type: core.Component, args: [{
                selector: "clr-wizard-header-action",
                template: "\n        <button \n            type=\"button\"\n            class=\"btn clr-wizard-header-action btn-link\"\n            [id]=\"id\"\n            [class.disabled]=\"disabled\"\n            (click)=\"click()\"\n            [title]=\"title\">\n            <ng-content></ng-content>\n        </button>\n    ",
                host: { "class": "clr-wizard-header-action-wrapper" }
            },] },
];
/**
 * @nocollapse
 */
WizardHeaderAction.ctorParameters = function () { return []; };
WizardHeaderAction.propDecorators = {
    'title': [{ type: core.Input, args: ["title",] },],
    '_id': [{ type: core.Input, args: ["id",] },],
    'disabled': [{ type: core.Input, args: ["clrWizardHeaderActionDisabled",] },],
    'headerActionClicked': [{ type: core.Output, args: ["actionClicked",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var wizardPageIndex = 0;
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
var WizardPage = (function () {
    /**
     * Creates an instance of WizardPage.
     *
     *
     * \@memberof WizardPage
     * @param {?} navService
     * @param {?} pageCollection
     * @param {?} buttonService
     */
    function WizardPage(navService, pageCollection, buttonService) {
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
        this.nextStepDisabledChange = new core.EventEmitter();
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
        this.previousStepDisabledChange = new core.EventEmitter();
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
        this.stopCancelChange = new core.EventEmitter();
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
        this.onCommit = new core.EventEmitter(false);
        /**
         * Emits an event when WizardPage becomes the current page of the
         * Wizard.
         *
         * \@memberof WizardPage
         */
        this.onLoad = new core.EventEmitter();
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
        this.pageOnCancel = new core.EventEmitter();
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
        this.finishButtonClicked = new core.EventEmitter();
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
        this.previousButtonClicked = new core.EventEmitter();
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
        this.nextButtonClicked = new core.EventEmitter();
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
        this.dangerButtonClicked = new core.EventEmitter();
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
        this.primaryButtonClicked = new core.EventEmitter();
        this.customButtonClicked = new core.EventEmitter();
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
    Object.defineProperty(WizardPage.prototype, "nextStepDisabled", {
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
        get: function () {
            return this._nextStepDisabled;
        },
        /**
         * Sets whether the page should allow forward navigation.
         *
         * \@memberof WizardPage
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ valBool = !!val;
            if (valBool !== this._nextStepDisabled) {
                this._nextStepDisabled = valBool;
                this.nextStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "previousStepDisabled", {
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
        get: function () {
            return this._previousStepDisabled;
        },
        /**
         * Sets whether the page should allow backward navigation.
         *
         * \@memberof WizardPage
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            var /** @type {?} */ valBool = !!val;
            if (valBool !== this._previousStepDisabled) {
                this._previousStepDisabled = valBool;
                this.previousStepDisabledChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "stopCancel", {
        /**
         * A getter that retrieves whether the page is preventing the cancel action.
         *
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return this._stopCancel;
        },
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
        set: function (val) {
            var /** @type {?} */ valBool = !!val;
            if (valBool !== this._stopCancel) {
                this._stopCancel = valBool;
                this.stopCancelChange.emit(valBool);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "stopNext", {
        /**
         * A getter that tells you whether the page is preventing the next action.
         *
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return this._stopNext;
        },
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
        set: function (val) {
            var /** @type {?} */ valBool = !!val;
            if (valBool !== this._stopNext) {
                this._stopNext = valBool;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "id", {
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
        get: function () {
            // covers things like null, undefined, false, and empty string
            // while allowing zero to pass
            var /** @type {?} */ idIsNonZeroFalsy = (!this._id && this._id !== 0);
            // in addition to non-zero falsy we also want to make sure _id is not a negative
            // number.
            if (idIsNonZeroFalsy || this._id < 0) {
                // guard here in the event that input becomes undefined or null by accident
                this._id = (wizardPageIndex++).toString();
            }
            return "clr-wizard-page-" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "readyToComplete", {
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
        get: function () {
            return !this.nextStepDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "completed", {
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
        get: function () {
            return this._complete && this.readyToComplete;
            // FOR V2: UNWIND COMPLETED, READYTOCOMPLETE, AND ERRORS
            // SUCH THAT ERRORS IS ITS OWN INPUT. IF A STEP IS
            // INCOMPLETE AND ERRORED, ERRORED WILL NOT SHOW.
            // FIRST QUESTION: AM I GREY OR COLORED?
            // SECOND QUESTION: AM I GREEN OR RED?
        },
        /**
         * A WizardPage can be manually set to completed using this boolean setter.
         * It is recommended that users rely on the convenience functions in the wizard
         * and navigation service instead of manually setting pages’ completion state.
         *
         * \@memberof WizardPage
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._complete = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "current", {
        /**
         * Checks with the navigation service to see if it is the current page.
         *
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return this.navService.currentPage === this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return !this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "enabled", {
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
        get: function () {
            return this.current || this.completed || this.previousCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "previousCompleted", {
        /**
         * A read-only getter that returns whether or not the page before this
         * WizardPage is completed. This is useful for determining whether or not
         * a page is navigable if it is not current or already completed.
         *
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ previousPage = this.pageCollection.getPreviousPage(this);
            if (!previousPage) {
                return true;
            }
            return previousPage.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "title", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "navTitle", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            if (this.pageNavTitle) {
                return this.pageNavTitle.pageNavTitleTemplateRef;
            }
            return this.pageTitle.pageTitleTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "headerActions", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            if (!this._headerActions) {
                return;
            }
            return this._headerActions.pageHeaderActionsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "hasHeaderActions", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return !!this._headerActions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "buttons", {
        /**
         *
         * \@ignore
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            if (!this._buttons) {
                return;
            }
            return this._buttons.pageButtonsTemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardPage.prototype, "hasButtons", {
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
        get: function () {
            return !!this._buttons;
        },
        enumerable: true,
        configurable: true
    });
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
    WizardPage.prototype.makeCurrent = function () {
        this.navService.currentPage = this;
    };
    /**
     * Links the nav service and establishes the current page if one is not defined.
     *
     * \@memberof WizardPage
     * @return {?}
     */
    WizardPage.prototype.ngOnInit = function () {
        var /** @type {?} */ navService = this.navService;
        if (!navService.currentPage && !navService.navServiceLoaded) {
            this.makeCurrent();
            this.navService.navServiceLoaded = true;
        }
    };
    Object.defineProperty(WizardPage.prototype, "stepItemId", {
        /**
         * A read-only getter that returns the id used by the step nav item associated with the page.
         *
         * WizardPage needs this ID string for aria information.
         *
         * \@readonly
         * \@memberof WizardPage
         * @return {?}
         */
        get: function () {
            return this.pageCollection.getStepItemIdForPage(this);
        },
        enumerable: true,
        configurable: true
    });
    return WizardPage;
}());
WizardPage.decorators = [
    { type: core.Component, args: [{
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
WizardPage.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
]; };
WizardPage.propDecorators = {
    'pageTitle': [{ type: core.ContentChild, args: [WizardPageTitleDirective,] },],
    'pageNavTitle': [{ type: core.ContentChild, args: [WizardPageNavTitleDirective,] },],
    '_buttons': [{ type: core.ContentChild, args: [WizardPageButtonsDirective,] },],
    '_headerActions': [{ type: core.ContentChild, args: [WizardPageHeaderActionsDirective,] },],
    'nextStepDisabled': [{ type: core.Input, args: ["clrWizardPageNextDisabled",] },],
    'nextStepDisabledChange': [{ type: core.Output, args: ["clrWizardPageNextDisabledChange",] },],
    'previousStepDisabled': [{ type: core.Input, args: ["clrWizardPagePreviousDisabled",] },],
    'previousStepDisabledChange': [{ type: core.Output, args: ["clrWizardPagePreviousDisabledChange",] },],
    'preventDefault': [{ type: core.Input, args: ["clrWizardPagePreventDefault",] },],
    'stopCancel': [{ type: core.Input, args: ["clrWizardPagePreventDefaultCancel",] },],
    'stopCancelChange': [{ type: core.Output, args: ["clrWizardPagePreventDefaultCancelChange",] },],
    'stopNext': [{ type: core.Input, args: ["clrWizardPagePreventDefaultNext",] },],
    'onCommit': [{ type: core.Output, args: ["clrWizardPageOnCommit",] },],
    'onLoad': [{ type: core.Output, args: ["clrWizardPageOnLoad",] },],
    'pageOnCancel': [{ type: core.Output, args: ["clrWizardPageOnCancel",] },],
    'finishButtonClicked': [{ type: core.Output, args: ["clrWizardPageFinish",] },],
    'previousButtonClicked': [{ type: core.Output, args: ["clrWizardPagePrevious",] },],
    'nextButtonClicked': [{ type: core.Output, args: ["clrWizardPageNext",] },],
    'dangerButtonClicked': [{ type: core.Output, args: ["clrWizardPageDanger",] },],
    'primaryButtonClicked': [{ type: core.Output, args: ["clrWizardPagePrimary",] },],
    'customButtonClicked': [{ type: core.Output, args: ["clrWizardPageCustomButton",] },],
    '_id': [{ type: core.Input, args: ["id",] },],
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
var Wizard = (function () {
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
    function Wizard(navService, pageCollection, buttonService, headerActionService, elementRef, differs) {
        var _this = this;
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
        this._openChanged = new core.EventEmitter(false);
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
        this.onCancel = new core.EventEmitter(false);
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
        this.wizardFinished = new core.EventEmitter(false);
        /**
         * Emits when the wizard is reset. See .reset(). Can be observed through
         * the clrWizardOnReset output.
         *
         * \@name onReset
         * \@memberof Wizard
         */
        this.onReset = new core.EventEmitter(false);
        /**
         * Emits when the current page has changed. Can be observed through the clrWizardCurrentPageChanged
         * output. This can happen on .next() or .previous().
         * Useful for non-blocking validation.
         *
         * \@name currentPageChanged
         * \@memberof Wizard
         */
        this.currentPageChanged = new core.EventEmitter(false);
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
        this.onMoveNext = new core.EventEmitter(false);
        /**
         * Emits when the wizard moves to the previous page. Can be observed through the
         * clrWizardOnPrevious output.
         *
         * Can be useful for validation.
         *
         * \@name onMovePrevious
         * \@memberof Wizard
         */
        this.onMovePrevious = new core.EventEmitter(false);
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
        this.goNextSubscription = this.navService.movedToNextPage.subscribe(function () {
            _this.onMoveNext.emit();
        });
        this.goPreviousSubscription = this.navService.movedToPreviousPage.subscribe(function () {
            _this.onMovePrevious.emit();
        });
        this.cancelSubscription = this.navService.notifyWizardCancel.subscribe(function () {
            _this.checkAndCancel();
        });
        this.wizardFinishedSubscription = this.navService.wizardFinished.subscribe(function () {
            if (!_this.stopNext) {
                _this.forceFinish();
            }
            _this.wizardFinished.emit();
        });
        this.differ = differs.find([]).create(null);
    }
    Object.defineProperty(Wizard.prototype, "forceForward", {
        /**
         * @return {?}
         */
        get: function () {
            return this._forceForward;
        },
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
        set: function (value) {
            this._forceForward = !!value;
            this.navService.forceForwardNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "clrWizardOpen", {
        /**
         * @param {?} open
         * @return {?}
         */
        set: function (open) {
            if (open) {
                this.buttonService.buttonsReady = true;
            }
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "stopNext", {
        /**
         * @return {?}
         */
        get: function () {
            return this._stopNext;
        },
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
        set: function (value) {
            this._stopNext = !!value;
            this.navService.wizardHasAltNext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "stopCancel", {
        /**
         * @return {?}
         */
        get: function () {
            return this._stopCancel;
        },
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
        set: function (value) {
            this._stopCancel = !!value;
            this.navService.wizardHasAltCancel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "stopNavigation", {
        /**
         * @return {?}
         */
        get: function () {
            return this._stopNavigation;
        },
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
        set: function (value) {
            this._stopNavigation = !!value;
            this.navService.wizardStopNavigation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "disableStepnav", {
        /**
         * @return {?}
         */
        get: function () {
            return this._disableStepnav;
        },
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
        set: function (value) {
            this._disableStepnav = !!value;
            this.navService.wizardDisableStepnav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "stopModalAnimations", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._stopModalAnimations) {
                return "true";
            }
            return "false";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Wizard.prototype.ngOnInit = function () {
        var _this = this;
        this.currentPageSubscription = this.navService.currentPageChanged.subscribe(function (page) {
            _this.setGhostPages();
            _this.currentPageChanged.emit();
        });
    };
    /**
     * @return {?}
     */
    Wizard.prototype.ngOnDestroy = function () {
        this.goNextSubscription.unsubscribe();
        this.goPreviousSubscription.unsubscribe();
        this.cancelSubscription.unsubscribe();
        this.currentPageSubscription.unsubscribe();
        this.wizardFinishedSubscription.unsubscribe();
    };
    /**
     * Sets up references that are needed by the providers.
     *
     * \@name ngAfterContentInit
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.ngAfterContentInit = function () {
        var /** @type {?} */ navService = this.navService;
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
    };
    /**
     * Used for keeping track of when pages are added or removed from this.pages
     *
     * \@name ngDoCheck
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.ngDoCheck = function () {
        var _this = this;
        var /** @type {?} */ changes = this.differ.diff(this.pages);
        if (changes) {
            changes.forEachAddedItem(function (r) {
                _this.navService.updateNavigation();
            });
            changes.forEachRemovedItem(function (r) {
                _this.navService.updateNavigation();
            });
        }
    };
    Object.defineProperty(Wizard.prototype, "isStatic", {
        /**
         * Convenient property for determining whether a wizard is static/in-line or not.
         *
         * \@name isStatic
         * \@readonly
         * \@memberof Wizard
         * @return {?}
         */
        get: function () {
            return this.elementRef.nativeElement.classList.contains("clr-wizard--inline");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "currentPage", {
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
        get: function () {
            return this.navService.currentPage;
        },
        /**
         * @param {?} page
         * @return {?}
         */
        set: function (page) {
            this.navService.goTo(page, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "isLast", {
        /**
         * Convenient property for determining if the current page is the last page of
         * the wizard.
         *
         * \@name isLast
         * \@readonly
         * \@memberof Wizard
         * @return {?}
         */
        get: function () {
            return this.navService.currentPageIsLast;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "isFirst", {
        /**
         * Convenient property for determining if the current page is the first page of
         * the wizard.
         *
         * \@name isFirst
         * \@readonly
         * \@memberof Wizard
         * @return {?}
         */
        get: function () {
            return this.navService.currentPageIsFirst;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs the actions needed to open the wizard. If there is no current
     * page defined, sets the first page in the wizard to be current.
     *
     * \@name open
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.open = function () {
        this._open = true;
        if (!this.currentPage) {
            this.navService.setFirstPageCurrent();
        }
        // Only render buttons when wizard is opened, to avoid chocolate errors
        this.buttonService.buttonsReady = true;
        this.setGhostPages();
        this._openChanged.emit(true);
    };
    /**
     * Does the work involved with closing the wizard. Call this directly instead
     * of cancel() to implement alternative cancel functionality.
     *
     * \@name close
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.close = function () {
        if (this.stopNavigation) {
            return;
        }
        this._open = false;
        this.deactivateGhostPages();
        this._openChanged.emit(false);
    };
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
    Wizard.prototype.toggle = function (value) {
        if (value) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * DEPRECATED. Moves the wizard to the previous page. Carried over from legacy.
     *
     * It is recommended that you use previous() instead.
     *
     * \@name prev
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.prev = function () {
        this.previous();
    };
    /**
     * Moves the wizard to the previous page.
     *
     * \@name previous
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.previous = function () {
        this.navService.previous();
    };
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
    Wizard.prototype.next = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceNext();
        }
        else {
            this.navService.next();
        }
    };
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
    Wizard.prototype.finish = function (skipChecksAndEmits) {
        if (skipChecksAndEmits === void 0) { skipChecksAndEmits = true; }
        if (skipChecksAndEmits) {
            this.forceFinish();
        }
        else {
            this.navService.finish();
        }
    };
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
    Wizard.prototype.forceFinish = function () {
        if (this.stopNavigation) {
            return;
        }
        this.deactivateGhostPages();
        this.close();
    };
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
    Wizard.prototype.forceNext = function () {
        this.navService.forceNext();
    };
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
    Wizard.prototype.cancel = function () {
        this.navService.cancel();
    };
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
    Wizard.prototype.modalCancel = function () {
        this.checkAndCancel();
    };
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
    Wizard.prototype.checkAndCancel = function () {
        var /** @type {?} */ currentPage = this.currentPage;
        var /** @type {?} */ currentPageHasOverrides = currentPage.stopCancel || currentPage.preventDefault;
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
    };
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
    Wizard.prototype.goTo = function (pageId) {
        if (!pageId) {
            return;
        }
        this.navService.goTo(pageId);
    };
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
    Wizard.prototype.reset = function () {
        this.pageCollection.reset();
        this.onReset.next();
    };
    Object.defineProperty(Wizard.prototype, "ghostPageState", {
        /**
         * A convenience getter to retrieve the ghost Page animation state from
         * WizardNavigationService.
         *
         * \@name ghostPageState
         * \@readonly
         * \@memberof Wizard
         * @return {?}
         */
        get: function () {
            return this.navService.wizardGhostPageState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Convenience method that resets the ghost page animation.
     *
     * \@name deactivateGhostPages
     * \@memberof Wizard
     * @return {?}
     */
    Wizard.prototype.deactivateGhostPages = function () {
        this.setGhostPages("deactivate");
    };
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
    Wizard.prototype.setGhostPages = function (deactivateOrNot) {
        if (deactivateOrNot === void 0) { deactivateOrNot = ""; }
        var /** @type {?} */ navService = this.navService;
        var /** @type {?} */ ghostpageStates = GHOST_PAGE_ANIMATION.STATES;
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
    };
    return Wizard;
}());
Wizard.decorators = [
    { type: core.Component, args: [{
                selector: "clr-wizard",
                providers: [WizardNavigationService, PageCollectionService, ButtonHubService, HeaderActionService],
                template: "\n      <!--\n      ~ Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.\n      ~ This software is released under MIT license.\n      ~ The full license information can be found in LICENSE in the root directory of this project.\n      -->\n\n      <clr-modal\n          [clrModalOpen]=\"_open\"\n          [clrModalSize]=\"size\"\n          [clrModalClosable]=\"closable\"\n          [clrModalStaticBackdrop]=\"true\"\n          [clrModalSkipAnimation]=\"stopModalAnimations\"\n          [clrModalGhostPageState]=\"ghostPageState\"\n          [clrModalOverrideScrollService]=\"isStatic\"\n          [clrModalPreventClose]=\"true\"\n          (clrModalAlternateClose)=\"modalCancel()\">\n\n          <nav class=\"modal-nav clr-wizard-stepnav-wrapper\">\n              <h3 class=\"clr-wizard-title\"><ng-content select=\"clr-wizard-title\"></ng-content></h3>\n              <clr-wizard-stepnav></clr-wizard-stepnav>\n          </nav>\n\n          <h3 class=\"modal-title\">\n              <span class=\"modal-title-text\">\n                  <ng-template [ngTemplateOutlet]=\"navService.currentPageTitle\"></ng-template>\n              </span>\n\n              <div class=\"modal-header-actions-wrapper\" *ngIf=\"headerActionService.displayHeaderActionsWrapper\">\n                  <div *ngIf=\"headerActionService.showWizardHeaderActions\">\n                      <ng-content select=\"clr-wizard-header-action\"></ng-content>\n                  </div>\n                  <div *ngIf=\"headerActionService.currentPageHasHeaderActions\">\n                      <ng-template [ngTemplateOutlet]=\"navService.currentPage.headerActions\"></ng-template>\n                  </div>\n              </div>\n          </h3>\n\n          <div class=\"modal-body\">\n              <main clr-wizard-pages-wrapper class=\"clr-wizard-content\">\n                  <ng-content></ng-content>\n              </main>\n          </div>\n          <div class=\"modal-footer clr-wizard-footer\">\n              <div class=\"clr-wizard-footer-buttons\">\n                  <div *ngIf=\"navService.currentPage && !navService.currentPage.hasButtons\"\n                      class=\"clr-wizard-footer-buttons-wrapper\">\n                      <ng-content select=\"clr-wizard-button\"></ng-content>\n                  </div>\n                  <div *ngIf=\"navService.currentPage && navService.currentPage.hasButtons\"\n                      class=\"clr-wizard-footer-buttons-wrapper\">\n                      <ng-template [ngTemplateOutlet]=\"navService.currentPage.buttons\"></ng-template>\n                  </div>\n              </div>\n          </div>\n      </clr-modal>\n    ",
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
Wizard.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
    { type: ButtonHubService, },
    { type: HeaderActionService, },
    { type: core.ElementRef, },
    { type: core.IterableDiffers, },
]; };
Wizard.propDecorators = {
    'size': [{ type: core.Input, args: ["clrWizardSize",] },],
    'showGhostPages': [{ type: core.Input, args: ["clrWizardShowGhostPages",] },],
    'forceForward': [{ type: core.Input, args: ["clrWizardForceForwardNavigation",] },],
    'closable': [{ type: core.Input, args: ["clrWizardClosable",] },],
    'clrWizardOpen': [{ type: core.Input, args: ["clrWizardOpen",] },],
    '_openChanged': [{ type: core.Output, args: ["clrWizardOpenChange",] },],
    'onCancel': [{ type: core.Output, args: ["clrWizardOnCancel",] },],
    'wizardFinished': [{ type: core.Output, args: ["clrWizardOnFinish",] },],
    'onReset': [{ type: core.Output, args: ["clrWizardOnReset",] },],
    'pages': [{ type: core.ContentChildren, args: [WizardPage,] },],
    'headerActions': [{ type: core.ContentChildren, args: [WizardHeaderAction,] },],
    'currentPageChanged': [{ type: core.Output, args: ["clrWizardCurrentPageChanged",] },],
    'onMoveNext': [{ type: core.Output, args: ["clrWizardOnNext",] },],
    'onMovePrevious': [{ type: core.Output, args: ["clrWizardOnPrevious",] },],
    'stopNext': [{ type: core.Input, args: ["clrWizardPreventDefaultNext",] },],
    'stopCancel': [{ type: core.Input, args: ["clrWizardPreventDefaultCancel",] },],
    'stopNavigation': [{ type: core.Input, args: ["clrWizardPreventNavigation",] },],
    'disableStepnav': [{ type: core.Input, args: ["clrWizardDisableStepnav",] },],
    '_stopModalAnimations': [{ type: core.Input, args: ["clrWizardPreventModalAnimation",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var DEFAULT_BUTTON_TYPES = {
    cancel: "cancel",
    previous: "previous",
    next: "next",
    finish: "finish",
    danger: "danger"
};
var CUSTOM_BUTTON_TYPES = {
    cancel: "custom-cancel",
    previous: "custom-previous",
    next: "custom-next",
    finish: "custom-finish",
    danger: "custom-danger"
};
var WizardButton = (function () {
    /**
     * @param {?} navService
     * @param {?} buttonService
     */
    function WizardButton(navService, buttonService) {
        this.navService = navService;
        this.buttonService = buttonService;
        this.type = "";
        this.disabled = false;
        this.hidden = false;
        // EventEmitter which is emitted when a button is clicked.
        this.wasClicked = new core.EventEmitter(false);
    }
    /**
     * @param {?=} valueToCheck
     * @param {?=} typeToLookUp
     * @return {?}
     */
    WizardButton.prototype.checkDefaultAndCustomType = function (valueToCheck, typeToLookUp) {
        if (valueToCheck === void 0) { valueToCheck = ""; }
        if (DEFAULT_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        if (CUSTOM_BUTTON_TYPES[typeToLookUp] === valueToCheck) {
            return true;
        }
        return false;
    };
    Object.defineProperty(WizardButton.prototype, "isCancel", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkDefaultAndCustomType(this.type, "cancel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isNext", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkDefaultAndCustomType(this.type, "next");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isPrevious", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkDefaultAndCustomType(this.type, "previous");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isFinish", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkDefaultAndCustomType(this.type, "finish");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isDanger", {
        /**
         * @return {?}
         */
        get: function () {
            return this.checkDefaultAndCustomType(this.type, "danger");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isPrimaryAction", {
        /**
         * @return {?}
         */
        get: function () {
            return this.isNext || this.isDanger || this.isFinish;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isDisabled", {
        /**
         * @return {?}
         */
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var /** @type {?} */ disabled = true;
            var /** @type {?} */ nav = this.navService;
            var /** @type {?} */ page = this.navService.currentPage;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardButton.prototype, "isHidden", {
        /**
         * @return {?}
         */
        get: function () {
            // dealing with negatives here. cognitively easier to think of it like this...
            var /** @type {?} */ hidden = true;
            var /** @type {?} */ nav = this.navService;
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardButton.prototype.click = function () {
        if (this.isDisabled) {
            return;
        }
        this.wasClicked.emit(this.type);
        this.buttonService.buttonClicked(this.type);
    };
    return WizardButton;
}());
WizardButton.decorators = [
    { type: core.Component, args: [{
                selector: "clr-wizard-button",
                template: "\n        <button\n            type=\"button\"\n            class=\"btn clr-wizard-btn\"\n            [class.btn-link]=\"isCancel\"\n            [class.clr-wizard-btn--tertiary]=\"isCancel\"\n            [class.btn-outline]=\"isPrevious\"\n            [class.clr-wizard-btn--secondary]=\"isPrevious\"\n            [class.btn-primary]=\"isPrimaryAction\"\n            [class.clr-wizard-btn--primary]=\"isPrimaryAction\"\n            [class.btn-success]=\"isFinish\"\n            [class.btn-danger]=\"isDanger\"\n            [class.disabled]=\"isDisabled\"\n            (click)=\"click()\">\n            <ng-content></ng-content>\n        </button>\n    ",
                host: { "class": "clr-wizard-btn-wrapper", "[attr.aria-hidden]": "isHidden" },
                styles: ["[aria-hidden=\"true\"] { display: none; }"]
            },] },
];
/**
 * @nocollapse
 */
WizardButton.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: ButtonHubService, },
]; };
WizardButton.propDecorators = {
    'type': [{ type: core.Input, args: ["type",] },],
    'disabled': [{ type: core.Input, args: ["clrWizardButtonDisabled",] },],
    'hidden': [{ type: core.Input, args: ["clrWizardButtonHidden",] },],
    'wasClicked': [{ type: core.Output, args: ["clrWizardButtonClicked",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardCustomTags = (function () {
    function WizardCustomTags() {
    }
    return WizardCustomTags;
}());
// No behavior
// The only purpose is to "declare" the tag in Angular
WizardCustomTags.decorators = [
    { type: core.Directive, args: [{ selector: "clr-wizard-title, clr-wizard-pagetitle" },] },
];
/**
 * @nocollapse
 */
WizardCustomTags.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardStepnav = (function () {
    /**
     * @param {?} pageService
     */
    function WizardStepnav(pageService) {
        this.pageService = pageService;
    }
    return WizardStepnav;
}());
WizardStepnav.decorators = [
    { type: core.Component, args: [{
                selector: "clr-wizard-stepnav",
                template: "\n        <ol class=\"clr-wizard-stepnav-list\" role=\"tablist\">\n            <li *ngFor=\"let page of pageService.pages\" clr-wizard-stepnav-item \n            [page]=\"page\" class=\"clr-wizard-stepnav-item\"></li>\n        </ol>\n    ",
                host: { "class": "clr-wizard-stepnav" }
            },] },
];
/**
 * @nocollapse
 */
WizardStepnav.ctorParameters = function () { return [
    { type: PageCollectionService, },
]; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var WizardStepnavItem = (function () {
    /**
     * @param {?} navService
     * @param {?} pageCollection
     */
    function WizardStepnavItem(navService, pageCollection) {
        this.navService = navService;
        this.pageCollection = pageCollection;
    }
    /**
     * @return {?}
     */
    WizardStepnavItem.prototype.pageGuard = function () {
        if (!this.page) {
            throw new Error("Wizard stepnav item is not associated with a wizard page.");
        }
    };
    Object.defineProperty(WizardStepnavItem.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            this.pageGuard();
            return this.pageCollection.getStepItemIdForPage(this.page);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepnavItem.prototype, "isDisabled", {
        /**
         * @return {?}
         */
        get: function () {
            this.pageGuard();
            return this.page.disabled || this.navService.wizardStopNavigation || this.navService.wizardDisableStepnav;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepnavItem.prototype, "isCurrent", {
        /**
         * @return {?}
         */
        get: function () {
            this.pageGuard();
            return this.page.current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepnavItem.prototype, "isComplete", {
        /**
         * @return {?}
         */
        get: function () {
            this.pageGuard();
            return this.page.completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WizardStepnavItem.prototype, "canNavigate", {
        /**
         * @return {?}
         */
        get: function () {
            this.pageGuard();
            return this.pageCollection.previousPageIsCompleted(this.page);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardStepnavItem.prototype.click = function () {
        this.pageGuard();
        // if we click on our own stepnav or a disabled stepnav, we don't want to do anything
        if (this.isDisabled || this.isCurrent) {
            return;
        }
        this.navService.goTo(this.page);
    };
    return WizardStepnavItem;
}());
WizardStepnavItem.decorators = [
    { type: core.Component, args: [{
                selector: "[clr-wizard-stepnav-item]",
                template: "\n        <button type=\"button\" class=\"btn btn-link clr-wizard-stepnav-link\" (click)=\"click()\">\n            <ng-template [ngTemplateOutlet]=\"page.navTitle\"></ng-template>\n        </button>\n    ",
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
WizardStepnavItem.ctorParameters = function () { return [
    { type: WizardNavigationService, },
    { type: PageCollectionService, },
]; };
WizardStepnavItem.propDecorators = {
    'page': [{ type: core.Input, args: ["page",] },],
};
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
// directives
var WIZARD_DIRECTIVES = [
    Wizard, WizardPage, WizardStepnav, WizardStepnavItem, WizardButton, WizardHeaderAction, WizardCustomTags,
    WizardPageTitleDirective, WizardPageNavTitleDirective, WizardPageButtonsDirective, WizardPageHeaderActionsDirective
];
/**
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClrWizardModule = (function () {
    function ClrWizardModule() {
    }
    return ClrWizardModule;
}());
ClrWizardModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, ClrModalModule, ClrAlertModule],
                declarations: [WIZARD_DIRECTIVES],
                exports: [WIZARD_DIRECTIVES]
            },] },
];
/**
 * @nocollapse
 */
ClrWizardModule.ctorParameters = function () { return []; };
/*
 * Copyright (c) 2016-2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var ClarityModule = (function () {
    function ClarityModule() {
    }
    /**
     * @deprecated
     * @return {?}
     */
    ClarityModule.forRoot = function () {
        return { ngModule: ClarityModule, providers: [] };
    };
    /**
     * @deprecated
     * @return {?}
     */
    ClarityModule.forChild = function () {
        return { ngModule: ClarityModule, providers: [] };
    };
    return ClarityModule;
}());
ClarityModule.decorators = [
    { type: core.NgModule, args: [{
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
ClarityModule.ctorParameters = function () { return []; };
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
        animations.state("true", animations.style({ "height": 0, "overflow-y": "hidden" })),
        animations.transition("true => false", [animations.animate("0.2s ease-in-out", animations.style({ "height": "*", "overflow-y": "hidden" }))]),
        animations.transition("false => true", [animations.style({ "height": "*", "overflow-y": "hidden" }), animations.animate("0.2s ease-in-out")])
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
function fade(opacity) {
    if (opacity === void 0) { opacity = 1; }
    return [
        animations.transition("void => *", [animations.style({ opacity: 0 }), animations.animate("0.2s ease-in-out", animations.style({ opacity: opacity }))]),
        animations.transition("* => void", [animations.animate("0.2s ease-in-out", animations.style({ opacity: 0 }))])
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
    var /** @type {?} */ transform = null;
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
        animations.transition("void => *", [animations.style({ opacity: 0, transform: transform }), animations.animate("0.2s ease-in-out")]),
        animations.transition("* => void", [animations.animate("0.2s ease-in-out", animations.style({ opacity: 0, transform: transform }))])
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
    var /** @type {?} */ transform = null;
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
        animations.transition("void => *", [animations.style({ transform: transform }), animations.animate("0.2s ease-in-out")]),
        animations.transition("* => void", [animations.animate("0.2s ease-in-out", animations.style({ transform: transform }))])
    ];
}

exports.ÇlrFocusTrapTracker = FocusTrapTracker;
exports.ClarityModule = ClarityModule;
exports.ClrButtonModule = ClrButtonModule;
exports.ClrButtonGroupModule = ClrButtonGroupModule;
exports.ClrLoadingButtonModule = ClrLoadingButtonModule;
exports.ClrSyntaxHighlightModule = ClrSyntaxHighlightModule;
exports.ClrDataModule = ClrDataModule;
exports.ClrDatagridModule = ClrDatagridModule;
exports.ClrStackViewModule = ClrStackViewModule;
exports.ClrTreeViewModule = ClrTreeViewModule;
exports.ClrEmphasisModule = ClrEmphasisModule;
exports.ClrAlertModule = ClrAlertModule;
exports.ClrFormsModule = ClrFormsModule;
exports.ClrIconModule = ClrIconModule;
exports.ClrLayoutModule = ClrLayoutModule;
exports.ClrMainContainerModule = ClrMainContainerModule;
exports.ClrNavigationModule = ClrNavigationModule;
exports.ClrTabsModule = ClrTabsModule;
exports.ClrModalModule = ClrModalModule;
exports.ClrPopoverModule = ClrPopoverModule;
exports.ClrDropdownModule = ClrDropdownModule;
exports.ClrTooltipModule = ClrTooltipModule;
exports.ClrWizardModule = ClrWizardModule;
exports.ClrLoadingModule = ClrLoadingModule;
exports.ALERT_DIRECTIVES = ALERT_DIRECTIVES;
exports.Alert = Alert;
exports.AlertItem = AlertItem;
exports.BUTTON_GROUP_DIRECTIVES = BUTTON_GROUP_DIRECTIVES;
exports.LOADING_BUTTON_DIRECTIVES = LOADING_BUTTON_DIRECTIVES;
exports.CHECKBOX_DIRECTIVES = CHECKBOX_DIRECTIVES;
exports.Checkbox = Checkbox;
exports.CODE_HIGHLIGHT_DIRECTIVES = CODE_HIGHLIGHT_DIRECTIVES;
exports.CodeHighlight = CodeHighlight;
exports.DROPDOWN_DIRECTIVES = DROPDOWN_DIRECTIVES;
exports.Dropdown = Dropdown;
exports.DropdownMenu = DropdownMenu;
exports.DropdownTrigger = DropdownTrigger;
exports.DropdownItem = DropdownItem;
exports.menuPositions = menuPositions;
exports.DATAGRID_DIRECTIVES = DATAGRID_DIRECTIVES;
exports.Datagrid = Datagrid;
exports.DatagridActionBar = DatagridActionBar;
exports.DatagridActionOverflow = DatagridActionOverflow;
exports.DatagridColumn = DatagridColumn;
exports.DatagridColumnToggle = DatagridColumnToggle;
exports.DatagridHideableColumnDirective = DatagridHideableColumnDirective;
exports.DatagridFilter = DatagridFilter;
exports.DatagridItems = DatagridItems;
exports.DatagridRow = DatagridRow;
exports.DatagridRowDetail = DatagridRowDetail;
exports.DatagridCell = DatagridCell;
exports.DatagridFooter = DatagridFooter;
exports.DatagridPagination = DatagridPagination;
exports.DatagridPlaceholder = DatagridPlaceholder;
exports.SortOrder = SortOrder;
exports.DatagridStringFilter = DatagridStringFilter;
exports.DatagridPropertyStringFilter = DatagridPropertyStringFilter;
exports.DatagridPropertyComparator = DatagridPropertyComparator;
exports.TREE_VIEW_DIRECTIVES = TREE_VIEW_DIRECTIVES;
exports.TreeNode = TreeNode;
exports.STACK_VIEW_DIRECTIVES = STACK_VIEW_DIRECTIVES;
exports.StackView = StackView;
exports.StackViewCustomTags = StackViewCustomTags;
exports.StackHeader = StackHeader;
exports.StackBlock = StackBlock;
exports.StackInput = StackInput;
exports.StackSelect = StackSelect;
exports.ICON_DIRECTIVES = ICON_DIRECTIVES;
exports.LAYOUT_DIRECTIVES = LAYOUT_DIRECTIVES;
exports.MainContainer = MainContainer;
exports.MODAL_DIRECTIVES = MODAL_DIRECTIVES;
exports.Modal = Modal;
exports.NAVIGATION_DIRECTIVES = NAVIGATION_DIRECTIVES;
exports.Header = Header;
exports.NavLevelDirective = NavLevelDirective;
exports.TABS_DIRECTIVES = TABS_DIRECTIVES;
exports.Tabs = Tabs;
exports.Tab = Tab;
exports.TabContent = TabContent;
exports.TabOverflowContent = TabOverflowContent;
exports.TabLinkDirective = TabLinkDirective;
exports.TOOLTIP_DIRECTIVES = TOOLTIP_DIRECTIVES;
exports.Tooltip = Tooltip;
exports.TooltipTrigger = TooltipTrigger;
exports.TooltipContent = TooltipContent;
exports.WIZARD_DIRECTIVES = WIZARD_DIRECTIVES;
exports.Wizard = Wizard;
exports.WizardPage = WizardPage;
exports.WizardStepnav = WizardStepnav;
exports.WizardStepnavItem = WizardStepnavItem;
exports.DEFAULT_BUTTON_TYPES = DEFAULT_BUTTON_TYPES;
exports.CUSTOM_BUTTON_TYPES = CUSTOM_BUTTON_TYPES;
exports.WizardButton = WizardButton;
exports.WizardHeaderAction = WizardHeaderAction;
exports.WizardCustomTags = WizardCustomTags;
exports.WizardPageTitleDirective = WizardPageTitleDirective;
exports.WizardPageNavTitleDirective = WizardPageNavTitleDirective;
exports.WizardPageButtonsDirective = WizardPageButtonsDirective;
exports.WizardPageHeaderActionsDirective = WizardPageHeaderActionsDirective;
exports.collapse = collapse;
exports.fade = fade;
exports.fadeSlide = fadeSlide;
exports.slide = slide;
exports.LOADING_DIRECTIVES = LOADING_DIRECTIVES;
exports.Loading = Loading;
exports.LoadingListener = LoadingListener;
exports.ɵcq = Button;
exports.ɵcs = ButtonGroup;
exports.ɵcp = LoadingButton;
exports.ɵcr = ButtonInGroupService;
exports.ɵct = ClrCodeModule;
exports.ɵcc = DatagridRowExpandAnimation;
exports.ɵbz = ActionableOompaLoompa;
exports.ɵbx = DatagridWillyWonka;
exports.ɵcb = ExpandableOompaLoompa;
exports.ɵbn = DatagridDetailRegisterer;
exports.ɵbj = CustomFilter;
exports.ɵbi = DragDispatcher;
exports.ɵy = FiltersProvider;
exports.ɵbe = ExpandableRowsCount;
exports.ɵbf = HideableColumnService;
exports.ɵx = Items;
exports.ɵz = Page;
exports.ɵbd = RowActionService;
exports.ɵw = Selection;
exports.ɵbb = Sort;
exports.ɵba = StateDebouncer;
exports.ɵbg = StateProvider;
exports.ɵbu = DatagridBodyRenderer;
exports.ɵbw = DatagridCellRenderer;
exports.ɵbr = DatagridColumnResizer;
exports.ɵbp = DomAdapter;
exports.ɵbt = DatagridHeadRenderer;
exports.ɵbq = DatagridHeaderRenderer;
exports.ɵbo = DatagridMainRenderer;
exports.ɵbc = DatagridRenderOrganizer;
exports.ɵbv = DatagridRowRenderer;
exports.ɵbs = DatagridTableRenderer;
exports.ɵbh = DatagridFilterRegistrar;
exports.ɵcg = StackControl;
exports.ɵch = AbstractTreeSelection;
exports.ɵcj = clrTreeSelectionProviderFactory;
exports.ɵci = TreeSelectionService;
exports.ɵs = AlertIconAndTypesService;
exports.ɵa = IconCustomTag;
exports.ɵcw = MainContainerWillyWonka;
exports.ɵcv = NavDetectionOompaLoompa;
exports.ɵcx = clrResponsiveNavigationProvider;
exports.ɵcu = ClrResponsiveNavigationService;
exports.ɵdb = AriaService;
exports.ɵde = ActiveOompaLoompa;
exports.ɵdd = TabsWillyWonka;
exports.ɵdc = TabsService;
exports.ɵdg = VERTICAL_NAV_DIRECTIVES;
exports.ɵdn = VerticalNavGroupRegistrationService;
exports.ɵdo = VerticalNavGroupService;
exports.ɵdm = VerticalNavIconService;
exports.ɵdl = VerticalNavService;
exports.ɵdi = VerticalNav;
exports.ɵdh = VerticalNavGroup;
exports.ɵdp = VerticalNavGroupChildren;
exports.ɵdk = VerticalNavIcon;
exports.ɵdj = VerticalNavLink;
exports.ɵdf = ClrVerticalNavModule;
exports.ɵco = GHOST_PAGE_ANIMATION;
exports.ɵj = AbstractPopover;
exports.ɵc = POPOVER_DIRECTIVES;
exports.ɵi = POPOVER_HOST_ANCHOR;
exports.ɵd = PopoverDirectiveOld;
exports.ɵb = ClrCommonPopoverModule;
exports.ɵh = ROOT_DROPDOWN_PROVIDER;
exports.ɵf = RootDropdownService;
exports.ɵg = clrRootDropdownFactory;
exports.ɵdr = SIGNPOST_DIRECTIVES;
exports.ɵbl = Signpost;
exports.ɵds = SignpostContent;
exports.ɵbm = SignpostTriggerDirective;
exports.ɵdq = ClrSignpostModule;
exports.ɵca = OompaLoompa;
exports.ɵby = WillyWonka;
exports.ɵk = ClrConditionalModule;
exports.ɵm = IfActiveDirective;
exports.ɵo = IF_ACTIVE_ID;
exports.ɵq = IF_ACTIVE_ID_PROVIDER;
exports.ɵr = IfActiveService;
exports.ɵp = tokenFactory;
exports.ɵn = IfOpenDirective;
exports.ɵe = IfOpenService;
exports.ɵl = CONDITIONAL_DIRECTIVES;
exports.ɵcd = ClrIfExpandModule;
exports.ɵcf = IfExpanded;
exports.ɵce = EXPAND_DIRECTIVES;
exports.ɵbk = Expand;
exports.ɵcm = FocusTrapDirective;
exports.ɵck = ClrFocusTrapModule;
exports.ɵcl = FOCUS_TRAP_DIRECTIVES;
exports.ɵu = OUSTIDE_CLICK_DIRECTIVES;
exports.ɵv = OutsideClick;
exports.ɵt = ClrOutsideClickModule;
exports.ɵcn = ScrollingService;
exports.ɵcz = TEMPLATE_REF_DIRECTIVES;
exports.ɵda = TemplateRefContainer;
exports.ɵcy = ClrTemplateRefModule;
exports.ɵdv = ButtonHubService;
exports.ɵdw = HeaderActionService;
exports.ɵdu = PageCollectionService;
exports.ɵdt = WizardNavigationService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=clarity-angular.umd.js.map
