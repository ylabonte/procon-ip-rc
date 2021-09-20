import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {SwUpdate} from "@angular/service-worker";

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
    trigger('darkModeIndicator', [
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
export class AppComponent implements OnInit {
  title = 'ProCon.IP RC';

  appMenuMode: 'side'|'over' = 'over';
  darkMode: boolean;
  darkModeMediaQuery: MediaQueryList;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher,
    private swUpdate: SwUpdate,
  ) {
    const self = this;

    this.breakpointObserver.observe([Breakpoints.WebLandscape]).subscribe(result => {
      self.appMenuMode = result.matches ? 'side' : 'over';
    });

    this.darkModeMediaQuery = this.mediaMatcher.matchMedia('all and (prefers-color-scheme: dark)');
    this.darkModeMediaQuery.addEventListener('change', ev => {
      self.updateDarkMode();
    });
    this.updateDarkMode();
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((e) => {
        const doUpdate = window.confirm(
          `Update available (${e.current.appData['version']} => ${e.available.appData['version']})`
        );
        if (doUpdate) {
          window.location.reload();
        }
      })
    }
  }

  updateDarkMode() {
    this.darkMode = this.darkModeMediaQuery.matches;
  }
}
