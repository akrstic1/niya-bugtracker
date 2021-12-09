import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';
import { ProjectService } from 'src/app/data/service/project.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/other/confirmation-dialog/confirmation-dialog.component';
import { ProjectListDataSource } from './project-list-datasource';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Project>;
  dataSource: ProjectListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'users', 'tickets', 'action'];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new ProjectListDataSource(route);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  deleteProjectDialog(projectName: string, projectId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '450px',
      data: `Are you sure you want to delete project: ${projectName}?`,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this._projectService.deleteProject(projectId).subscribe({
          next: (res) => {
            this.dataSource.data = this.dataSource.data.filter(
              (item) => item._id !== projectId
            );
            this.table.dataSource = this.dataSource.connect();
            this._snackBar.open(`Project successfully deleted!`, 'Close', {
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
}
