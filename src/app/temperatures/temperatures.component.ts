import { Component, Input, OnInit, Optional } from '@angular/core';
import { GetStateCategory } from 'procon-ip';
import { ToolbarService, IAction } from '../toolbar.service';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent implements OnInit {
  category = GetStateCategory.TEMPERATURES;

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
      icon: 'visibility_on',
      active: true,
    };
  }

  ngOnInit() {
    this._toolbar.setTitle('Temperature Sensors');
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
