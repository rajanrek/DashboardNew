import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class MediaService {
  constructor(private httpClient: HttpClient) { }
  //All the images and videos of particular project
  getMediaList(gufi): Observable<any> {
    let route = 'api/MediaFile/listing/' + gufi;
    return this.httpClient.get(environment['apibase'] + route)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  deleteMedia(id): Observable<any> {
    return this.httpClient.delete(environment['apibase'] + 'api/MediaFile/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
