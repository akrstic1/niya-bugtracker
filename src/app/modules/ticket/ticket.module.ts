import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketAddComponent } from './page/ticket-add/ticket-add.component';
import { TicketDetailComponent } from './page/ticket-detail/ticket-detail.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketEditComponent } from './page/ticket-edit/ticket-edit.component';

@NgModule({
  declarations: [TicketDetailComponent, TicketAddComponent, TicketEditComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDropzoneModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class TicketModule {}
