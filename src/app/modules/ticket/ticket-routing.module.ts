import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailResolver } from 'src/app/core/resolver/project-detail.resolver';
import { TicketDetailResolver } from 'src/app/core/resolver/ticket-detail.resolver';
import { UserListResolver } from 'src/app/core/resolver/user-list.resolver';
import { TicketAddComponent } from './page/ticket-add/ticket-add.component';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';
import { TicketEditComponent } from './page/ticket-edit/ticket-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index',
  },
  {
    path: 'create/:projectId',
    component: TicketAddComponent,
    resolve: {
      userListResponse: UserListResolver,
      projectDetailResponse: ProjectDetailResolver,
    },
  },
  {
    path: ':ticketId',
    component: TicketDetailComponent,
    resolve: { ticketDetailResponse: TicketDetailResolver },
  },
  {
    path: ':ticketId/edit',
    component: TicketEditComponent,
    resolve: { ticketDetailResponse: TicketDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
