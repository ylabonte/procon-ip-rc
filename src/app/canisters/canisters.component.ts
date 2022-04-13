import { Component, Input, OnInit, Optional } from '@angular/core';
import { ToolbarService, IAction } from '../toolbar.service';

@Component({
  selector: 'app-canisters',
  templateUrl: './canisters.component.html',
  styleUrls: ['./canisters.component.scss']
})
export class CanistersComponent implements OnInit {
  @Input() @Optional() editMode = false;
  @Input() @Optional() showHiddenItems = true;
  private readonly _editMode: IAction;
  private readonly _showHiddenItems: IAction;

  constructor(
    private _toolbar: ToolbarService,
  ) {
    this._editMode = {
      caption: 'Edit',
      click: () => this.toggleEditMode(),
      icon: 'edit',
      active: false,
    };
    this._showHiddenItems = {
      caption: 'Show hidden relays',
      click: () => this.toggleShowHiddenItems(),
      icon: 'disabled_visible',
      active: true,
    };
  }

  ngOnInit() {
    this._toolbar.setTitle('Canisters');
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
