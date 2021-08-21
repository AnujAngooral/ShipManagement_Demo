import { NotifyService } from 'src/app/services/notify.service';


import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize, catchError, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }),
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        let errorMsg = '';
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('API error');
            if (error.status == 0) {
              errorMsg = error.message;
            } else {
              errorMsg = `Error: ${error.error} `; //, ${error.message}  Code: ${error.status},
            }
          }
        }
        this.notifyService.error(errorMsg);
        console.log(errorMsg);
        throw errorMsg;
      }),
      finalize(() => {})
    );
  }
}
