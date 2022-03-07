import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { Logger, LogLevel } from 'procon-ip/lib/logger';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a logger', () => {
    expect(service.getLogger()).toBeInstanceOf(Logger);
  });

  it ('should give same instance when called subsequently', () => {
    expect(service.getLogger()).toEqual(service.getLogger());
  });

  it ('should give different instance when called with new()', () => {
    expect(service.getLogger()).not.toBe(service.new(LogLevel.WARN));
  });
});
