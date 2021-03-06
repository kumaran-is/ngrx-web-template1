import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logger } from '@app/logger/logger.service';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          // 401 handled in auth.interceptor
          this.errorHandler(error);
        } else if (error.status === 401) {
          // auto logout if 401 response returned from api
          // this.authService.logout();
          // location.reload(true);
        }
        return throwError(error);
      })
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpErrorResponse): void {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', error);
    }
  }
}
