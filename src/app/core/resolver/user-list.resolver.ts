import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/data/model/user.model';
import { UserService } from 'src/app/data/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<Observable<User[]>> {
  constructor(private router: Router, private _userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this._userService.getAllUsers().pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
