import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Role } from 'src/app/data/model/role.model';
import { User } from 'src/app/data/model/user.model';
import { UserListTableDataSource } from './user-list-table-datasource';

@Component({
  selector: 'app-user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss'],
})
export class UserListTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  @Input() userData: User[] = [];
  @Input() editRoles: boolean = false;
  dataSource: UserListTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullName', 'username', 'roles'];

  constructor() {
    this.dataSource = new UserListTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.data = this.userData;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getRoleNamesString(roleList: Role[]): string {
    return roleList
      .map((role) => {
        return role.name;
      })
      .join(', ');
  }
}
