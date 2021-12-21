import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/data/model/role.model';
import { User } from 'src/app/data/model/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  userListResponse: User[] = [];
  roleListResponse: Role[] = [];

  constructor(private route: ActivatedRoute) {
    this.userListResponse = this.route.snapshot.data['userListResponse'];
    this.roleListResponse = this.route.snapshot.data['roleListResponse'];
  }
  ngOnInit(): void {}
}
