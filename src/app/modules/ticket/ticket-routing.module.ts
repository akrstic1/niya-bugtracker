import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailResolver } from 'src/app/core/resolver/ticket-detail.resolver';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  {
    path: ':ticketId',
    component: TicketDetailComponent,
    resolve: { ticketDetailResponse: TicketDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
