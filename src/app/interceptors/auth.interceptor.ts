import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtService } from '../services/auth/jwt.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private jwtService : JwtService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            
            if (error.status == 401) {
              this.jwtService.logout();
              this.router.navigateByUrl('/auth/login');
            }

            return throwError(error);
          })
        );
    }
}