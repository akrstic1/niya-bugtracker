import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Ticket } from 'src/app/data/model/ticket.model';

@Component({
  selector: 'app-ticket-priority-bar',
  templateUrl: './ticket-priority-bar.component.html',
  styleUrls: ['./ticket-priority-bar.component.scss'],
})
export class TicketPriorityBarComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() ticketsData: Ticket[] = [];

  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'];
  public barChartData!: ChartData<'bar'>;
  public barChartPlugins = [DataLabelsPlugin];

  ngOnInit() {
    //Only open tickets
    this.ticketsData = this.ticketsData.filter((ticket) => {
      return ticket.status == 'Open';
    });

    this.barChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {},
        y: {},
      },
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
      },
    };

    this.barChartData = {
      labels: ['Low', 'Medium', 'High', 'Very High'],

      datasets: [
        {
          data: [
            this.ticketsData.filter((ticket) => {
              return ticket.priority == 'Low';
            }).length,
            this.ticketsData.filter((ticket) => {
              return ticket.priority == 'Medium';
            }).length,
            this.ticketsData.filter((ticket) => {
              return ticket.priority == 'High';
            }).length,
            this.ticketsData.filter((ticket) => {
              return ticket.priority == 'Very High';
            }).length,
          ],
        },
      ],
    };
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
