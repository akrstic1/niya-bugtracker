import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';
import { CreateTicketRequest } from 'src/app/data/model/request/create-ticket-request.model';
import { EditTicketRequest } from 'src/app/data/model/request/edit-ticket-request.model';
import { Ticket } from 'src/app/data/model/ticket.model';
import { User } from 'src/app/data/model/user.model';
import { AssignService } from 'src/app/data/service/assign.service';
import { TicketService } from 'src/app/data/service/ticket.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
})
export class TicketAddComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  ticketToEdit!: Ticket;

  projectData!: Project;

  createTicketForm!: FormGroup;
  editTicketForm!: FormGroup;
  errorMessage!: string;
  userAssign: string = '';
  initialUserAssign: string = '';

  tableDataSource: User[] = [];
  displayedColumns: string[] = ['fullName', 'username'];

  constructor(
    private fb: FormBuilder,
    private _ticketService: TicketService,
    private _assignService: AssignService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.isEditMode) {
      this.projectData = this.route.snapshot.data['projectDetailResponse'];
    } else {
      this.projectData = this.route.snapshot.data['ticketDetailResponse'];
      this.ticketToEdit = this.projectData.tickets[0];
    }

    if (!this.isEditMode) {
      this.createTicketForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        priority: ['', [Validators.required]],
      });
    } else {
      this.editTicketForm = this.fb.group({
        title: [this.ticketToEdit.title, [Validators.required]],
        description: [this.ticketToEdit.description, [Validators.required]],
        priority: [this.ticketToEdit.priority, [Validators.required]],
        status: [this.ticketToEdit.status, [Validators.required]],
      });
      console.log(this.editTicketForm);
      this.userAssign = this.ticketToEdit.assigns[0].assignedToUser_id?._id;
      this.initialUserAssign = this.userAssign;
    }

    //TABLE SETUP
    this.tableDataSource = this.projectData.users;
  }

  createTicket(): void {
    if (this.createTicketForm.valid) {
      var createTicketRequest: CreateTicketRequest = new CreateTicketRequest();
      createTicketRequest.title = this.createTicketForm.get('title')!.value;
      createTicketRequest.description =
        this.createTicketForm.get('description')!.value;
      createTicketRequest.priority =
        this.createTicketForm.get('priority')!.value;
      createTicketRequest.status = 'Open';

      this._ticketService
        .createTicket(createTicketRequest, this.projectData._id)
        .subscribe({
          next: (res) => {
            if (this.initialUserAssign != this.userAssign) {
              this._assignService
                .createAssign(res._id, this.userAssign)
                .subscribe({
                  next: (assignRes) => {
                    this._snackBar.open(
                      `Ticket successfully created!`,
                      'Close',
                      {
                        duration: 3000,
                      }
                    );

                    this.router.navigate(['/index/tickets/' + res._id]);
                  },
                });
            } else {
              this._snackBar.open(`Ticket successfully created!`, 'Close', {
                duration: 3000,
              });

              this.router.navigate(['/index/tickets/' + res._id]);
            }
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

  editTicket(): void {
    if (this.editTicketForm.valid) {
      var editTicketRequest: EditTicketRequest = new EditTicketRequest();
      editTicketRequest.title = this.editTicketForm.get('title')!.value;
      editTicketRequest.description =
        this.editTicketForm.get('description')!.value;
      editTicketRequest.priority = this.editTicketForm.get('priority')!.value;
      editTicketRequest.status = this.editTicketForm.get('status')!.value;

      this._ticketService
        .editTicket(editTicketRequest, this.ticketToEdit._id)
        .subscribe({
          next: (res) => {
            if (this.initialUserAssign != this.userAssign) {
              this._assignService
                .createAssign(this.ticketToEdit._id, this.userAssign)
                .subscribe({
                  next: (assignRes) => {
                    this._snackBar.open(
                      `Ticket successfully edited!`,
                      'Close',
                      {
                        duration: 3000,
                      }
                    );

                    this.router.navigate([
                      '/index/tickets/' + this.ticketToEdit._id,
                    ]);
                  },
                });
            } else {
              this._snackBar.open(`Ticket successfully edited!`, 'Close', {
                duration: 3000,
              });

              this.router.navigate(['/index/tickets/' + this.ticketToEdit._id]);
            }
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

  userTableClick(user_id: string): void {
    this.userAssign = user_id;
  }
}
