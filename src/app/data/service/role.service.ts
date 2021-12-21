import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private _httpClient: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this._httpClient.get<Role[]>(environment.API_URL + '/role');
  }
}
