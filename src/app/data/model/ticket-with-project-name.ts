import { Assign } from './assign.model';
import { Attachment } from './attachment.model';
import { Comment } from './comment.model';
import { Ticket } from './ticket.model';
import { User } from './user.model';

export class TicketWithProjectName {
  constructor(private ticket: Ticket, projectName: string) {
    this.projectName = projectName;
    this._id = this.ticket._id;
    this.title = this.ticket.title;
    this.description = this.ticket.description;
    this.status = this.ticket.status;
    this.priority = this.ticket.priority;
    this.submitter_id = this.ticket.submitter_id;
    this.comments = this.ticket.comments;
    this.assigns = this.ticket.assigns;
    this.attachments = this.ticket.attachments;
    this.createdAt = this.ticket.createdAt;
    this.updatedAt = this.ticket.updatedAt;
  }

  _id: string = '';
  projectName: string = '';
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
