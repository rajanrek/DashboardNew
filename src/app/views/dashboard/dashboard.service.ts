import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  getProjects(): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/project/listing')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getDashboardData(): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/Dashboard')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
