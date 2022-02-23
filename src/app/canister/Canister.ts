import { GetStateDataObject } from 'procon-ip/lib/get-state-data-object';
import { GetStateDataSysInfo } from 'procon-ip/lib/get-state-data-sys-info';

export interface ICanister {
  _sysInfo: GetStateDataSysInfo;
  _canisterData: GetStateDataObject;
  _consumptionData: GetStateDataObject;
  _hidden: boolean;
}

export class Canister {
  private _sysInfo: GetStateDataSysInfo;
  private _canisterData: GetStateDataObject;
  private _consumptionData: GetStateDataObject;
  private _hidden: boolean;

  constructor(
    sysInfo: GetStateDataSysInfo,
    canisterData: GetStateDataObject,
    consumptionData: GetStateDataObject,
    isHidden: boolean = false,
  ) {
    this._sysInfo = sysInfo;
    this._canisterData = canisterData;
    this._consumptionData = consumptionData;
    this._hidden = isHidden;
  }

  static fromObject(object: ICanister) {
    return new Canister(object._sysInfo, object._canisterData, object._consumptionData, object._hidden);
  }

  get filling(): GetStateDataObject {
    return this._canisterData;
  }

  get consumption(): GetStateDataObject {
    return this._consumptionData;
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
