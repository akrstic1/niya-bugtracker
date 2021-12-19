import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ticket } from 'src/app/data/model/ticket.model';
import { TicketListTableDataSource } from './ticket-list-table-datasource';

@Component({
  selector: 'app-ticket-list-table',
  templateUrl: './ticket-list-table.component.html',
  styleUrls: ['./ticket-list-table.component.scss'],
})
export class TicketListTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Ticket>;
  dataSource: TicketListTableDataSource;

  @Input() ticketData: Ticket[] = [];

  showClosedTickets: boolean = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'title',
    'status',
    'priority',
    'submitter_fullName',
    'assignedTo_fullName',
    'createdAt',
    'updatedAt',
    'action',
  ];

  constructor() {
    this.dataSource = new TicketListTableDataSource();
  }

  ngOnInit(): void {
    //Assign array sort for correct displaying of assigned user
    this.ticketData.map((ticket) => {
      ticket.assigns = ticket.assigns.sort((a, b) => {
        return (
          this.getTime(new Date(b.assignedDate)) -
          this.getTime(new Date(a.assignedDate))
        );
      });
    });

    //Sort tickets by update time and status
    this.ticketData.sort((a, b) => {
      return (
        this.getTime(new Date(a.updatedAt)) -
        this.getTime(new Date(b.updatedAt))
      );
    });

    const statusSort = ['Closed/Inactivity', 'Resolved', 'Open'];
    this.ticketData.sort((a, b) => {
      return statusSort.indexOf(a.status) < statusSort.indexOf(b.status)
        ? 1
        : -1;
    });

    //Put data into datasource for table
    this.dataSource.data = this.ticketData;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public showTickets() {
    this.showClosedTickets = true;

    this.dataSource.data = this.ticketData;
    this.table.dataSource = this.dataSource.connect();
  }

  public hideTickets() {
    this.showClosedTickets = false;

    const filteredTickets = this.ticketData.filter((data) => {
      return data.status == 'Open';
    });

    this.dataSource.data = filteredTickets;
    this.table.dataSource = this.dataSource.connect();
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
