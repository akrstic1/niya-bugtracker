import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private _httpClient: HttpClient) {}

  getByIdTicket(ticketId: string): Observable<Project> {
    return this._httpClient.get<Project>(
      environment.API_URL + '/ticket/' + ticketId
    );
  }
}
