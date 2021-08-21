import { NgxLoggerLevel } from 'ngx-logger';
export const environment = {
  production: true,
  baseUrl: 'http://localhost:5005/api/',
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  snackBarDurationInSeconds:5
};
