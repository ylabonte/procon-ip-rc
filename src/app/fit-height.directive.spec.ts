import { FitHeightDirective } from './fit-height.directive';
import { ElementRef } from '@angular/core';

describe('FitHeightDirective', () => {
  it('should create an instance', () => {
    const directive = new FitHeightDirective(new ElementRef<any>(document.createElement('div')));
    expect(directive).toBeTruthy();
  });
});
