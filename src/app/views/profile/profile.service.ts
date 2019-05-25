import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private httpClient: HttpClient) { }

  getUserByLoginId() {
    return this.httpClient.get(environment['apibase'] + 'api/users/LoginUser')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }
}
