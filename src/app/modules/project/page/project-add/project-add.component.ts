import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';
import { CreateProjectRequest } from 'src/app/data/model/request/create-project-request.model';
import { EditProjectRequest } from 'src/app/data/model/request/edit-project-request.model';
import { User } from 'src/app/data/model/user.model';
import { ProjectService } from 'src/app/data/service/project.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss'],
})
export class ProjectAddComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() projectToEdit!: Project;

  createProjectForm!: FormGroup;
  errorMessage!: string;
  userListResponse: User[] = [];
  usersIdOnProjectSet = new Set<string>();

  tableDataSource: User[] = [];
  displayedColumns: string[] = ['fullName', 'username'];

  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      name: [
        this.isEditMode ? this.projectToEdit.name : '',
        [Validators.required],
      ],
      description: [
        this.isEditMode ? this.projectToEdit.description : '',
        [Validators.required],
      ],
    });

    this.userListResponse = this.route.snapshot.data['userListResponse'];

    if (this.isEditMode) {
      this.usersIdOnProjectSet = new Set(
        this.projectToEdit.users.map((x) => x._id)
      );
    }

    //TABLE SETUP
    this.tableDataSource = this.userListResponse;
  }

  createProject(): void {
    if (this.createProjectForm.valid) {
      var createProjectRequest: CreateProjectRequest =
        new CreateProjectRequest();
      createProjectRequest.name = this.createProjectForm.get('name')!.value;
      createProjectRequest.description =
        this.createProjectForm.get('description')!.value;
      createProjectRequest.users = Array.from(this.usersIdOnProjectSet);
      this._projectService.createProject(createProjectRequest).subscribe({
        next: (res) => {
          this._snackBar.open(`Project successfully created!`, 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/index/projects']);
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

  editProject(): void {
    if (this.createProjectForm.valid) {
      var editProjectRequest: EditProjectRequest = new EditProjectRequest();
      editProjectRequest.name = this.createProjectForm.get('name')!.value;
      editProjectRequest.description =
        this.createProjectForm.get('description')!.value;
      editProjectRequest.users = Array.from(this.usersIdOnProjectSet);
      this._projectService
        .editProject(editProjectRequest, this.projectToEdit._id)
        .subscribe({
          next: (res) => {
            this._snackBar.open(`Project successfully edited!`, 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/index/projects']);
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
    if (!this.usersIdOnProjectSet.has(user_id)) {
      this.usersIdOnProjectSet.add(user_id);
    } else {
      this.usersIdOnProjectSet.delete(user_id);
    }
  }
}
