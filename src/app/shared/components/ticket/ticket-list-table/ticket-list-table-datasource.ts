import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ticket } from 'src/app/data/model/ticket.model';

/**
 * Data source for the TicketListTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TicketListTableDataSource extends DataSource<Ticket> {
  data: Ticket[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Ticket[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Ticket[]): Ticket[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Ticket[]): Ticket[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'submitter_fullName':
          return compare(
            a.submitter_id.fullName,
            b.submitter_id.fullName,
            isAsc
          );
        case 'assignedTo_fullName': {
          compare(
            a.assigns[0]?.assignedToUser_id.fullName,
            b.assigns[0]?.assignedToUser_id.fullName,
            isAsc
          );
          return compareStatus(a.status, b.status, isAsc);
        }

        case 'priority':
          return comparePriority(a.priority, b.priority, isAsc);
        case 'status':
          return compareStatus(a.status, b.status, isAsc);
        case 'createdAt':
          return compareDate(a.createdAt, b.createdAt, isAsc);
        case 'updatedAt':
          return compareDate(a.updatedAt, b.updatedAt, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number | null,
  b: string | number | null,
  isAsc: boolean
): number {
  if (a == null) {
    return 1;
  }
  if (b == null) return -1;
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function comparePriority(a: string, b: string, isAsc: boolean): number {
  const prioritySort = ['Low', 'Medium', 'High', 'Very High'];

  return (
    (prioritySort.indexOf(a) < prioritySort.indexOf(b) ? -1 : 1) *
    (isAsc ? 1 : -1)
  );
}

function compareStatus(a: string, b: string, isAsc: boolean): number {
  const statusSort = ['Closed/Inactivity', 'Resolved', 'Open'];

  return (
    (statusSort.indexOf(a) < statusSort.indexOf(b) ? 1 : -1) * (isAsc ? 1 : -1)
  );
}

function compareDate(a: Date, b: Date, isAsc: boolean): number {
  return (new Date(a) < new Date(b) ? -1 : 1) * (isAsc ? 1 : -1);
}
