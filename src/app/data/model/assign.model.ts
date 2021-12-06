import { User } from './user.model';

export class Assign {
  _id: string = '';
  assignedToUser_id: User = new User();
  assignedByUser_id: User = new User();
  assignedDate: Date = new Date();
}
