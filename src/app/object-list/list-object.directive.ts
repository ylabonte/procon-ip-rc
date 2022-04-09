import { Component, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IListItem } from './list-object';

export interface IListObjectComponent {
  listItem: IListItem;
}

@Component({
  selector: 'app-list-object-generic',
  template: '<div>{{listItem.getLabel()}}: {{listItem.dataObject.displayValue}}</div>',
})
export class ListObjectComponent implements IListObjectComponent {
  @Input() listItem: IListItem;
}

@Directive({
  selector: '[appListObject]'
})
export class ListObjectDirective implements OnInit {
  @Input() listItem: IListItem;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.clear();
    const component = this.viewContainerRef.createComponent<IListObjectComponent>(this.listItem.component);
    component.instance.listItem = this.listItem;
  }
}
