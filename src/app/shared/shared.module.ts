import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TicketCreationLineComponent } from './components/chart/ticket-creation-line/ticket-creation-line.component';
import { TicketPriorityBarComponent } from './components/chart/ticket-priority-bar/ticket-priority-bar.component';
import { TicketStatusPieComponent } from './components/chart/ticket-status-pie/ticket-status-pie.component';
import { ConfirmationDialogComponent } from './components/other/confirmation-dialog/confirmation-dialog.component';
import { ProjectListTableComponent } from './components/project/project-list-table/project-list-table.component';
import { TicketListTableComponent } from './components/ticket/ticket-list-table/ticket-list-table.component';
import { UserEditTableComponent } from './components/user/user-edit-table/user-edit-table.component';
import { UserListTableComponent } from './components/user/user-list-table/user-list-table.component';

@NgModule({
  declarations: [
    UserListTableComponent,
    UserEditTableComponent,
    TicketListTableComponent,
    ConfirmationDialogComponent,
    ProjectListTableComponent,
    TicketStatusPieComponent,
    TicketPriorityBarComponent,
    TicketCreationLineComponent,
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
    NgxPermissionsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgChartsModule,
  ],
  exports: [
    UserListTableComponent,
    UserEditTableComponent,
    TicketListTableComponent,
    ProjectListTableComponent,
    NgxPermissionsModule,
    TicketStatusPieComponent,
    TicketPriorityBarComponent,
    TicketCreationLineComponent,
  ],
})
export class SharedModule {}
