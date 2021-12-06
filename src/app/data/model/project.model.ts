import { Assign } from './assign.model';
import { Ticket } from './ticket.model';
import { User } from './user.model';

export class Project {
  _id: string = '';
  name: string = '';
  description: string = '';
  users: User = new User();
  tickets: Ticket[] = [];
  assigns: Assign[] = [];
}
