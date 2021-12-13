import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Assign } from 'src/app/data/model/assign.model';
import { Project } from 'src/app/data/model/project.model';
import { CreateCommentRequest } from 'src/app/data/model/request/create-comment-request.model';
import { Ticket } from 'src/app/data/model/ticket.model';
import { CommentService } from 'src/app/data/service/comment.service';
import { TicketService } from 'src/app/data/service/ticket.service';

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

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _commentService: CommentService,
    private _ticketService: TicketService
  ) {
    this.projectData = this.route.snapshot.data['ticketDetailResponse'];
    this.ticketData = this.projectData.tickets[0];

    //Fill in data source
    this.assingsTableDataSource = this.ticketData.assigns;
  }

  ngOnInit(): void {
    this.createCommentForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  createComment(): void {
    if (this.createCommentForm.valid) {
      var createCommentRequest: CreateCommentRequest =
        new CreateCommentRequest();
      createCommentRequest.message =
        this.createCommentForm.get('message')!.value;
      console.log('asdasdas');
      this._commentService
        .createComment(createCommentRequest, this.ticketData._id)
        .subscribe({
          next: (res) => {
            this._snackBar.open(`Comment successfully created!`, 'Close', {
              duration: 3000,
            });
            //refresh ticket data and clear input field
            //after successful comment post
            this._ticketService.getByIdTicket(this.ticketData._id).subscribe({
              next: (res) => {
                this.projectData = res;
                this.ticketData = this.projectData.tickets[0];
              },
            });
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
}
