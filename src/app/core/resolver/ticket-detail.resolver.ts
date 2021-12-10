import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Project } from 'src/app/data/model/project.model';
import { TicketService } from 'src/app/data/service/ticket.service';

@Injectable({
  providedIn: 'root',
})
export class TicketDetailResolver implements Resolve<Observable<Project>> {
  constructor(private router: Router, private _ticketService: TicketService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> {
    const ticketId = route.params['ticketId'];
    return this._ticketService.getByIdTicket(ticketId).pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
