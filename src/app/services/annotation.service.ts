import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class AnnotationService {
  constructor(private httpClient: HttpClient) { }
  //All the tags of the inspection
  getTags(): Observable<any> {
    return this.httpClient.get(environment['apibase']  + 'api/annotation/tags')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  get2DAnnotations(MediaFileId): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/Annotation/listing/2D/' + MediaFileId)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getMissionAnnotationsType(): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/annotation/types')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getNewAnnotation(): Observable<any>{
    return this.httpClient.get(environment['apibase'] + 'api/Annotation/New')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  saveAnnotation(item): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/Annotation/', item)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  getAnnotation(id): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/Annotation/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  deleteAnnotation(id): Observable<any>{
    return this.httpClient.delete(environment['apibase'] + 'api/Annotation/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  assignTag(mediaFileId, tags): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/annotation/assigntag/' + mediaFileId + '/' + tags,null)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  UnassignTag(mediaFileId, tags): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/annotation/unassigntag/' + mediaFileId + '/' + tags,null)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }






}
