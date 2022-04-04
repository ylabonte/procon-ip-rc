import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IAppSettings, SettingsService } from './settings.service';
import { IGetStateServiceConfig } from 'procon-ip';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('iconToggle', [
      state('active', style({})),
      state('inactive', style({
        opacity: 0.2,
        })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class SettingsComponent implements OnInit, IAppSettings {
  apiServiceConfig: IGetStateServiceConfig = {
    controllerUrl: `${location.protocol}//${location.host}/assets`,
    username: '',
    password: '',
    basicAuth: false,
    updateInterval: 3000,
    timeout: 3000,
    errorTolerance: 3,
  };
  darkMode: boolean;
  useSystemPreferredColorScheme = true;
  hidePassword = true;

  constructor(
    private _media: MediaMatcher,
    private _settings: SettingsService,
  ) {}

  ngOnInit(): void {
    this.apiServiceConfig = this._settings.apiServiceConfig;
    this.useSystemPreferredColorScheme = this._settings.useSystemPreferredColorScheme;
    this.darkMode = this._settings.darkMode;
    this._settings.onDarkModeChange(darkMode => {
      this.darkMode = darkMode;
      this.useSystemPreferredColorScheme = this._settings.useSystemPreferredColorScheme;
    });
    this._settings.onApiServiceConfigChange(apiServiceConfig => this.apiServiceConfig = apiServiceConfig);
  }

  save($event: Event);
  save($event: PointerEvent);
  save($event: MatSlideToggleChange);
  save($event?: any) {
    if ($event instanceof MatSlideToggleChange) {
      if ($event.source.name === 'useSystemPreferredColorScheme')
        this._settings.useSystemPreferredColorScheme = this.useSystemPreferredColorScheme;
      else if ($event.source.name === 'darkMode')
        this._settings.darkMode = this.darkMode;
    }
    if ($event instanceof PointerEvent) {
      this._settings.apiServiceConfig = this.apiServiceConfig;
    }
  }
}
