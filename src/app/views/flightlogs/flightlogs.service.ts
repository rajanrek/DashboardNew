import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class FlightlogsService {

  constructor(private httpClient: HttpClient) { }
  
 getFlights() {
    return this.httpClient.get(environment['apibase'] + 'api/flight/listing')
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));
}
getFlight(id) {
  return this.httpClient.get(environment['apibase'] + 'api/flight/' + id)
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));
}


getNewFlight() {
  return this.httpClient.get(environment['apibase'] + 'api/flight/NewFlight')
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));    
}


}
