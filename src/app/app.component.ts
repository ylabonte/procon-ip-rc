import { Component, EventEmitter, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { SettingsService } from './settings/settings.service';
import { GetStateService } from './get-state.service';
import { ToolbarService, IAction } from './toolbar.service';

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
        width: '12px',
      })),
      state('centerBar', style({
        width: '18px',
        marginLeft: '4px',
      })),
      state('lowerBar', style({
        transform: 'rotate(45deg)',
        transformOrigin: 'right',
        width: '12px',
      })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  appMenuMode: 'side'|'over' = 'over';
  bodyOffsetTop = 0;
  quickActions = new EventEmitter<IAction[]>(true);
  moreActions = new EventEmitter<IAction[]>(true);
  title = new EventEmitter<string>(true);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _mediaMatcher: MediaMatcher,
    private _remoteService: GetStateService,
    private _swUpdate: SwUpdate,
    private _toolbar: ToolbarService,
    public settings: SettingsService,
  ) {
  }

  ngOnInit() {
    this._breakpointObserver.observe(['(min-width: 1024px)']).subscribe(result => {
      this.appMenuMode = result.matches ? 'side' : 'over';
    });

    this.settings.onDarkModeChange((isDark: boolean) => {
      if (isDark && !document.body.classList.contains('dark-mode')) {
        document.body.classList.add('dark-mode');
      } else if (!isDark && document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
      }
    });

    this._toolbar.titleChange.subscribe(title => this.title.emit(title));
    this._toolbar.actionsChange.subscribe(actions => {
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

  setBodyOffsetTop($event: DOMRect) {
    this.bodyOffsetTop = $event.top;
  }
}
