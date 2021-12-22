import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './page/index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HomeRoutingModule,
    SharedModule,
    MatCardModule,
  ],
})
export class HomeModule {}
