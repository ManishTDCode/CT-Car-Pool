import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.css']
})
export class ChartDataComponent implements OnInit {
  selectedCountry: string = '';
  selectedProduct: string = '';
  chartCountry: any;
  indianStates = ['Delhi', 'Mumbai', 'Bangalore'];
  indianProductsIphone = [30, 20, 10];
  indianProductsSamsung = [20, 40, 30];
  indianColor = ['blue', 'purple', 'pink'];
  usStates = ['New York', 'Los Angeles', 'Chicago'];
  usProductsIphone = [25, 15, 10];
  usProuctsSamsung = [15, 30, 20];
  usColors = ['red', 'green', 'yellow'];

  constructor() {}

  ngOnInit(): void {
    this.createChartCountry();
  }

  createChartCountry() {
    this.chartCountry = new Chart("MyChartCountry", {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Product Sold',
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  updateChart() {
    if (this.selectedCountry === 'India' && this.selectedProduct === 'IPhone') {
      this.updateChartData(this.indianStates, this.indianProductsIphone, this.indianColor);
    } else if (this.selectedCountry === 'USA' && this.selectedProduct === 'IPhone') {
      this.updateChartData(this.usStates, this.usProductsIphone, this.usColors);
    } else if (this.selectedCountry === 'India' && this.selectedProduct === 'Samsung') {
      this.updateChartData(this.indianStates, this.indianProductsSamsung, this.indianColor);
    } else if (this.selectedCountry === 'USA' && this.selectedProduct === 'Samsung') {
      this.updateChartData(this.usStates,this.usProuctsSamsung , this.usColors);
    } else {
      this.updateChartData([], [], []);
    }
  }

  updateChartData(labels: string[], data: number[], backgroundColors: string[]) {
    this.chartCountry.data.labels = labels;
    this.chartCountry.data.datasets[0].data = data;
    this.chartCountry.data.datasets[0].backgroundColor = backgroundColors;
    this.chartCountry.update();
  }

}
