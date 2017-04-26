import { Component,ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MainPage} from '../Main/Main';
import { MoodDiagramsPage} from '../MoodDiagrams/MoodDiagrams';
import { MoodTablePage} from '../MoodTable/MoodTable';

import { Chart } from 'chart.js';


@Component({
  selector: 'page-Statistics',
  templateUrl: 'Statistics.html'
})




export class StatisticsPage {

  @ViewChild('barCanvas') barCanvas;
 
    barChart: any;

  constructor(public navCtrl: NavController) {}

   ionViewDidLoad() {

 Chart.plugins.register({
        afterDatasetsDraw: function(chartInstance, easing) {
            // To only draw at the end of animation, check for easing === 1
            var ctx = chartInstance.chart.ctx;

            chartInstance.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                        // Draw the text in black, with the specified font
                        ctx.fillStyle = 'rgb(3, 144, 156)';

                        var fontSize = 12;
                        var fontStyle = 'bold';
                        var fontFamily = 'roboto'; 
                        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                        // Just naively convert to string for now
                        var dataString = dataset.data[index].toString();

                        // Make sure alignment settings are correct
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        var padding = -15;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            });
        }
    });

this.barChart = new Chart(this.barCanvas.nativeElement, {

    
      
      type: 'bar',
            data: {
                labels: ["", "", "", ""],
                datasets: [{
                    data: [12, 19, 3, 5],
                    
                    backgroundColor: 
           [
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)'
                    ],
                    borderColor: [
                        'rgba(255,255,255,0)',
                        'rgba(255, 255, 255, 0)',
                        'rgba(255, 255, 255, 0)',
                        'rgba(255, 255, 255, 0)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                tooltips: {enabled: false},
                hover: {mode: null},
              legend:{
                display:false
              },
             scales: {
               ticks: {
                      beginAtZero:true
                        },
                xAxes: [{
                  barPercentage: 1.2,
                   ticks:{
                    display:false,
                  },
                gridLines: {
                   display:false,
                   
                    }
                 }],
                yAxes: [{
                  ticks:{
                    display:false,
                     
                  },
                  gridLines: {
                  display:false,
                  color:"rgba(255,255,255,0)",
                   zeroLineColor:"rgba(255,255,255,1)",
                   drawBorder: false,
                   }   
                 }]
    }
            }
 
        });
   }






   
 backButton(){
      this.navCtrl.push(MainPage);
  }

   MoodDiagrams(){
      this.navCtrl.push(MoodDiagramsPage);
  }
   MoodTable(){
      this.navCtrl.push(MoodTablePage);
  }
}
