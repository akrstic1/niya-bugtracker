import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListResolver } from 'src/app/core/resolver/role-list.resolver';
import { UserListResolver } from 'src/app/core/resolver/user-list.resolver';
import { ManageUsersComponent } from './page/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    resolve: {
      userListResponse: UserListResolver,
      roleListResponse: RoleListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
