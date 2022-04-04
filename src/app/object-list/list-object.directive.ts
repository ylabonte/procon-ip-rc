import { Component, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { IListItem } from './list-object';

export interface IListObjectComponentState {
  editMode: boolean;
}

export interface IListObjectComponent {
  listItem: IListItem;
  state: IListObjectComponentState;
}

@Component({
  selector: 'app-list-object-generic',
  template: '<div>{{listItem.getLabel()}}: {{listItem.dataObject.displayValue}}</div>',
})
export class ListObjectComponent implements IListObjectComponent {
  @Input() listItem: IListItem;
  @Input() state: IListObjectComponentState;
}

@Directive({
  selector: '[appListObject]'
})
export class ListObjectDirective implements OnInit {
  @Input() listItem: IListItem;
  @Input() state: IListObjectComponentState;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.clear();
    const component = this.viewContainerRef.createComponent<IListObjectComponent>(this.listItem.component);
    component.instance.listItem = this.listItem;
    component.instance.state = this.state;
  }
}
