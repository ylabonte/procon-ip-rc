import { GetStateDataObject, GetStateDataSysInfo } from 'procon-ip';

export interface ICanister {
  _canisterData: GetStateDataObject;
  _consumptionData: GetStateDataObject;
  _sysInfo: GetStateDataSysInfo;
  _hidden: boolean;
}

export class Canister {
  private _sysInfo: GetStateDataSysInfo;
  private _canisterData: GetStateDataObject;
  private _consumptionData: GetStateDataObject;
  private _hidden: boolean;

  constructor(
    canisterData: GetStateDataObject,
    consumptionData: GetStateDataObject,
    sysInfo: GetStateDataSysInfo,
    isHidden: boolean = false,
  ) {
    this._canisterData = canisterData;
    this._consumptionData = consumptionData;
    this._sysInfo = sysInfo;
    this._hidden = isHidden;
  }

  static fromObject(object: ICanister) {
    return new Canister(object._canisterData, object._consumptionData, object._sysInfo, object._hidden);
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
