import { Component, ViewChild } from "@angular/core";
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Category } from '../models/Category';
import { Budget } from '../models/Budget';
import { Transaction } from '../models/Transaction';
import { TransactionService } from '../services/transaction.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  tabCategories: Category[] = [];
  selectedCategory: string = '';
  tabBudgets: Budget[] = [];
  tabTransactions: Transaction[] = [];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private budgetService: BudgetService,
    private transactionService: TransactionService,
    private categorySer: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categorySer.getCategories().subscribe({
      next: (data: Category[]) => {
        this.tabCategories = data;
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
    this.loadBudgets();
    this.loadTransactions();
    this.createChart();
  }

  createChart() {
    this.chartOptions = {
      series: [
        {
          name: "Actual",
          data: []
        }
      ],
      chart: {
        height: 300,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#00E396"],
      dataLabels: {
        formatter: function (val: any, opts: any) {
          const goals =
            opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
              .goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ["Actual", "Expected"],
        markers: {
          fillColors: ["#00E396", "#775DD0"]
        }
      }
    };
  }

  loadBudgets() {
    this.budgetService.getBudgets().subscribe({
      next: (data: Budget[]) => {
        this.tabBudgets = data;
        console.log("Response data", data);
      },
      error: (e) => {
        alert('Problem');
      }
    });
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.tabTransactions = data;
        console.log('Transactions:', this.tabTransactions); 
        this.updateChart();  // Ensure the chart is updated after transactions are loaded
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  updateChart() {
    const dataSeries = this.tabTransactions.map(transaction => {
      const year = new Date(transaction.createdAt).getFullYear();
      return {
        x: year,
        y: transaction.amount,
        goals: [
          {
            name: transaction.category.nameCat,
            value: 1400,
            strokeWidth: 5,
            strokeColor: "#775DD0"
          }
        ]
      };
    });

    this.chartOptions.series[0].data = dataSeries;
  }


  addBudget(f) {
    this.budgetService.addNewBudget(f.value).subscribe({
      next: (response) => {
        console.log("response", response);
        this.toastr.success('Budget Added Successful!');
      },
      error: (err) => {
        console.log("data", f.value);
        console.log("error", err);
        this.toastr.error(err['error'].message);
      },
    });
  }
}
