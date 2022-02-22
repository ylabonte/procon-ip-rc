import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { UsrcfgCgiService } from 'procon-ip/lib/usrcfg-cgi.service';
import { SettingsService } from './settings/settings.service';
import { GetStateService } from './get-state.service';
import { RelayDataInterpreter } from 'procon-ip/lib/relay-data-interpreter';
import { RelayDataObject } from 'procon-ip/lib/relay-data-object';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Relay, IRelay } from './relays/relay';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class RelayService {
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
    this._storage.get(RelayService.STORAGE_KEY).subscribe(relays => {
      if (relays === undefined) {
        this.save();
      } else {
        this.restoreFromJSON(relays as string);
      }

      this._callbackIdx = this._getState.registerCallback(data => {
        this._getState.getRelayDataObjects(data).forEach(relay => {
          const existingRelay = this._relays.filter(r => r.getObjectId() === relay.id).shift();
          if (existingRelay) {
            if (existingRelay.update(relay)) {
              const index = this._relays.indexOf(existingRelay);
              this._relays[index] = new Relay(
                this._interpreter,
                existingRelay.getDataObject(),
                existingRelay.isHidden(),
              );
              this.save();
            } else {
              // nothing changed due to the update
            }
          } else {
            this._relays.push(new Relay(this._interpreter, relay));
            this.save();
          }
        });
      });
    });

    this._settings.getApiServiceConfig().subscribe(config => {
      this._internal = new UsrcfgCgiService(
        config,
        this._log.getLogger(),
        this._getState.getInternalService(),
        this._interpreter,
      );
    });
  }

  // createOrUpdateRelay(relayData: RelayDataObject) {
  //   const existingRelay = this._relays.filter(r => r.getObjectId() === relayData.id).shift();
  //   if (existingRelay) {
  //     existingRelay.update(relayData);
  //   } else {
  //     this._relays.push(new Relay(this._interpreter, relayData));
  //   }
  // }

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
    this._storage.set(RelayService.STORAGE_KEY, JSON.stringify(this._relays)).subscribe(() => {});
  }

  private restoreFromJSON(jsonRelays: string) {
    const relays: IRelay[] = JSON.parse(jsonRelays);
    this._relays = [];
    relays.forEach(relay => {
      this._relays.push(new Relay(this._interpreter, relay._dataObject, relay._hidden, relay._disabledManualOff));
    });
  }
}
