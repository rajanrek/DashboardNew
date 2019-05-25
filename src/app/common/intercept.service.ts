import { Injectable } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()/*{providedIn: 'root'}*/

export class InterceptService implements HttpInterceptor {

  constructor() { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url == "http://uatadmin.garudauav.com/services/api/auth") {
      request = request
    }
    // modify request
    else {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      });
    }

    console.log("----request----");

    console.log(request);

    console.log("--- end of request---");


    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(" all looks good");
            // http response status code
            console.log(event.status);
          }
        }, error => {
          // http response status code
          console.log("----response----");
          console.error("status code:");
          console.error(error.status);
          console.error(error.message);
          console.log("--- end of response---");

        })
      )

  };


}
