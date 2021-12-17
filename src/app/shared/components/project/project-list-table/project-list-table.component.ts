import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Project } from 'src/app/data/model/project.model';
import { ProjectService } from 'src/app/data/service/project.service';
import { ConfirmationDialogComponent } from '../../other/confirmation-dialog/confirmation-dialog.component';
import { ProjectListTableDataSource } from './project-list-table-datasource';

@Component({
  selector: 'app-project-list-table',
  templateUrl: './project-list-table.component.html',
  styleUrls: ['./project-list-table.component.scss'],
})
export class ProjectListTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Project>;
  dataSource: ProjectListTableDataSource;

  @Input() projectData: Project[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'users', 'tickets', 'action'];

  constructor(
    private dialog: MatDialog,
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new ProjectListTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.data = this.projectData;
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
