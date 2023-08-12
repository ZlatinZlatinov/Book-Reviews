import { Injectable, Provider } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, catchError, tap } from "rxjs";
import { AuthService } from "./auth-user/auth.service";
import { Router } from "@angular/router";

const apiUrl: string = 'http://localhost:3030';

@Injectable()

export class AppInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (req.url.startsWith('/api')) {
            req = req.clone({
                url: req.url.replace('/api', apiUrl),
                //withCredentials: true,
            })
        }

        if (req.url.startsWith('/token')) {
            req = req.clone({
                url: req.url.replace('/token', apiUrl),
                setHeaders: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.authService.token! 
                }
                     
                //headers: req.headers.set('x-authorization', this.authService.token!)
            })
        }

        return next.handle(req).pipe(
            catchError((err) => { 
                console.log(err);
                
                if(err.status === 404){
                    this.router.navigate(['notfound']); 
                    return [err];
                }

                window.alert(err.error.message || err.message);

                return [err];
            })
        );
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}