import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  login(value): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/auth', value)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  }
