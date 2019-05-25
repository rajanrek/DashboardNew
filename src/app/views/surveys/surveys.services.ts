import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})

export class SurveyListService {
  constructor(private httpClient: HttpClient) { }
  getSurveysById(id:any): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/flight/flights/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  
  getSurveyOutputs(gufi): Observable<any> {
    return this.httpClient.get(environment['apibase'] + 'api/output/listing/' + gufi)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
