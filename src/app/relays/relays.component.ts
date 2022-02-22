import { Component, ElementRef, OnInit } from '@angular/core';
import { RelayService } from './relay.service';
import { Relay } from './relay';
import { MatListItem } from '@angular/material/list';
import {
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
} from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-relays',
  templateUrl: './relays.component.html',
  styleUrls: ['./relays.component.scss']
})
export class RelaysComponent implements OnInit {

  relays: Relay[];
  editMode = false;

  private _dragOffset: {x: number, y: number} = null;

  constructor(
    private _storage: StorageMap,
    public relayService: RelayService,
  ) {
  }

  ngOnInit(): void {
    this.relays = this.relayService.getRelays();
  }

  listItemHover(item: MatListItem) {
    this.setElevationLevel(item, 6);
  }

  listItemReset(item: MatListItem) {
    this.setElevationLevel(item, 2);
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
    const preview = new ElementRef<HTMLElement>(document.getElementById(`relayPreview${relay.getObjectId()}`));
    if (this._dragOffset === null) {
      const placeholder = new ElementRef<HTMLElement>(document.getElementById(`relayPlaceholder${relay.getObjectId()}`));
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
