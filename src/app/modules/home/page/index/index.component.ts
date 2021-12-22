import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/data/model/project.model';
import { Ticket } from 'src/app/data/model/ticket.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  projectList: Project[] = [];
  ticketList: Ticket[] = [];

  constructor(private route: ActivatedRoute) {
    this.projectList = this.route.snapshot.data['projectListResponse'];

    //Extract all tickets from projectlist
    this.projectList.forEach((project) => {
      this.ticketList = this.ticketList.concat(project.tickets);
    });

    console.log(this.ticketList);
  }

  ngOnInit(): void {}
}
