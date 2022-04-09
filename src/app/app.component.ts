import { Component, EventEmitter, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { SettingsService } from './settings/settings.service';
import { GetStateService } from './get-state.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ActionsService, IAction } from './actions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('appMenuToggle', [
      state('burgerBar', style({})),
      state('upperBar', style({
        transform: 'rotate(-45deg)',
        transformOrigin: 'right',
        marginLeft: '-4px',
        width: '12px',
      })),
      state('centerBar', style({
        width: '18px'
      })),
      state('lowerBar', style({
        transform: 'rotate(45deg)',
        transformOrigin: 'right',
        marginLeft: '-4px',
        width: '12px',
      })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
    trigger('toggleDisableClose', [
      state('pin', style({})),
      state('pin-icon', style({})),
      state('unpin', style({
        transform: 'rotate(45deg)',
      })),
      state('unpin-icon', style({
        fontSize: '18px',
      })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'ProCon.IP RC';
  appMenuMode: 'side'|'over' = 'over';
  isPinned = false;
  bodyOffsetTop = 0;
  quickActions = new EventEmitter<IAction[]>(true);
  moreActions = new EventEmitter<IAction[]>(true);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _mediaMatcher: MediaMatcher,
    private _remoteService: GetStateService,
    private _swUpdate: SwUpdate,
    private _actions: ActionsService,
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

    this._actions.changes.subscribe(actions => {
      this.quickActions.emit(actions.getQuickActions());
      this.moreActions.emit(actions.getMoreActions());
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

  isPinnable(sidenav: MatSidenav) {
    return sidenav.mode === 'side';
  }

  toggleDisableClose() {
    this.isPinned = !this.isPinned;
  }

  setBodyOffsetTop($event: DOMRect) {
    this.bodyOffsetTop = $event.top;
  }
}
