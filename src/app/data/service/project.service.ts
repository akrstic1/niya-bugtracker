import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _httpClient: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this._httpClient.get<Project[]>(environment.API_URL + '/project');
  }

  getByIdProject(id: string): Observable<Project> {
    return this._httpClient.get<Project>(
      environment.API_URL + '/project/' + id
    );
  }
}
