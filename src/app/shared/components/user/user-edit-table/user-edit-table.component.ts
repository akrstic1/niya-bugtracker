import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EditUserRequest } from 'src/app/data/model/request/edit-user-request.model';
import { Role } from 'src/app/data/model/role.model';
import { User } from 'src/app/data/model/user.model';
import { UserService } from 'src/app/data/service/user.service';
import { UserEditTableDataSource } from './user-edit-table-datasource';

@Component({
  selector: 'app-user-edit-table',
  templateUrl: './user-edit-table.component.html',
  styleUrls: ['./user-edit-table.component.scss'],
})
export class UserEditTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  @Input() userData: User[] = [];
  @Input() roleData: Role[] = [];
  dataSource: UserEditTableDataSource;

  roleNamesData: string[] = [];

  userIdToEdit: string = '';
  editUserForm!: FormGroup;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'fullName', 'editRoles', 'actions'];

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new UserEditTableDataSource();
  }

  ngOnInit(): void {
    //Set table datasource
    this.dataSource.data = this.userData;

    //Form create
    this.editUserForm = this.fb.group({
      fullName: [[]],
      roles: [[]],
    });

    //Extract role names for displaying
    this.roleNamesData = this.roleData.map((role) => {
      return role.name;
    });

    //Set first user for edit because table resizes for first click(makes it look wonky)
    this.userIdToEdit = this.userData[0]._id;
    this.editUserForm.get('fullName')?.setValue(this.userData[0].fullName);
    this.editUserForm
      .get('roles')!
      .setValue(this.getRoleNameList(this.userData[0].roles));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editUser(userId: string) {
    var editUserRequest: EditUserRequest = new EditUserRequest();

    editUserRequest.fullName = this.editUserForm.get('fullName')!.value;

    //Transform role names into ids
    this.editUserForm.get('roles')!.value.forEach((roleName: string) => {
      const foundRole = this.roleData.find((e) => {
        return e.name == roleName;
      });
      if (foundRole) {
        editUserRequest.roles.push(foundRole._id);
      }
    });

    this._userService.editUser(userId, editUserRequest).subscribe({
      next: (res) => {
        this._snackBar.open(`User successfully edited!`, 'Close', {
          duration: 3000,
        });

        //Make changes without refreshing
        this._userService.getAllUsers().subscribe({
          next: (res) => {
            this.dataSource.data = res;
            this.table.dataSource = this.dataSource.connect();
          },
        });

        //Reposition form to first user
        this.userIdToEdit = this.userData[0]._id;
        this.editUserForm
          .get('roles')!
          .setValue(this.getRoleNameList(this.userData[0].roles));
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

  getRoleNameList(roleList: Role[]): string[] {
    return roleList.map((role) => {
      return role.name;
    });
  }

  getRoleNamesString(roleList: Role[]): string {
    return roleList
      .map((role) => {
        return role.name;
      })
      .join(', ');
  }
}
