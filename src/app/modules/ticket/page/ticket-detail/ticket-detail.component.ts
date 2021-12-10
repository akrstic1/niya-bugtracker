import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assign } from 'src/app/data/model/assign.model';
import { Project } from 'src/app/data/model/project.model';
import { Ticket } from 'src/app/data/model/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  projectData!: Project;
  ticketData!: Ticket;
  assingsTableDataSource: Assign[] = [];
  displayedColumns: string[] = [
    'assignedByUser_id',
    'assignedToUser_id',
    'assignedDate',
  ];

  constructor(private route: ActivatedRoute) {
    this.projectData = this.route.snapshot.data['ticketDetailResponse'];
    this.ticketData = this.projectData.tickets[0];

    //Fill in data source
    this.assingsTableDataSource = this.ticketData.assigns;
  }

  ngOnInit(): void {}
}
