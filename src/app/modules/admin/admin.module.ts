import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './page/manage-users/manage-users.component';

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MatDividerModule],
})
export class AdminModule {}
