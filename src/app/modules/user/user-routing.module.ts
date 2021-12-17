import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoResolver } from 'src/app/core/resolver/user-info.resolver';
import { UserDetailComponent } from './page/user-detail/user-detail.component';

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
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
