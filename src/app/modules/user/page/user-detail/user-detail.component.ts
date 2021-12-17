import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Project } from 'src/app/data/model/project.model';
import { Ticket } from 'src/app/data/model/ticket.model';
import { User } from 'src/app/data/model/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  currentUser!: User;
  currentUserRoles!: string;
  userInfoResponse!: Project[];

  userInfoProjects: Project[] = [];
  userInfoSubmittedTickets: Ticket[] = [];
  userInfoAssignedTickets: Ticket[] = [];

  constructor(
    private _authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this._authService.user;
    this.currentUserRoles = this.currentUser.roles
      .map((x) => x.name)
      .join(', ');

    //Mapping out users tickets and projects for table display
    this.userInfoResponse = this.route.snapshot.data['userInfoResponse'];

    //Assigned projects
    this.userInfoProjects = this.userInfoProjects.concat(
      this.userInfoResponse.filter((project) => {
        return project.users.filter((user) => {
          return user._id == this.currentUser._id;
        });
      })
    );
    this.userInfoResponse.forEach((project) => {
      //Submitted tickets
      this.userInfoSubmittedTickets = this.userInfoSubmittedTickets.concat(
        project.tickets.filter((ticket) => {
          return ticket.submitter_id._id == this.currentUser._id;
        })
      );

      //Assigned tickets
      this.userInfoAssignedTickets = this.userInfoAssignedTickets.concat(
        project.tickets.filter((ticket) => {
          if (ticket.assigns.length != 0) {
            return (
              ticket.assigns[ticket.assigns.length - 1].assignedToUser_id._id ==
              this.currentUser._id
            );
          } else {
            return false;
          }
        })
      );
    });
  }
}
