import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Courier } from './courier';

const URL = 'http://127.0.0.1:8080';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string): Observable<{ courier: Courier | null }> {
    return of({courier: null});
    return this.http.get<{ courier: Courier | null }>(`${URL}/api/couriers/${email}`);
  }

  register(email: string, name: string): Observable<any> {
    return of({courier: null});
    return this.http.post<any>(`${URL}/api/couriers/`, {email, name});
  }
}
