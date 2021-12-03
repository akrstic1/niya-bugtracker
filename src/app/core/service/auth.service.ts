import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginUserRequest } from 'src/app/data/model/request/login-user-request.model';
import { LoginUserResponse } from 'src/app/data/model/response/login-user-response.model';
import { User } from 'src/app/data/model/user.model';
import { UserAuthService } from 'src/app/data/service/user-auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    new User()
  );
  public userObservable: Observable<User> = this.userSubject.asObservable();

  public get user(): User {
    return this.userSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.user._id != '' && this.user.username != '';
  }

  constructor(
    private _userAuthService: UserAuthService,
    private _localStorageService: LocalStorageService,
    private router: Router
  ) {}

  loginWithCredentials(loginUserRequest: LoginUserRequest) {
    return this._userAuthService
      .authenticateWithCredentials(loginUserRequest)
      .pipe(
        map((loginUserResponse: LoginUserResponse) => {
          this.setAuthenticateResponseData(
            loginUserResponse.user,
            loginUserResponse.token
          );
          this.router.navigate(['/index']);
        })
      );
  }

  loginWithJwt(token: string) {
    return this._userAuthService.authenticateWithJwt(token).pipe(
      map((loginUserResponse: LoginUserResponse) => {
        this.setAuthenticateResponseData(
          loginUserResponse.user,
          loginUserResponse.token
        );
      })
    );
  }

  logout() {
    this._localStorageService.removeToken();
    this.userSubject.next(new User());
    this.router.navigate(['']);
  }

  public setAuthenticateResponseData(authenticatedUser: User, jwt: string) {
    if (authenticatedUser._id != '' && jwt != '') {
      this._localStorageService.setToken(jwt);
    }
    this.userSubject.next(authenticatedUser);
  }
}
