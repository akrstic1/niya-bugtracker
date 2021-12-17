import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './components/other/confirmation-dialog/confirmation-dialog.component';
import { ProjectListTableComponent } from './components/project/project-list-table/project-list-table.component';
import { TicketListTableComponent } from './components/ticket/ticket-list-table/ticket-list-table.component';
import { UserListTableComponent } from './components/user/user-list-table/user-list-table.component';

@NgModule({
  declarations: [
    UserListTableComponent,
    TicketListTableComponent,
    ConfirmationDialogComponent,
    ProjectListTableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    UserListTableComponent,
    TicketListTableComponent,
    ProjectListTableComponent,
  ],
})
export class SharedModule {}
