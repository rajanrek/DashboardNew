import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  
  constructor(private httpClient: HttpClient) { }
  

  getMissions() {
    return this.httpClient.get(environment['apibase'] + 'api/missions/listing')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

  getNewMission() {
    return this.httpClient.get(environment['apibase'] + 'api/missions/NewMission')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));    
  }

  getMissionByProjId(id){
    return this.httpClient.get(environment['apibase'] + 'api/missions/missionbyprojid/' + id )
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }
}
