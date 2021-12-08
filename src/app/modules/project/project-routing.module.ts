import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailResolver } from 'src/app/core/resolver/project-detail.resolver';
import { ProjectListResolver } from 'src/app/core/resolver/project-list.resolver';
import { ProjectDetailComponent } from './page/project-detail/project-detail.component';
import { ProjectListComponent } from './page/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projectListResponse: ProjectListResolver,
    },
  },
  {
    path: ':id',
    component: ProjectDetailComponent,
    resolve: {
      projectDetailResponse: ProjectDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
