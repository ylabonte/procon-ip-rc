import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
} from '@angular/cdk/drag-drop';
import { IListItem } from './list-object';
import { ObjectListService } from './object-list.service';
import { GetStateCategory } from 'procon-ip';
import { ListObjectDirective } from './list-object.directive';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {

  @Input() category: GetStateCategory;
  @Input() listObjects: IListItem[];
  @Input() listObjectIcon: string;
  @Input() showHiddenItems: boolean;

  @ViewChild(ListObjectDirective, {static: true}) listObject!: ListObjectDirective;

  getObjects: () => IListItem[];
  editMode = false;

  private _dragOffset: {x: number, y: number} = null;

  constructor(public objectListService: ObjectListService) { }

  ngOnInit() {
    if (this.listObjects)
      this.getObjects = () => this.listObjects;
    else if (this.category)
      this.getObjects = () => this.objectListService.getListObjects(this.category);
    else
      throw new Error("You have to set either `listObjects` or `category` input on an `<app-object-list>`-element.");
  }

  listItemHover(item: MatListItem) {
    this.setElevationLevel(item, 4);
  }

  listItemReset(item: MatListItem) {
    this.setElevationLevel(item, 2);
  }

  listItemDrop(event: CdkDragDrop<IListItem[]>) {
    this.objectListService.moveItemInArray(this.category, event.previousIndex, event.currentIndex);
  }

  private setElevationLevel(item: MatListItem, zLevel: number) {
    const classList = item._getHostElement().classList;

    classList.forEach(className => {
      if (className.startsWith('mat-elevation-z'))
        classList.remove(className);
    });

    classList.add(`mat-elevation-z${zLevel}`);
  }

  listItemMoved(event: CdkDragMove<IListItem>) {
    const obj = event.source.data;
    const preview = new ElementRef<HTMLElement>(document.getElementById(`listObjectPreview${obj.dataObject.id}`));
    if (this._dragOffset === null) {
      const placeholder = new ElementRef<HTMLElement>(document.getElementById(`listObjectPlaceholder${obj.dataObject.id}`));
      const container = placeholder.nativeElement.getBoundingClientRect();

      this._dragOffset = {
        x: event.pointerPosition.x - container.x,
        y: event.pointerPosition.y - container.y,
      };
    }

    const xPos = event.pointerPosition.x - this._dragOffset.x;
    const yPos = event.pointerPosition.y - this._dragOffset.y;

    if (preview?.nativeElement) {
      preview.nativeElement.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  }

  dragRelease(event: CdkDragRelease<IListItem>) {
    this._dragOffset = null;
  }
}
