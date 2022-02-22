import { GetStateDataObject } from 'procon-ip/lib/get-state-data-object';
import { GetStateDataSysInfo } from 'procon-ip/lib/get-state-data-sys-info';

export interface ICanister {
  _sysInfo: GetStateDataSysInfo;
  _dataObject: GetStateDataObject;
  _hidden: boolean;
}

export class Canister {
  private _sysInfo: GetStateDataSysInfo;
  private _dataObject: GetStateDataObject;
  private _hidden: boolean;

  constructor(
    sysInfo: GetStateDataSysInfo,
    dataObject: GetStateDataObject,
  ) {
    this._sysInfo = sysInfo;
    this._dataObject = dataObject;
  }

  static fromObject(object: ICanister) {
    return new Canister(object._sysInfo, object._dataObject);
  }

  getDataObject(): GetStateDataObject {
    return this._dataObject;
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
