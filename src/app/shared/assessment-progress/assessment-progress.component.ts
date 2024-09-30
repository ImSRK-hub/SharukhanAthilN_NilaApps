import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartOptions } from 'chart.js/auto';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-assessment-progress',
  templateUrl: './assessment-progress.component.html',
  styleUrl: './assessment-progress.component.css'
})
export class AssessmentProgressComponent  implements OnInit {
  @Input() selectedCourseCode?: string;
  chart: any;
  progressData:any = null;

  constructor(private sharedService : SharedService){}

  ngOnInit(): void {
      this.sharedService.getAssessmentProgressDetails().subscribe(data => {
       let completeprogressDetails = data['courseProgressDetails'];
        for(let PD of completeprogressDetails){
          if(PD['courseCode'] == this.selectedCourseCode ){
            console.log("PD ^^^^^",PD);
            this.progressData = PD;
            break;
          }
        }
        console.log("progress data %%%%%",this.progressData)
        this.createChart();
      });
  }

  generateDatasets(){
    let generatedDataSet =[]
    this.progressData['ProgressDetails'].forEach( (data,i) => {
      generatedDataSet.push(
        {
          label: data.label,
          data: this.sortPending(data.values),
          backgroundColor: this.generateColors(data.values),
          spanGaps:true
        },
        
      );
    });
    console.log("generated Data set **************",generatedDataSet)
    return generatedDataSet;
  }

  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const labels = this.progressData.labels; 

    const datasets = this.generateDatasets();
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:labels,
        datasets:datasets
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 25,
              callback: (value) => `${value}%`,
              autoSkip: false
            },
            grid: {
              display: true 
            }
          }
        },
        plugins: {
          tooltip: {
          enabled:false
          },
          legend: {
            display: false,
          }
        },
        
      },
      
    });



  }

  generateColors(data: any[]): string[] {
    return data.map(item => {
      if (item === -1) {
        return '#e8e8e8'; 
      } else {
        return '#91b07c'; 
      }
    });
  }
  sortPending(data: any[]): number[] {
    return data.map(item => {
      if (item === -1) {
        return 100;
      } else {
        return item;
      }
    });
  }


}