import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})

export class UtilityService {
  constructor(private http: Http) { }
  //to return name after (lastindexof /)
   getFileName(url) {
    return url.substring(url.lastIndexOf('/') + 1);
  }
  //Method to remove duplicates enteries from an array.
   removeDuplicates(arr, param2?) {
    let unique_array = []
    //  remove duplicates enteries from array containing all the string values
    if (typeof ((arr[0])) == 'string') {
      for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
          unique_array.push(arr[i])
        }
      }
    }
    // to give dynamic propety name in obj[name] name is dynamic here
    else {
      var name
      if (param2) {
        name = param2
      }
      else {
        name = 'name'
      }
      //  remove duplicates enteries from array containing all the object values
      var obj = {}
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i][name]]) {
          unique_array.push(arr[i]);
          obj[arr[i][name]] = arr[i];
        }
      }
    }
    return unique_array
  }
   getFile(path: string): Observable<any> {
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http.get(path, options)
      .map((response: Response) => <Blob>response.blob());
  }
}
