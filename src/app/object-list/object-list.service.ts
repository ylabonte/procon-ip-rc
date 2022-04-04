import { Injectable, Type } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SettingsService } from '../settings/settings.service';
import { GetStateService } from '../get-state.service';
import { IListItem, IListObject, ListObject } from './list-object';
import { GetStateCategory } from 'procon-ip';
import { SensorComponent } from '../temperatures/sensor/sensor.component';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  protected readonly STORAGE_KEY = "ListObjects";
  protected readonly categories: {
    id: GetStateCategory,
    component: Type<any>,
  }[] = [
    { id: GetStateCategory.ANALOG, component: null },
    { id: GetStateCategory.CANISTER, component: null },
    { id: GetStateCategory.CANISTER_CONSUMPTION, component: null},
    { id: GetStateCategory.DIGITAL_INPUT, component: null },
    { id: GetStateCategory.ELECTRODES, component: null },
    { id: GetStateCategory.TEMPERATURES, component: SensorComponent },
  ];

  protected _getStateService: GetStateService;
  protected _listItems: {
    [key: string]: IListItem[];
  }
  private _callbackIdx: number;

  constructor(
    private _storage: StorageMap,
    private _settings: SettingsService,
    private _getState: GetStateService,
  ) {
    this._listItems = {};
    this.forCategories(category => {
      this._listItems[category] = [];
      this._storage.get(this.getStorageKey(category)).subscribe((listItems: IListObject[]) => {
        if (listItems)
          this.load(category, listItems);
        else
          this.save(category);
      });
    });

    this._callbackIdx = this._getState.registerCallback(data => {
      this.categories.forEach(category => {
        data.getDataObjectsByCategory(category.id).forEach(obj => {
          const existingObject = this._listItems[category.id].filter(r => r.dataObject.id === obj.id).shift();

          if (existingObject) {
            if (existingObject.update(obj)) {
              const index = this._listItems[category.id].indexOf(existingObject);
              this._listItems[category.id][index] = existingObject.clone();
            }
          } else {
            const listObject = new ListObject();
            listObject.init(category.component, obj, obj.label === 'n.a.');
            this._listItems[category.id].push(listObject);
          }
        });
        this.save(category.id);
      });
    });
  }

  forCategories(func: (category: GetStateCategory) => any) {
    this.categories.forEach(category => func(category.id));
  }

  getStorageKey(category: GetStateCategory): string {
    return category + this.STORAGE_KEY;
  }

  getComponent(category: GetStateCategory): Type<any> {
    const categoryHelper = this.categories.filter(c => c.id === category).pop();
    if (!categoryHelper)
      return null;
    return categoryHelper.component;
  }

  getListObjects(category: GetStateCategory): IListItem[] {
    return this._listItems[category] ?? [];
  }

  moveItemInArray(category: GetStateCategory, previousIndex: number, currentIndex: number) {
    moveItemInArray(this._listItems[category], previousIndex, currentIndex);
    this.save(category);
  }

  private save(category?: GetStateCategory) {
    if (category)
      this._storage.set(category + this.STORAGE_KEY, this._listItems[category].map(l => l.asObject())).subscribe(() => {});
    else
      this.forCategories(category => {
        this._storage.set(category + this.STORAGE_KEY, this._listItems[category].map(l => l.asObject())).subscribe(() => {});
      });
  }

  private load(category: GetStateCategory, listItems: IListObject[]) {
    this._listItems[category] = [];
    listItems.forEach(obj => {
      const listItem = new ListObject();
      listItem.init(this.getComponent(category), obj);
      this._listItems[category].push(listItem);
    });
  }
}
