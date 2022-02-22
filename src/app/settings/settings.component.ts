import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SettingsService } from './settings.service';
import { IGetStateServiceConfig } from 'procon-ip/lib/get-state.service';
import { Observable } from 'rxjs';

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
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit {

  controllerUrl = new FormControl('');
  username = new FormControl('admin');
  password = new FormControl('admin');
  hidePassword = true;
  useBasicAuth = new FormControl(true)
  updateInterval = new FormControl('3');
  requestTimeout = new FormControl('2');
  requestErrorTolerance = new FormControl('2')
  darkMode = new FormControl(true);

  constructor(
    private mediaMatcher: MediaMatcher,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.loadApiServiceConfig(this.settingsService.getApiServiceConfig());
    this.settingsService.getDarkMode().subscribe(v => {
      if (v !== undefined) this.darkMode.setValue(v as boolean);
    });
    // this.settingsService.watchDarkMode().subscribe(v => {
    //   console.log('Got value for darkMode from service: ' + (v?'true':'false'));
    //   if (this.darkMode.value !== v) {
    //   }
    // });

    this.controllerUrl.valueChanges.subscribe(v => { this.settingsService.setControllerUrl(v); });
    this.username.valueChanges.subscribe(v => { this.settingsService.setUsername(v); });
    this.password.valueChanges.subscribe(v => { this.settingsService.setPassword(v); });
    this.useBasicAuth.valueChanges.subscribe(v => { this.settingsService.setBasicAuth(v); });
    this.updateInterval.valueChanges.subscribe(v => { this.settingsService.setUpdateInterval(v); });
    this.requestTimeout.valueChanges.subscribe(v => { this.settingsService.setTimeout(v); });
    this.requestErrorTolerance.valueChanges.subscribe(v => { this.settingsService.setErrorTolerance(v); });
    this.darkMode.valueChanges.subscribe(v => {
      this.settingsService.setDarkMode(v);
    });
  }

  loadApiServiceConfig(configSettings: Observable<IGetStateServiceConfig>) {
    configSettings.subscribe(config => {
      this.controllerUrl.setValue(config.controllerUrl);
      this.username.setValue(config.username);
      this.password.setValue(config.password);
      this.useBasicAuth.setValue(config.basicAuth);
      this.updateInterval.setValue(config.updateInterval)
      this.requestTimeout.setValue(config.timeout);
      this.requestErrorTolerance.setValue(config.errorTolerance);
    });
  }
}
