import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectListComponent } from './page/project-list/project-list.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDetailComponent } from './page/project-detail/project-detail.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export class ProjectModule {}
