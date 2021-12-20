import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from 'src/app/core/service/auth.service';
import { Project } from 'src/app/data/model/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent {
  projectData: Project = new Project();

  canCreateTicket!: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public _authService: AuthService,
    private _permissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.projectData = this.route.snapshot.data['projectDetailResponse'];

    this.createTicketPermission();
  }

  ngOnDestroy() {
    this._permissionsService.removePermission('canCreateTicket');
  }

  createTicketPermission() {
    const currentUser = this._authService.user;

    //if user assigned to project
    this.canCreateTicket = this.projectData.users.some((x) => {
      return x._id == currentUser._id;
    });
    if (this.canCreateTicket) {
      this._permissionsService.addPermission('canCreateTicket');
    }
  }
}
