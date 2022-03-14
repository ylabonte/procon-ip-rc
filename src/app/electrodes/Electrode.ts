import { GetStateDataObject } from 'procon-ip/lib/get-state-data-object';
import { GetStateDataSysInfo } from 'procon-ip/lib/get-state-data-sys-info';

export interface ICanister {
  _sysInfo: GetStateDataSysInfo;
  _data: GetStateDataObject;
  _hidden: boolean;
}

export class Electrode {
  private _sysInfo: GetStateDataSysInfo;
  private _data: GetStateDataObject;
  private _hidden: boolean;

  constructor(
    data: GetStateDataObject,
    sysInfo: GetStateDataSysInfo,
    isHidden: boolean = false,
  ) {
    this._data = data;
    this._sysInfo = sysInfo;
    this._hidden = isHidden;
  }

  static fromObject(object: ICanister) {
    return new Electrode(object._data, object._sysInfo, object._hidden);
  }

  get data(): GetStateDataObject {
    return this._data;
  }

  isHidden(): boolean {
    return this._hidden;
  }

  hide() {
    this._hidden = true;
  }

  show() {
    this._hidden = false;
  }
}
