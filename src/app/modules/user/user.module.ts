import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    SharedModule,
  ],
})
export class UserModule {}
