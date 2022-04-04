import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { SettingsService } from './settings/settings.service';
import { GetStateService } from './get-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('appMenuToggle', [
      state('hamburger', style({})),
      state('hide', style({
        opacity: 0,
      })),
      state('upperEdge', style({
        transform: 'rotate(-45deg)',
        transformOrigin: 'right',
        marginTop: '-8px',
        marginLeft: '15px',
        width: '16px',
      })),
      state('lowerEdge', style({
        transform: 'rotate(45deg)',
        transformOrigin: 'right',
        marginTop: '20px',
        marginLeft: '15px',
        width: '16px',
      })),
      transition('* => *', [
        animate('0.5s'),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'ProCon.IP RC';
  appMenuMode: 'side'|'over' = 'over';

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _mediaMatcher: MediaMatcher,
    private _remoteService: GetStateService,
    private _swUpdate: SwUpdate,
    public settings: SettingsService,
  ) {}

  ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.WebLandscape]).subscribe(result => {
      this.appMenuMode = result.matches ? 'side' : 'over';
    });

    this.settings.onDarkModeChange((isDark: boolean) => {
      if (isDark && !document.body.classList.contains('dark-mode')) {
        document.body.classList.add('dark-mode');
      } else if (!isDark && document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
      }
    });

    if (this._swUpdate.isEnabled) {
      this._swUpdate.versionUpdates.subscribe($event => {
        if ($event.type === 'VERSION_READY') {
          const doUpdate = window.confirm(
            `Update available (${$event.currentVersion.appData['version']} => ${$event.latestVersion.appData['version']})`
          );
          if (doUpdate) {
            window.location.reload();
          }
        }
      });
    }
  }
}
