import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProcessService } from "../processing/process.service";

@Injectable({ providedIn: 'root' })

export class HttpErrorInterceptorService implements HttpInterceptor
{
    constructor(private processService: ProcessService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log('request started')
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => 
                {
                    const errorMsg = error.error.message ? error.error.message : 'Internal Error'
                    //this.processService.setLoading(false)
                    this.processService.setErroMsg(errorMsg)
                    console.log('interceptor caught an error')
                    //error.status for the code, error.error is my error
                    return throwError(error);  
                })
            )
    }
}