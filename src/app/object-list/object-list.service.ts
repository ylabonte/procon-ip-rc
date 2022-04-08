import { Injectable, Type } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SettingsService } from '../settings/settings.service';
import { GetStateService } from '../get-state.service';
import { IListItem, IListObject, ListObject } from './list-object';
import { GetStateCategory, GetStateDataObject, GetStateDataSysInfo } from 'procon-ip';
import { SensorComponent } from '../temperatures/sensor/sensor.component';
import { CanisterComponent } from '../canisters/canister/canister.component';
import { Canister } from '../canisters/canister/canister';
import { ListObjectComponent } from './list-object.directive';

export interface ICategoryComponentMap {
  id: GetStateCategory,
  component: Type<ListObjectComponent>,
  entity?: Type<IListItem>,
}

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  protected readonly STORAGE_KEY = "ListObjects";
  protected categories: ICategoryComponentMap[] = [
    { id: GetStateCategory.ANALOG, component: null },
    { id: GetStateCategory.CANISTER, component: CanisterComponent },
    { id: GetStateCategory.CANISTER_CONSUMPTION, component: CanisterComponent },
    { id: GetStateCategory.DIGITAL_INPUT, component: null },
    { id: GetStateCategory.TEMPERATURES, component: SensorComponent, entity: Canister },
  ];

  protected _getStateService: GetStateService;
  protected _listItems: {
    [key: string]: IListItem[];
  }
  protected _callbackIdx: number;
  protected _storageLoadCounter = 0;

  constructor(
    protected _storage: StorageMap,
    protected _settings: SettingsService,
    protected _getState: GetStateService,
  ) {
    this.init();
  }

  protected init() {
    this._listItems = {};
    this.forCategories(category => {
      this._listItems[category] = [];
      this._storage.get(this.getStorageKey(category)).subscribe((listItems: IListObject[]) => {
        if (listItems)
          this.load(category, listItems);
        else
          this.save(category);
        if (++this._storageLoadCounter >= this.categories.length)
          this.onStorageLoadComplete();
      });
    });
  }

  protected onStorageLoadComplete() {
    this._callbackIdx = this._getState.registerCallback((data) => {
      this.categories.forEach(category => {
        data.getDataObjectsByCategory(category.id).forEach(obj => {
          const existingObject = this._listItems[category.id].filter(r => r.dataObject.id === obj.id).shift();
          if (existingObject) {
            if (existingObject instanceof Canister) {
              if (existingObject.update(obj, data.objects[obj.id+3])) {
                const index = this._listItems[category.id].indexOf(existingObject);
                this._listItems[category.id][index] = existingObject.clone();
              }
            } else {
              if (existingObject.update(obj)) {
                const index = this._listItems[category.id].indexOf(existingObject);
                this._listItems[category.id][index] = existingObject.clone();
              }
            }
          } else {
            if (category.id === GetStateCategory.CANISTER) {
              const canister = new Canister();
              canister.init(CanisterComponent, obj, this.isDefaultHidden(obj, data.sysInfo), data.objects[obj.id+3]);
              this._listItems[category.id].push(canister);
            } else {
              const listObject = new ListObject();
              listObject.init(category.component, obj, this.isDefaultHidden(obj, data.sysInfo));
              this._listItems[category.id].push(listObject);
            }
          }
        });
        this.save(category.id);
      });
    });
  }

  protected isDefaultHidden(obj: GetStateDataObject, sysInfo: GetStateDataSysInfo) {
    let hidden = obj.label === 'n.a.';

    switch (obj.id) {
      case 36: // 'Cl Rest':
      case 39: // 'Cl consumption':
        hidden = !sysInfo.isChlorineDosageEnabled();
        break;
      case 37: // 'pH- Rest':
      case 40: // 'pH- consumption':
        hidden = !sysInfo.isPhMinusDosageEnabled();
        break;
      case 38: // 'pH+ Rest':
      case 41: // 'pH+ consumption':
        hidden = !sysInfo.isPhPlusDosageEnabled();
        break;
    }

    return hidden;
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
      return ListObjectComponent;
    return categoryHelper.component;
  }

  getListObjects(category: GetStateCategory): IListItem[] {
    return this._listItems[category] ?? [];
  }

  moveItemInArray(category: GetStateCategory, previousIndex: number, currentIndex: number) {
    moveItemInArray(this._listItems[category], previousIndex, currentIndex);
    this.save(category);
  }

  protected save(category?: GetStateCategory) {
    if (category)
      this._storage.set(category + this.STORAGE_KEY, this._listItems[category].map(l => l.asObject())).subscribe(() => {});
    else
      this.forCategories(category => {
        this._storage.set(category + this.STORAGE_KEY, this._listItems[category].map(l => l.asObject())).subscribe(() => {});
      });
  }

  protected load(category: GetStateCategory, listItems: IListObject[]) {
    this._listItems[category] = [];
    listItems.forEach(obj => {
      const listItem = new ListObject();
      listItem.init(this.getComponent(category), obj);
      this._listItems[category].push(listItem);
    });
  }
}
