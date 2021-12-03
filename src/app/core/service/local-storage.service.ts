import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(environment.authTokenName, token);
  }

  removeToken(): void {
    localStorage.removeItem(environment.authTokenName);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.authTokenName);
  }
}
