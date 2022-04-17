import { Component, ElementRef, Input, Optional } from '@angular/core';
import { RelaysService } from './relays.service';
import { Relay } from './relay/relay';
import { MatListItem } from '@angular/material/list';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
} from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-relay-list',
  templateUrl: '../object-list/object-list.component.html',
  styleUrls: ['../object-list/object-list.component.scss']
})
export class RelayListComponent {
  @Input() @Optional() showHiddenItems = false;
  @Input() @Optional() editMode = false;

  private _dragOffset: {x: number, y: number} = null;

  constructor(
    private _storage: StorageMap,
    public relayService: RelaysService,
  ) { }

  getObjects(): Relay[] {
    return this.relayService.getRelays();
  }

  listItemHover(item: MatListItem) {
    // this.setElevationLevel(item, 2);
  }

  listItemReset(item: MatListItem) {
    // this.setElevationLevel(item, 0);
  }

  listItemDrop(event: CdkDragDrop<Relay[]>) {
    this.relayService.moveItemInArray(event.previousIndex, event.currentIndex);
  }

  private setElevationLevel(item: MatListItem, zLevel: number) {
    const classList = item._getHostElement().classList;

    classList.forEach(className => {
      if (className.startsWith('mat-elevation-z'))
        classList.remove(className);
    });

    classList.add(`mat-elevation-z${zLevel}`);
  }

  listItemMoved(event: CdkDragMove<Relay>) {
    const relay = event.source.data;
    const preview = new ElementRef<HTMLElement>(document.getElementById(`listObjectPreview${relay.dataObject.id}`));
    if (this._dragOffset === null) {
      const placeholder = new ElementRef<HTMLElement>(document.getElementById(`listObjectPlaceholder${relay.dataObject.id}`));
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

  dragRelease(event: CdkDragRelease<Relay>) {
    this._dragOffset = null;
  }
}
