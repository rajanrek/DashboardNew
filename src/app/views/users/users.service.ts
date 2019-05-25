import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  saveOrganization(organizationdata: any) {
    throw new Error('Method not implemented.');
  }


  constructor(private httpClient: HttpClient) { }



getUsers() {
    return this.httpClient.get(environment['apibase'] + 'api/users/listing')
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

getNewUser() {
  return this.httpClient.get(environment['apibase'] + 'api/users/NewUser')
    .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));    
}


  getUser(id) {
  return this.httpClient.get(environment['apibase'] + 'api/users/' + id)
       .map((res: Response) => res)
    .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }

  saveUser(user): Observable<any> {
    return this.httpClient.post(environment['apibase'] + 'api/users/SaveUser', user)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteUser(id) {
    return this.httpClient.delete(environment['apibase'] + 'api/users/' + id)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));
  }


  associateDrones(associations): Observable<any> {

    return this.httpClient.post(environment['apibase'] + 'api/users/associate-drones', associations)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));    
  }

  getAssociatedDrones(userId) {

    return this.httpClient.get(environment['apibase'] + 'api/users/associated-drones/' + userId)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || console.log('Server error')));   
  }

}
