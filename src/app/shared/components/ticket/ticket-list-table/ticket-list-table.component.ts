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
    this.dataSource.data = this.ticketData;
    console.log(this.ticketData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
