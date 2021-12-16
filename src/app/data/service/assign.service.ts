import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class AssignService {
  constructor(private _httpClient: HttpClient) {}

  createAssign(ticketId: string, userId: string): Observable<Project> {
    return this._httpClient.post<Project>(
      environment.API_URL + '/assign/' + userId + '/ticket/' + ticketId,
      {}
    );
  }
}
