import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Role } from 'src/app/data/model/role.model';
import { RoleService } from 'src/app/data/service/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleListResolver implements Resolve<Observable<Role[]>> {
  constructor(private router: Router, private _roleService: RoleService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Role[]> {
    return this._roleService.getAllRoles().pipe(
      catchError((err) => {
        this.router.navigate(['/index']);
        return EMPTY;
      })
    );
  }
}
