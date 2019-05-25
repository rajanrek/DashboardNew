import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  saveOrganization(organizationdata: any) {
    throw new Error("Method not implemented.");
  }


  constructor(private httpClient: HttpClient) { }

  
  getProject(id) {
    return this.httpClient.get(environment['apibase'] + 'api/project/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }


  getNewProject() {
    return this.httpClient.get(environment['apibase'] + 'api/project/new')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));    
  }


  // saveOrganizationData(organization): Observable<any> {
  //   return this.httpClient.post(environment['apibase'] + 'api/Organization', organization)
  //     .map((res: Response) => res)
  //     .catch((error: any) => Observable.throw(error || 'Server error'));
  // }
  getProjects() {
    return this.httpClient.get(environment['apibase'] + 'api/project/listing')
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));
}
}
