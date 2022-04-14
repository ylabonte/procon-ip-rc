import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatButton } from '@angular/material/button';
import { Color } from '../color';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

interface INavState {
  isOpen: boolean;
  isPinned: boolean;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('toggleDisableClose', [
      state('pin', style({})),
      state('pin-icon', style({})),
      state('unpin', style({
        transform: 'rotate(45deg)',
      })),
      state('unpin-icon', style({
        fontSize: '18px',
        color: Color.accent,
      })),
      transition('* => *', [
        animate('0.3s'),
      ]),
    ]),
  ],
})
export class NavMenuComponent implements OnInit {
  navigationItems = [{
    displayName: 'Dashboard',
    link: '/dashboard',
    icon: 'dashboard',
  }, {
    displayName: 'Relays',
    link: '/relays',
    icon: 'toggle_on',
  }, {
    displayName: 'Temperatures',
    link: '/temperatures',
    icon: 'thermostat',
  }, {
    displayName: 'Canisters',
    link: '/canisters',
    icon: 'format_color_fill',
  }, {
    displayName: 'Settings',
    link: '/settings',
    icon: 'settings',
  }, {
    displayName: 'About',
    link: '/about',
    icon: 'help_outline'
  }];

  @Input() sidenav: MatSidenav;

  @ViewChild('accentColorHelper') accentColorHelper: MatButton;

  private _state: INavState;

  constructor(
    private _storage: StorageMap,
  ) { }

  ngOnInit() {
    const initiallyOpen = this.sidenav.mode !== 'over';
    this._state = {
      isOpen: initiallyOpen,
      isPinned: initiallyOpen,
    };
    this._storage.get('navState').subscribe((state: INavState) => {
      if (state) {
        this._state = state;
        if (this._state.isOpen)
          this.sidenav.open();
      }
      this.sidenav.openedChange.subscribe(opened => {
        this._state.isOpen = opened;
        this.saveState();
      });
    });
  }

  isSidenavModeOver(): boolean {
    return this.sidenav.mode === 'over';
  }

  isPinned(): boolean {
    return this._state.isPinned;
  }

  toggleDisableClose() {
    this._state.isPinned = !this._state.isPinned;
    this.saveState();
  }

  click() {
    if (this.isSidenavModeOver() || !this.isPinned()) {
      this.sidenav.close().then(() => {
        this._state.isOpen = false;
        this.saveState();
      });
    }
  }

  saveState() {
    this._storage.set('navState', this._state).subscribe(() => {});
  }
}
