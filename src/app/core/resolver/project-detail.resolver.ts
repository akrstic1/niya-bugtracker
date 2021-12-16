import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Project } from 'src/app/data/model/project.model';
import { ProjectService } from 'src/app/data/service/project.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailResolver implements Resolve<Observable<Project>> {
  constructor(
    private router: Router,
    private _projectService: ProjectService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> {
    const projectId = route.params['projectId'];
    return this._projectService.getByIdProject(projectId).pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
