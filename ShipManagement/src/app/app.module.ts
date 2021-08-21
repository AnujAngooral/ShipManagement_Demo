
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { ShipModule } from './components/ship/ship.module';

import { ShipService } from './services/ship.service';
import { HTTPInterceptor } from './services/http-interceptor.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from './services/validation.service';



@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HomeComponent, MainNavComponent],
  imports: [BrowserModule, ShipModule, AppRoutingModule, BrowserAnimationsModule,
    MatButtonModule, LayoutModule,
    MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
    LoggerModule.forRoot({
      level:environment.logLevel,
      disableConsoleLogging: false
    }) ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
    ShipService,
    MatSnackBar,
    ValidationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
