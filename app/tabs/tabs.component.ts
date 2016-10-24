import * as angular from 'angular';

import { Component, AfterContentInit, OnInit, Input} from '@angular/core';

@Component({
    selector: 'tabs',
    template: `
        <div style="background-color:lightblue; padding:20px;">
            <span *ngFor="let tab of tabs" style="padding-right:20px;">
                <a style="cursor:pointer" (click)="activate(tab)">{{tab.title}}</a>
            </span>

            <ng-content></ng-content>
        </div>

    `
})
export class TabsComponent implements AfterContentInit {

    private tabs: Array<TabComponent> = [];

    public register(tab: TabComponent) {
        this.tabs.push(tab);
    }

    public activate(active: TabComponent) {
        for(let tab of this.tabs) {
            tab.visible = (tab == active);
        }
    }

    ngAfterContentInit() {
        if (this.tabs.length == 0) return;
        this.activate(this.tabs[0]);
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
export class TabComponent implements OnInit {
    public visible: boolean = false;
    @Input() public title: string;

    constructor(public tabs: TabsComponent) {
    }

    ngOnInit() {
        this.tabs.register(this);
    }
}
