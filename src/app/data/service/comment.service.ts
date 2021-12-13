import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';
import { CreateCommentRequest } from '../model/request/create-comment-request.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _httpClient: HttpClient) {}

  createComment(
    createCommentRequest: CreateCommentRequest,
    ticketId: string
  ): Observable<Project> {
    console.log('yuh');
    return this._httpClient.post<Project>(
      environment.API_URL + '/comment/' + ticketId,
      createCommentRequest
    );
  }
}
