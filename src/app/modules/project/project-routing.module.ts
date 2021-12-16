import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailResolver } from 'src/app/core/resolver/project-detail.resolver';
import { ProjectListResolver } from 'src/app/core/resolver/project-list.resolver';
import { UserListResolver } from 'src/app/core/resolver/user-list.resolver';
import { ProjectAddComponent } from './page/project-add/project-add.component';
import { ProjectDetailComponent } from './page/project-detail/project-detail.component';
import { ProjectEditComponent } from './page/project-edit/project-edit.component';
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
    path: 'create',
    component: ProjectAddComponent,
    resolve: {
      userListResponse: UserListResolver,
    },
  },
  {
    path: ':projectId',
    component: ProjectDetailComponent,
    resolve: {
      projectDetailResponse: ProjectDetailResolver,
    },
  },
  {
    path: ':projectId/edit',
    component: ProjectEditComponent,
    resolve: {
      projectToEditResponse: ProjectDetailResolver,
      userListResponse: UserListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
