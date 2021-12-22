import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from 'src/app/core/resolver/project-list.resolver';
import { IndexComponent } from './page/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    resolve: {
      projectListResponse: ProjectListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
