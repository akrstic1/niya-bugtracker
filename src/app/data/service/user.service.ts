import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUserRequest } from '../model/request/register-user-request.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  registerUser(registerUserRequest: RegisterUserRequest): Observable<User> {
    return this._httpClient.post<User>(
      environment.API_URL + '/auth/register',
      registerUserRequest
    );
  }
}
