import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  saveOrganization(organizationdata: any) {
    throw new Error("Method not implemented.");
  }


  constructor(private httpClient: HttpClient) { }

  
  getOrganization(id) {
    return this.httpClient.get(environment['apibase'] + 'api/Organization/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

  getOrganizations() {
    return this.httpClient.get(environment['apibase'] + 'api/Organization/listing')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }


  getNewOrganization() {
    return this.httpClient.get(environment['apibase'] + 'api/Organization/NewOrganization')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));    
  }


  saveOrganizationData(organization): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/Organization', organization)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteOrganization(id) {
    return this.httpClient.delete(environment['apibase'] + 'api/Organization/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

  
}

