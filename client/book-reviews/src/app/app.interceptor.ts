import { Injectable, Provider } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, catchError, tap } from "rxjs";
import { AuthService } from "./auth-user/auth.service";

const apiUrl: string = 'http://localhost:3030';

@Injectable()

export class AppInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

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
                headers: req.headers.set('x-authorization', this.authService.token!)
            })
        }

        return next.handle(req).pipe(
            catchError((err) => { 
                console.log(err);
                
                window.alert(err.error.message);

                return [err];
            })

        ); // da amaa nee...
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}