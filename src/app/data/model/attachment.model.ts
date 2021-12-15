import { User } from './user.model';

export class Attachment {
  _id: string = '';
  fileName: string = '';
  uploader_id: User = new User();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
