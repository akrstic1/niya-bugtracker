import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
  },
  {
    path: ':ticketId',
    component: TicketDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
