import { User } from '../user.model';
export class LoginUserResponse {
  user: User = new User();
  token: string = '';
}
