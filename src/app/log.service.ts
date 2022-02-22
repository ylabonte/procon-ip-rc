import { Injectable } from '@angular/core';
import { Logger, LogLevel } from 'procon-ip/lib/logger';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logger: Logger;

  constructor() {
    this.new(LogLevel.WARN);
  }

  new(logLevel: LogLevel): Logger {
    return this.logger = new Logger(logLevel);
  }

  getLogger(): Logger {
    return this.logger;
  }
}
