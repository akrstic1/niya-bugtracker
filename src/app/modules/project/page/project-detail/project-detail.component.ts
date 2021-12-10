import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent {
  projectData: Project = new Project();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectData = this.route.snapshot.data['projectDetailResponse'];
  }
}
