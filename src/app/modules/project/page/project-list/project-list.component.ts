import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  projectData!: Project[];

  constructor(private route: ActivatedRoute) {
    this.projectData = this.route.snapshot.data['projectListResponse'];
  }
}
