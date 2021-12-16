import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../model/project.model';
import { CreateTicketRequest } from '../model/request/create-ticket-request.model';
import { EditTicketRequest } from '../model/request/edit-ticket-request.model';
import { Ticket } from '../model/ticket.model';

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

  createTicket(
    createTicketRequest: CreateTicketRequest,
    projectId: string
  ): Observable<Ticket> {
    return this._httpClient.post<Ticket>(
      environment.API_URL + '/ticket/' + projectId,
      createTicketRequest
    );
  }

  editTicket(
    editTicketRequest: EditTicketRequest,
    ticketId: string
  ): Observable<Ticket> {
    return this._httpClient.put<Ticket>(
      environment.API_URL + '/ticket/' + ticketId,
      editTicketRequest
    );
  }
}
