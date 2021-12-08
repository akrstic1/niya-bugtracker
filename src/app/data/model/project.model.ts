import { Ticket } from './ticket.model';
import { User } from './user.model';

export class Project {
  _id: string = '';
  name: string = '';
  description: string = '';
  users: User[] = [];
  tickets: Ticket[] = [];
}
