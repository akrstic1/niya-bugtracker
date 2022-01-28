import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailResolver } from 'src/app/core/resolver/user-detail.resolver';
import { UserInfoResolver } from 'src/app/core/resolver/user-info.resolver';
import { UserDetailComponent } from './page/user-detail/user-detail.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index',
  },
  {
    path: ':userId',
    component: UserDetailComponent,
    resolve: {
      userInfoResponse: UserInfoResolver,
      userDetailResponse: UserDetailResolver,
    },
  },
  {
    path: ':userId/edit',
    component: UserEditComponent,
    resolve: {
      userInfoResponse: UserInfoResolver,
      userDetailResponse: UserDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
