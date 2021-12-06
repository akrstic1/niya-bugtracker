import { Assign } from './assign.model';
import { User } from './user.model';

export class Ticket {
  _id: string = '';
  title: string = '';
  description: string = '';
  status: string = '';
  priority: string = '';
  submitter_id: User = new User();
  comments: Comment[] = [];
  assigns: Assign[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
