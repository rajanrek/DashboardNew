import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class MissionService {
  constructor(private httpClient: HttpClient) { }
  //All the images and videos of particular project
    getMission(gufi): Observable<any> {
    //let route = 'api/MediaFile/listing/' + gufi;
    return this.httpClient.get(environment['apibase'] + 'api/missions/' + gufi)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
 
}
