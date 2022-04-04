import { Injectable } from '@angular/core';
import { LogService } from '../log.service';
import { UsrcfgCgiService, RelayDataInterpreter, RelayDataObject } from 'procon-ip';
import { SettingsService } from '../settings/settings.service';
import { GetStateService } from '../get-state.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Relay, IRelayObject } from './relay/relay';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class RelaysService {
  private static readonly STORAGE_KEY = 'relays';
  private readonly _interpreter: RelayDataInterpreter;
  private _internal: UsrcfgCgiService;
  private _relays: Relay[];
  private _callbackIdx: number;

  constructor(
    private _storage: StorageMap,
    private _settings: SettingsService,
    private _getState: GetStateService,
    private _log: LogService,
  ) {
    this._relays = [];
    this._interpreter = new RelayDataInterpreter(this._log.getLogger());
    this._storage.get(RelaysService.STORAGE_KEY).subscribe((relays: IRelayObject[]) => {
      if (relays === undefined) {
        this.save();
      } else {
        this.load(relays);
      }

      this._callbackIdx = this._getState.registerCallback(data => {
        this._getState.getRelayDataObjects(data).forEach(relayDataObject => {
          const existingRelay = this._relays.filter(r => r.dataObject.id === relayDataObject.id).shift();
          if (existingRelay) {
            if (existingRelay.update(relayDataObject)) {
              const index = this._relays.indexOf(existingRelay);
              this._relays[index] = existingRelay.clone();
            }
          } else {
            const relay = new Relay();
            relay.init(this._interpreter, relayDataObject, relayDataObject.label === 'n.a.');
            this._relays.push(relay);
          }
        });
        this.save();
      });
    });

    this._settings.onApiServiceConfigChange(config => {
      this._getState.getInternalService().getData().then(() => {
        if (this._internal)
          delete this._internal;
        this._internal = new UsrcfgCgiService(
          config,
          this._log.getLogger(),
          this._getState.getInternalService(),
          this._interpreter,
        );
      });
    });
  }

  getRelays(): Relay[] {
    return this._relays;
  }

  getInterpreter(): RelayDataInterpreter {
    return this._interpreter;
  }

  async set(relay: RelayDataObject, state: string): Promise<void> {
    switch (state) {
      case 'auto':
        await this._internal.setAuto(relay);
        break;
      case 'on':
        await this._internal.setOn(relay);
        break;
      case 'off':
        await this._internal.setOff(relay);
        break;
    }
  }

  moveItemInArray(previousIndex: number, currentIndex: number) {
    moveItemInArray(this._relays, previousIndex, currentIndex);
    this.save();
  }

  private save() {
    this._storage.set(RelaysService.STORAGE_KEY, this._relays.map(r => r.asObject())).subscribe(() => {});
  }

  private load(relays: IRelayObject[]) {
    this._relays = [];
    relays.forEach(relayObject => {
      const relay = new Relay();
      relay.init(this._interpreter, relayObject);
      this._relays.push(relay);
    });
  }
}
