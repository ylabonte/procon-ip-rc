import { Component, Input, OnInit, Optional } from '@angular/core';
import { GetStateCategory } from 'procon-ip';
import { ActionsService, IAction } from '../actions.service';

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
    private _actionsService: ActionsService,
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
    this._actionsService.add(this._showHiddenItems);
    this._actionsService.add(this._editMode);
  }

  toggleShowHiddenItems() {
    this._showHiddenItems.active = this.showHiddenItems = !this.showHiddenItems;
  }

  toggleEditMode() {
    this._editMode.active = this.editMode = !this.editMode;
  }
}
