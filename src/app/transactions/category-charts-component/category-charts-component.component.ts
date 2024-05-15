import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-category-charts-component',
  templateUrl: './category-charts-component.component.html',
  styleUrl: './category-charts-component.component.css'
})
export class CategoryChartsComponentComponent {
  constructor(private transactionService: TransactionService){}
  
  data: any;
  dataCategory: any[]=[];
  dataAmount: any[]=[];
  tabTrans=[];
  

  ngOnInit(){
    this.transactionService.getTransactions().subscribe({
      next: (res: Transaction[]) => {
      //  console.log("data",res)
        this.data= res;
        if(this.data!=null){
          const categoryMap = new Map<string, number>();

          for (let i = 0; i < this.data.length; i++) {
            const cat = this.data[i].category.nameCat;
            const amount = this.data[i].amount;
           
            if (categoryMap.has(cat)) {
              categoryMap.set(cat, categoryMap.get(cat)! + amount);
          //    console.log("categorymap",categoryMap)
            } else {
              categoryMap.set(cat, amount);
            }
          }
          this.showChartDataByCategroy(Array.from(categoryMap.keys()), Array.from(categoryMap.values()));
          
        }
      },
      error: (e) => {
        console.log(`Error during the transaction list retrieval: ${e}`);
        alert('Problem');
      }
    });    
  }

  showChartDataByCategroy(dataCategory: any, dataAmount: any) {
    Chart.register(...registerables);
    new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: dataCategory,
        datasets: [
          {
            label: 'Category Summary',
            data: dataAmount,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
  }


}
