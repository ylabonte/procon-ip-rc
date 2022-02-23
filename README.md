# ProCon.IP Remote Control

![GitHub](https://img.shields.io/github/license/ylabonte/procon-ip-rc)
![GitHub issues](https://img.shields.io/github/issues-raw/ylabonte/procon-ip-rc)
[![Known Vulnerabilities](https://snyk.io/test/github/ylabonte/procon-ip-rc/badge.svg)](https://snyk.io/test/github/ylabonte/procon-ip-rc)  
[![CodeQL](https://github.com/ylabonte/procon-ip-rc/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ylabonte/procon-ip-rc/actions/workflows/codeql-analysis.yml)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ylabonte/procon-ip-rc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ylabonte/procon-ip-rc/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/ylabonte/procon-ip-rc.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ylabonte/procon-ip-rc/context:javascript)

An easy-to-use Mobile First app for the ProCon.IP pool controller, for controlling the relays 
and view all relevant information at a glance.

This app is designed as PWA (Progressive Web App), which means you can install it from your 
favorite browser on desktop or mobile as local app including an auto-updates mechanism. As 
part of the PWA design, network access of such an app is restricted to HTTPS traffic. Hence
you cannot use this app with your ProCon.IP without using a properly configured reverse proxy 
for ssl/tls offloading. Later on, the app will be available for download so that it can easily
be installed/copied to the ProCon.IP microSD card.

Part of this project is a workflow implemented via Github Actions that builds the current master 
state of this repo and pushes the result to a separate repo, from where the app is then published 
via Github Pages.  
See: https://procon-ip.labonte.cloud/

As soon as the project reaches a usable state, this documentation will be updated as well.

Feel free to fork, fix or extend this project at your will. Contributions in form of pull 
requests are also very welcome.

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli)_  
_and visualized with [Angular Material](https://material.angular.io/)._

## Test server

Run `npm run start:pwa` for a pwa compatible test server. Navigate to `http://localhost:8080/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
The development server does not really work for progressive web apps.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
