import { Role } from './role.model';
export class User {
  _id: string = '';
  fullName: string = '';
  username: string = '';
  roles: Role[] = [];
}
