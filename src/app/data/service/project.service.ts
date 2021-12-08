import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';
import { CreateProjectRequest } from '../model/request/create-project-request.model';

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

  createProject(
    createProjectRequest: CreateProjectRequest
  ): Observable<Project> {
    return this._httpClient.post<Project>(
      environment.API_URL + '/project/',
      createProjectRequest
    );
  }

  editProject(
    editProjectRequest: CreateProjectRequest,
    projectId: string
  ): Observable<Project> {
    return this._httpClient.put<Project>(
      environment.API_URL + '/project/' + projectId,
      editProjectRequest
    );
  }
}
