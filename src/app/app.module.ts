import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RelayListComponent } from './relays/relay-list.component';
import { SettingsComponent } from './settings/settings.component';
import { SwitchComponent } from './relays/switch/switch.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { ElectrodesComponent } from './electrodes/electrodes.component';
import { environment } from '../environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ObjectListComponent } from './object-list/object-list.component';
import { ListObjectComponent, ListObjectDirective } from './object-list/list-object.directive';
import { TemperaturesComponent } from './temperatures/temperatures.component';
import { SensorComponent } from './temperatures/sensor/sensor.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PleaseSetUpComponent } from './settings/please-set-up/please-set-up.component';
import { RelayComponent } from './relays/relay/relay.component';
import { CanistersComponent } from './canisters/canisters.component';
import { CanisterComponent } from './canisters/canister/canister.component';
import { RelaysComponent } from './relays/relays.component';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ElectrodeComponent } from './electrodes/electrode/electrode.component';
import { FitHeightDirective } from './fit-height.directive';
import { PhComponent } from './electrodes/electrode/ph/ph.component';
import { ChlorineComponent } from './electrodes/electrode/chlorine/chlorine.component';

@NgModule({
  declarations: [
    AppShellComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RelayListComponent,
    SettingsComponent,
    SwitchComponent,
    ElectrodesComponent,
    ObjectListComponent,
    TemperaturesComponent,
    SensorComponent,
    ListObjectDirective,
    ListObjectComponent,
    PleaseSetUpComponent,
    RelayComponent,
    CanistersComponent,
    CanisterComponent,
    RelaysComponent,
    AboutComponent,
    ElectrodeComponent,
    FitHeightDirective,
    PhComponent,
    ChlorineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FlexModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FlexLayoutModule,
    MatButtonToggleModule,
    MatTooltipModule,
    DragDropModule,
    MatSliderModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
