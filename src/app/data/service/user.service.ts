import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';
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

  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(environment.API_URL + '/user');
  }

  getUserInfo(userId: string): Observable<Project[]> {
    return this._httpClient.get<Project[]>(
      environment.API_URL + '/user/' + userId + '/info'
    );
  }
}
