import { Assign } from './assign.model';
import { Attachment } from './attachment.model';
import { Comment } from './comment.model';
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
  attachments: Attachment[] = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
