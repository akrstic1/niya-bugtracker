import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Ticket } from 'src/app/data/model/ticket.model';

@Component({
  selector: 'app-ticket-status-pie',
  templateUrl: './ticket-status-pie.component.html',
  styleUrls: ['./ticket-status-pie.component.scss'],
})
export class TicketStatusPieComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() ticketsData: Ticket[] = [];

  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'];
  public pieChartData!: ChartData<'pie', number[], string>;
  public pieChartPlugins = [DatalabelsPlugin];

  ngOnInit() {
    this.pieChartOptions = {
      maintainAspectRatio: false,
      responsive: true,
    };

    this.pieChartData = {
      labels: ['Open', 'Resolved', 'Closed'],
      datasets: [
        {
          data: [
            this.ticketsData.filter((ticket) => {
              return ticket.status == 'Open';
            }).length,
            this.ticketsData.filter((ticket) => {
              return ticket.status == 'Resolved';
            }).length,
            this.ticketsData.filter((ticket) => {
              return ticket.status == 'Closed/Inactivity';
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
