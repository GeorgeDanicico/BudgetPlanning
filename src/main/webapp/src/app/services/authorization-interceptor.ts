import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    public snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
        .pipe(
            tap({
                // Succeeds when there is a response; ignore other events
                next: (event) => {},
                // Operation failed; error is an HttpErrorResponse
                error: (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        if (!window.location.href.includes('login') && localStorage.getItem('loggedIn') === 'true') {
                            this.snackBar.open('Your session expired. Please log in.', 'Close');
                        }
                        console.warn('Unauthorized request.')
                        localStorage.removeItem('loggedIn');
                        this.router.navigate(['/login']);
                    }
                }
              })
        );
  }
}