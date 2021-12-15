import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Assign } from 'src/app/data/model/assign.model';
import { Attachment } from 'src/app/data/model/attachment.model';
import { Project } from 'src/app/data/model/project.model';
import { CreateCommentRequest } from 'src/app/data/model/request/create-comment-request.model';
import { EditCommentRequest } from 'src/app/data/model/request/edit-comment-request.model';
import { Ticket } from 'src/app/data/model/ticket.model';
import { AttachmentService } from 'src/app/data/service/attachment.service';
import { CommentService } from 'src/app/data/service/comment.service';
import { TicketService } from 'src/app/data/service/ticket.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/other/confirmation-dialog/confirmation-dialog.component';

class AttachmentInfoAndData {
  constructor(attachmentInfo: Attachment, attachmentData: any) {
    this.attachmentInfo = attachmentInfo;
    this.attachmentData = attachmentData;
  }

  attachmentInfo: Attachment = new Attachment();
  attachmentData: any;
}

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  projectData!: Project;
  ticketData!: Ticket;
  assingsTableDataSource: Assign[] = [];
  displayedColumns: string[] = [
    'assignedByUser_id',
    'assignedToUser_id',
    'assignedDate',
  ];

  createCommentForm!: FormGroup;
  @ViewChild('formDirective')
  private formDirective!: NgForm;

  //file upload
  filesToUpload: File[] = [];

  //Attachments to show
  attachmentsBlob: Blob[] = [];
  attachmentDataUrl: any[] = [];
  attachmentInfoAndDataUrls: AttachmentInfoAndData[] = [];

  //comment
  commentToEdit: string = '';
  editCommentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _commentService: CommentService,
    private _ticketService: TicketService,
    private _attachmentService: AttachmentService,
    private dialog: MatDialog
  ) {
    this.projectData = this.route.snapshot.data['ticketDetailResponse'];
    this.ticketData = this.projectData.tickets[0];

    //Fill in data source
    this.assingsTableDataSource = this.ticketData.assigns;

    //Attachments
    this.getAttachments();
  }

  ngOnInit(): void {
    this.createCommentForm = this.fb.group({
      message: ['', [Validators.required]],
    });

    this.editCommentForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  createComment(): void {
    if (this.createCommentForm.valid) {
      var createCommentRequest: CreateCommentRequest =
        new CreateCommentRequest();
      createCommentRequest.message =
        this.createCommentForm.get('message')!.value;
      this._commentService
        .createComment(createCommentRequest, this.ticketData._id)
        .subscribe({
          next: (res) => {
            this._snackBar.open(`Comment successfully created!`, 'Close', {
              duration: 3000,
            });
            this.refreshTicketData();
            this.createCommentForm.reset();
            this.createCommentForm.markAsPristine();
            this.createCommentForm.markAsUntouched();
            this.formDirective.resetForm();
          },
          error: (err) => {
            if (err.status == 400) {
              this._snackBar.open(err.error.message, 'Close', {
                duration: 3000,
              });
            }
            if (err.status == 401) {
              this._snackBar.open(err.error.message, 'Close', {
                duration: 3000,
              });
            }
          },
        });
    }
  }

  uploadImage(): void {
    const formData: FormData = new FormData();
    for (const file of this.filesToUpload) {
      formData.append('images', file, file.name);
    }
    this._attachmentService
      .createAttachment(formData, this.ticketData._id)
      .subscribe({
        next: (res: Project) => {
          this._snackBar.open('Image upload succesful!', 'Close', {
            duration: 3000,
          });
          this.filesToUpload = [];
          this.refreshTicketData();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAttachments(): void {
    this.attachmentInfoAndDataUrls = [];
    this.ticketData.attachments.forEach((attachment) => {
      this._attachmentService.getAttachmentById(attachment._id).subscribe({
        next: (res: Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = () => {
            this.attachmentInfoAndDataUrls.push(
              new AttachmentInfoAndData(attachment, reader.result)
            );
            this.sortAttachments();
          };
        },
      });
    });
  }

  refreshTicketData(): void {
    this._ticketService.getByIdTicket(this.ticketData._id).subscribe({
      next: (res) => {
        this.projectData = res;
        this.ticketData = this.projectData.tickets[0];
        this.getAttachments();
      },
    });
  }

  sortAttachments() {
    this.attachmentInfoAndDataUrls = this.attachmentInfoAndDataUrls.sort(
      (a, b) => {
        return (
          this.getTime(new Date(a.attachmentInfo.createdAt)) -
          this.getTime(new Date(b.attachmentInfo.createdAt))
        );
      }
    );
  }

  deleteAttachmentDialog(attachmentName: string, attachmentId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '450px',
      data: `Are you sure you want to delete attachment: ${attachmentName}?`,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this._attachmentService.deleteAttachment(attachmentId).subscribe({
          next: (res) => {
            this.attachmentInfoAndDataUrls =
              this.attachmentInfoAndDataUrls.filter(
                (item) => item.attachmentInfo._id !== attachmentId
              );
            this._snackBar.open(`Attachment successfully deleted!`, 'Close', {
              duration: 3000,
            });
          },
          error: (err) => {
            this._snackBar.open(`Something went wrong!`, 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editComment(commentId: string) {
    var editCommentRequest: EditCommentRequest = new EditCommentRequest();
    editCommentRequest.message = this.editCommentForm.get('message')!.value;
    this._commentService.editComment(editCommentRequest, commentId).subscribe({
      next: (res) => {
        this._snackBar.open(`Comment successfully edited!`, 'Close', {
          duration: 3000,
        });
        this.commentToEdit = '';
        this.refreshTicketData();
        this.editCommentForm.reset();
        this.editCommentForm.markAsPristine();
        this.editCommentForm.markAsUntouched();
      },
      error: (err) => {
        if (err.status == 400) {
          this._snackBar.open(err.error.message, 'Close', {
            duration: 3000,
          });
        }
        if (err.status == 401) {
          this._snackBar.open(err.error.message, 'Close', {
            duration: 3000,
          });
        }
      },
    });
  }

  deleteComment(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '450px',
      data: `Are you sure you want to delete the comment?`,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this._commentService.deleteComment(commentId).subscribe({
          next: (res) => {
            this.ticketData.comments = this.ticketData.comments.filter(
              (item) => item._id !== commentId
            );
            this._snackBar.open(`Comment successfully deleted!`, 'Close', {
              duration: 3000,
            });
          },
          error: (err) => {
            this._snackBar.open(`Something went wrong!`, 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.filesToUpload.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.filesToUpload.splice(this.filesToUpload.indexOf(event), 1);
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
