import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {
  //
  // constructor(handler: HttpBackend,
  //             private httpClient: HttpClient,
  //             private httpClient_withoutToken: HttpClient) {
  //   this.httpClient_withoutToken = new HttpClient(handler);
  // }
  //
  // registerUser(name: string, email: string, password: string): Observable<any> {
  //
  //   const body = {
  //     name,
  //     email,
  //     password
  //   };
  //
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   };
  //
  //   return this.httpClient_withoutToken.post(environment.apiUrl + '/registration', body, httpOptions);
  // }
}
