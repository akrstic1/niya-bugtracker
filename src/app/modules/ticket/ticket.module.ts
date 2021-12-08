import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
