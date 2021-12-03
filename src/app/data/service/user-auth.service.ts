import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUserRequest } from '../model/request/login-user-request.model';
import { LoginUserResponse } from '../model/response/login-user-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private _httpClient: HttpClient) {}

  public authenticateWithCredentials(
    loginUserRequest: LoginUserRequest
  ): Observable<LoginUserResponse> {
    return this._httpClient.post<LoginUserResponse>(
      `${environment.API_URL}/auth/login`,
      loginUserRequest
    );
  }

  public authenticateWithJwt(token: string): Observable<LoginUserResponse> {
    return this._httpClient.post<LoginUserResponse>(
      `${environment.API_URL}/auth/login/jwt`,
      { token: token }
    );
  }
}
