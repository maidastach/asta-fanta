import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProcessService } from "../processing/process.service";

@Injectable({ providedIn: 'root' })

export class HttpErrorInterceptorService implements HttpInterceptor
{
    constructor(private processService: ProcessService, private router: Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log('request started')
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                {
                    console.log(error);
                    
                    const errorMsg = error.error.message ? error.error.message : 'Server connection error'
                    this.processService.setErroMsg(errorMsg)
                    console.log('interceptor caught an error')
                    this.router.navigate([''])
                    //error.status for the code, error.error is my error
                    return throwError(error);  
                })
            )
    }
}