import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class UavsService {

  constructor(private httpClient: HttpClient) { }

  getDrones() {
    return this.httpClient.get(environment['apibase'] + 'api/Drone/listing')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

  getNewDrone() {
    return this.httpClient.get(environment['apibase'] + 'api/Drone/NewDrone')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));    
  }
  getDrone(id) {
    return this.httpClient.get(environment['apibase'] + 'api/Drone/' + id)
         .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }


  saveUAV(drone): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/Drone', drone)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteUAV(id) {
    return this.httpClient.delete(environment['apibase'] + 'api/Drone/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }
}
