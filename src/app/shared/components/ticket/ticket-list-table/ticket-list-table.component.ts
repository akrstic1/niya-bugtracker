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
    //Assign array sort for ease of use
    this.ticketData.map((ticket) => {
      ticket.assigns = ticket.assigns.sort((a, b) => {
        return (
          this.getTime(new Date(b.assignedDate)) -
          this.getTime(new Date(a.assignedDate))
        );
      });
    });
    this.dataSource.data = this.ticketData;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
}
