import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TicketListTableComponent } from './components/ticket/ticket-list-table/ticket-list-table.component';
import { UserListTableComponent } from './components/user/user-list-table/user-list-table.component';

@NgModule({
  declarations: [UserListTableComponent, TicketListTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [UserListTableComponent, TicketListTableComponent],
})
export class SharedModule {}
