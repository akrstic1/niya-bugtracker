import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../model/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private _httpClient: HttpClient) {}

  getAllTickets(projectId: string, ticketId: string): Observable<Ticket[]> {
    return this._httpClient.get<Ticket[]>(
      environment.API_URL + '/project/' + projectId + '/ticket/' + ticketId
    );
  }
}
