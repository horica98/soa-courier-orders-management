import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthUser, Courier, User } from '../models';

const URL = 'http://127.0.0.1:5000';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(user: AuthUser): Observable<{ user: User | null }> {
    // return of({user: null});
    return this.http.post<{ user: User | null }>(`${URL}/api/users/`, user);
  }

  register(user: User): Observable<any> {
    // return of({user: null});
    return this.http.post<any>(`${URL}/api/users/register/`, user);
  }
}
