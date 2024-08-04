import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../Services/Loader.service';
import { AuthService } from '../Services/auth.service';

export function AuthIntercept(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loader = inject(LoaderService);
  const token = inject(AuthService).AuthUser?.token;
  loader.show();
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(clonedReq).pipe(
    tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          loader.hide();
        }
      },
      (err: HttpErrorResponse) => {
        loader.hide();
      }
    )
  );
}
