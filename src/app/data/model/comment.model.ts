import { User } from './user.model';

export class Comment {
  _id: string = '';
  message: string = '';
  commenter_id: User = new User();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
