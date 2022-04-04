import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IGetStateServiceConfig } from 'procon-ip';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PleaseSetUpComponent } from './please-set-up/please-set-up.component';

export interface IAppSettings {
  apiServiceConfig: IGetStateServiceConfig;
  darkMode: boolean;
  useSystemPreferredColorScheme: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements IAppSettings {
  private readonly _storageKey = 'settings';
  public readonly _onChangeCallbacks: {
    apiServiceConfig: ((apiServiceConfig: IGetStateServiceConfig) => any)[],
    darkMode: ((darkMode: boolean) => any)[],
  } = {apiServiceConfig: [], darkMode: []};

  private _apiServiceConfig: IGetStateServiceConfig = {
    controllerUrl: `${location.protocol}//${location.host}/assets`,
    username: '',
    password: '',
    basicAuth: false,
    updateInterval: 3000,
    timeout: 3000,
    errorTolerance: 3,
  };
  private _darkMode: boolean;
  private _useSystemPreferredColorScheme: boolean;
  private _darkModeMediaQuery: MediaQueryList;

  constructor(
    private _mediaMatcher: MediaMatcher,
    private _snackBar: MatSnackBar,
    private _storage: StorageMap,
  ) {
    this._darkModeMediaQuery = this._mediaMatcher.matchMedia('all and (prefers-color-scheme: dark)');
    this._storage.get(this._storageKey).subscribe((settings: IAppSettings) => {
      if (settings) {
        Object.keys(settings).forEach(key => this['_'+key] = settings[key]);
      } else {
        this._darkMode = this._darkModeMediaQuery.matches;
        this._useSystemPreferredColorScheme = true;
        this._snackBar.openFromComponent(PleaseSetUpComponent);
      }
      if (this.apiServiceConfig)
        this.propagateApiServiceConfigChange();
      this.propagateDarkModeChange();
    });
  }

  get apiServiceConfig(): IGetStateServiceConfig {
    return this._apiServiceConfig;
  }

  get darkMode(): boolean {
    return this._darkMode;
  }

  get useSystemPreferredColorScheme(): boolean {
    return this._useSystemPreferredColorScheme;
  }

  set apiServiceConfig(serviceConfig: IGetStateServiceConfig) {
    this._apiServiceConfig = serviceConfig;
    this.propagateApiServiceConfigChange();
    this.save();
  }

  set darkMode(on: boolean) {
    this._darkMode = on;
    this.propagateDarkModeChange();
    this.save();
  }

  set useSystemPreferredColorScheme(on: boolean) {
    this._useSystemPreferredColorScheme = on;
    if (on) {
      this.darkMode = this._darkModeMediaQuery.matches;
    } else {
      this.save();
    }
  }

  save($event?: Event) {
    const settings: IAppSettings = {
      apiServiceConfig: this._apiServiceConfig,
      darkMode: this._darkMode,
      useSystemPreferredColorScheme: this._useSystemPreferredColorScheme,
    };
    this._storage.set(this._storageKey, settings).subscribe(() => {
      this._snackBar.open("Settings saved.", null, {duration: 2000});
    });
  }

  get updates(): Observable<IAppSettings> {
    return this._storage.watch(this._storageKey) as Observable<IAppSettings>;
  }

  onApiServiceConfigChange(callback: (apiServiceConfig: IGetStateServiceConfig) => any) {
    this._onChangeCallbacks.apiServiceConfig.push(callback);
  }

  onDarkModeChange(callback: (darkMode: boolean) => any) {
    this._onChangeCallbacks.darkMode.push(callback);
  }

  private propagateApiServiceConfigChange() {
    this._onChangeCallbacks.apiServiceConfig.forEach(c => c(this._apiServiceConfig));
  }

  private propagateDarkModeChange() {
    this._onChangeCallbacks.darkMode.forEach(c => c(this._darkMode));
  }
}
