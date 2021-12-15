import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private _httpClient: HttpClient) {}

  getAttachmentById(attachmentId: string): Observable<any> {
    return this._httpClient.get(
      environment.API_URL + '/attachment/' + attachmentId,
      { responseType: 'blob' }
    );
  }

  createAttachment(formData: FormData, ticketId: string): Observable<Project> {
    return this._httpClient.post<Project>(
      environment.API_URL + '/attachment/' + ticketId,
      formData
    );
  }

  deleteAttachment(attachmentId: string): Observable<any> {
    return this._httpClient.delete<any>(
      environment.API_URL + '/attachment/' + attachmentId
    );
  }
}
