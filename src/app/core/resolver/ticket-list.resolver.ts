import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Ticket } from 'src/app/data/model/ticket.model';
import { TicketService } from 'src/app/data/service/ticket.service';

@Injectable({
  providedIn: 'root',
})
export class TicketListResolver implements Resolve<Observable<Ticket[]>> {
  constructor(private router: Router, private _ticketService: TicketService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ticket[]> {
    const projectId = route.params['projectId'];
    const ticketId = route.params['ticketId'];
    return this._ticketService.getAllTickets(projectId, ticketId).pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
