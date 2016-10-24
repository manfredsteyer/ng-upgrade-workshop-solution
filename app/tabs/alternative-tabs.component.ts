import { forwardRef, Component, ContentChildren, AfterViewInit, QueryList, Input } from '@angular/core';

@Component({
    selector: 'tabs',
    template: `
        <div style="background-color:lightblue; padding:20px;">
            <h2>Migrated Tabs Component</h2>
            <span *ngFor="let tab of tabs.toArray()" style="padding-right:20px;">
                <a style="cursor:pointer" (click)="activate(tab)">{{tab.title}}</a>
            </span>
            
            <ng-content></ng-content>
            
        </div>
    `
})
export class MigratedTabsComponent implements AfterViewInit {

    @ContentChildren(forwardRef(() => MigratedTabComponent))
    tabs: QueryList<MigratedTabComponent>;

    // Use this Getter to get an array with all TabComponents
    get tabsArray() {
        return this.tabs.toArray();
    }

    constructor() {
        console.debug('ctor');
    }
    ngAfterViewInit() {
        if (this.tabsArray.length == 0) return;
        this.activate(this.tabsArray[0]);
    }

    public activate(active: MigratedTabComponent) {
        for(let tab of this.tabsArray) {
            tab.visible = (tab == active);
        }
    }
}

@Component({
    selector: 'tab',
    template: `
        <div *ngIf="visible">
            <h2>{{title}}</h2>
            <ng-content></ng-content>
        </div>
    `
})
export class MigratedTabComponent {
    @Input() public visible: boolean = false;
    @Input() public title: string;

    /*
    constructor(tabs: MigratedTabsComponent) {
        console.debug('tabs', tabs);
    }
    */
}
