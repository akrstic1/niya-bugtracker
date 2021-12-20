import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
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
    canActivate: [NgxPermissionsGuard],
    resolve: {
      userListResponse: UserListResolver,
    },
    data: {
      permissions: {
        only: ['Admin', 'Project manager'],
        redirectTo: '/index',
      },
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
    canActivate: [NgxPermissionsGuard],
    resolve: {
      projectToEditResponse: ProjectDetailResolver,
      userListResponse: UserListResolver,
    },
    data: {
      permissions: {
        only: ['Admin', 'Project manager'],
        redirectTo: '/index',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
