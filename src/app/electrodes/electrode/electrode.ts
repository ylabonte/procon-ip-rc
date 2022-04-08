import { GetStateDataObject, GetStateDataSysInfo } from 'procon-ip';
import { ListObject } from '../../object-list/list-object';
import { ElectrodeComponent } from './electrode.component';

export class Electrode extends ListObject {
  private _sysInfo: GetStateDataSysInfo;

  init(...args: any[]) {
    if (args.length < 2)
      throw new Error(`Too few arguments. Expected at least 2, got ${args.length}`);
    // if (!(args[0] instanceof GetStateDataSysInfo))
    //   throw new Error(`Invalid argument [0]. Expected an instance of GetStateDataSysInfo.`);
    // if (!(args[1] instanceof GetStateDataObject))
    //   throw new Error(`Invalid argument [1]. Expected an instance of GetStateDataObject.`);
    super.init(ElectrodeComponent, args[1], args.length > 2 && args[2]);
    this._sysInfo = args[0];
  }

  clone(): Electrode {
    const electrodeClone = new Electrode();
    electrodeClone.init();
    return electrodeClone;
  }

  get sysInfo(): GetStateDataSysInfo {
    return this._sysInfo;
  }
}
