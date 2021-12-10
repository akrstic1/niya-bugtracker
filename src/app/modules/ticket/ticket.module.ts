import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';
import { TicketRoutingModule } from './ticket-routing.module';

@NgModule({
  declarations: [TicketDetailComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    FlexLayoutModule,
    MatTableModule,
  ],
})
export class TicketModule {}
