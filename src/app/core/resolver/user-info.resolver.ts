import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Project } from 'src/app/data/model/project.model';
import { UserService } from 'src/app/data/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoResolver implements Resolve<Observable<Project[]>> {
  constructor(private router: Router, private _userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project[]> {
    const userId = route.params['userId'];
    return this._userService.getUserInfo(userId).pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
