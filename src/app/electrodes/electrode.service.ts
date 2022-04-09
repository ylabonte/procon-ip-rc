import { Injectable } from '@angular/core';
import { ICategoryComponentMap, ObjectListService } from '../object-list/object-list.service';
import { GetStateCategory, GetStateDataSysInfo } from 'procon-ip';
import { IListObject } from '../object-list/list-object';
import { ElectrodeComponent } from './electrode/electrode.component';
import { Electrode } from './electrode/electrode';

@Injectable({
  providedIn: 'root'
})
export class ElectrodeService extends ObjectListService {
  protected categories: ICategoryComponentMap[] = [
    { id: GetStateCategory.ELECTRODES, component: ElectrodeComponent },
  ];

  protected _sysInfo: GetStateDataSysInfo = null;

  protected _listItems = {
    electrodes: []
  };

  protected init() {
    this._storage.get(this.getStorageKey(GetStateCategory.ELECTRODES)).subscribe((listItems: IListObject[]) => {
      if (listItems)
        this.load(GetStateCategory.ELECTRODES, listItems);
      else
        this.save();
      this.onStorageLoadComplete();
    });
  }

  getListObjects(category = GetStateCategory.ELECTRODES): Electrode[] {
    return this._listItems[category];
  }

  protected onStorageLoadComplete() {
    this._callbackIdx = this._getState.registerCallback((data) => {
      this._sysInfo = data.sysInfo;
      this.categories.forEach(category => {
        data.getDataObjectsByCategory(category.id).forEach(obj => {
          const existingObject = this._listItems[category.id].filter(r => r.dataObject.id === obj.id).shift();
          if (existingObject) {
            if (existingObject.update(obj)) {
              const index = this._listItems[category.id].indexOf(existingObject);
              this._listItems[category.id][index] = existingObject.clone();
            }
          } else {
            const electrode = new Electrode();
            electrode.init(data.sysInfo, obj, false);
            this._listItems[category.id].push(electrode);
          }
        });
        super.save(category.id);
      });
    });
  }

  protected save(category = GetStateCategory.ELECTRODES) {
      this._storage.set(category + this.STORAGE_KEY, this._listItems[category].map(l => l.asObject())).subscribe(() => {});
  }

  protected load(category: GetStateCategory, electrodes: IListObject[]) {
    electrodes.forEach(obj => {
      const electrode = new Electrode();
      electrode.init(this._sysInfo, obj);
      this._listItems[category].push(electrode);
    });
  }
}
