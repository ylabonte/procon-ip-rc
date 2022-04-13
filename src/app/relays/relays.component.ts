import { Component, Input, OnInit, Optional } from '@angular/core';
import { ToolbarService, IAction } from '../toolbar.service';

@Component({
  selector: 'app-relays',
  templateUrl: './relays.component.html',
  styleUrls: ['./relays.component.scss']
})
export class RelaysComponent implements OnInit {
  @Input() @Optional() editMode = false;
  @Input() @Optional() showHiddenItems = true;
  private readonly _editMode: IAction;
  private readonly _showHiddenItems: IAction;

  constructor(private _toolbar: ToolbarService) {
    this._editMode = {
      id: 'editMode',
      caption: 'Edit',
      click: () => this.toggleEditMode(),
      icon: 'edit',
      active: false,
    };
    this._showHiddenItems = {
      caption: 'Show hidden relays',
      click: () => this.toggleShowHiddenItems(),
      icon: 'visibility_on',
      active: true,
    };
  }

  ngOnInit() {
    this._toolbar.setTitle('Relays');
    this._toolbar.addAction(this._showHiddenItems);
    this._toolbar.addAction(this._editMode);
  }

  toggleShowHiddenItems() {
    this._showHiddenItems.active = this.showHiddenItems = !this.showHiddenItems;
  }

  toggleEditMode() {
    this._editMode.active = this.editMode = !this.editMode;
  }
}
