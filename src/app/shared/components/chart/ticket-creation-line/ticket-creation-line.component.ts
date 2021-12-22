import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Ticket } from 'src/app/data/model/ticket.model';

@Component({
  selector: 'app-ticket-creation-line',
  templateUrl: './ticket-creation-line.component.html',
  styleUrls: ['./ticket-creation-line.component.scss'],
})
export class TicketCreationLineComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() ticketsData: Ticket[] = [];

  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'];
  public lineChartData!: ChartConfiguration['data'];
  constructor() {}

  ngOnInit(): void {
    const currentDate = new Date();
    let newDate = new Date();
    this.lineChartData = {
      datasets: [
        {
          data: [
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 6)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 5)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 4)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 3)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 2)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate() - 1)).getDate()
              );
            }).length,
            this.ticketsData.filter((ticket) => {
              return (
                new Date(ticket.createdAt).getDate() ==
                new Date(newDate.setDate(currentDate.getDate())).getDate()
              );
            }).length,
          ],

          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: [
        new Date(newDate.setDate(currentDate.getDate() - 6)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate() - 5)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate() - 4)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate() - 3)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate() - 2)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate() - 1)).toLocaleDateString(
          'en-GB'
        ),
        new Date(newDate.setDate(currentDate.getDate())).toLocaleDateString(
          'en-GB'
        ),
      ],
    };

    this.lineChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        line: {
          tension: 0,
        },
      },
      plugins: {
        legend: { display: false },
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {},
        'y-axis-0': {
          position: 'left',
        },
      },
    };
  }
}
