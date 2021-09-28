import { Injectable } from '@angular/core';
import { GetStateService as InternalService, IGetStateServiceConfig } from 'procon-ip/lib/get-state.service';
import { SettingsService } from './settings/settings.service';
import { GetStateData } from 'procon-ip/lib/get-state-data';
import { Logger, LogLevel } from 'procon-ip/lib/logger';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStateService {
  private readonly _logger: Logger;
  private _service: InternalService;
  private _data: GetStateData;

  constructor(
    private settingsService: SettingsService,
  ) {
    this._logger = new Logger(LogLevel.WARN);
    settingsService.watchApiServiceConfig().subscribe(config => {
      if (config !== undefined) {
        this.deinitSettingsService();
        this.initSettingsService(config);
      }
    });
  }

  private initSettingsService(config: IGetStateServiceConfig) {
    this._service = new InternalService(config, this._logger);
    this._service.update().then(initialData => {
      this._data = initialData;
      this._service.start(data => {
        this._data = data;
      });
    });
  }

  private deinitSettingsService() {
    if (this._service !== undefined) {
      if (this._service.isRunning()) this._service.stop();
      delete this._service;
    }
  }

  getData(): Observable<GetStateData> {
    return of(this._data);
  }
}
