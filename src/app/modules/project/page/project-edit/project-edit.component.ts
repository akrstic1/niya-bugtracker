import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit {
  projectToEdit!: Project;
  constructor(private route: ActivatedRoute) {
    this.projectToEdit = this.route.snapshot.data['projectToEditResponse'];
  }

  ngOnInit(): void {}
}
