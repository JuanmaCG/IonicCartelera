import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { Login } from './login';
import { Usuario } from './usuario';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/login';
  private signupUrl = 'http://localhost:8080/registro';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: Usuario): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
