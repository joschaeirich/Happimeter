import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../Main/Main';
import { MoodDiagramsPage } from '../MoodDiagrams/MoodDiagrams';
import { MoodTablePage } from '../MoodTable/MoodTable';
import { Auth } from '../../providers/auth';
import { Chart } from 'chart.js';


import { Http, Headers } from '@angular/http';

@Component({
    selector: 'page-Statistics',
    templateUrl: 'Statistics.html'
})




export class StatisticsPage {

    @ViewChild('barCanvas') barCanvas;

    barChart: any;
    moodOccurenceHappy: any;
    moodOccurenceChill: any;
    moodOccurenceAngry: any;
    moodOccurenceSad: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) { }

    ionViewDidLoad() {


        var url = "http://www.pascalbudner.de:8080/v1";

        var headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + this.auth.token);


/*
        Chart.plugins.register({
            afterDatasetsDraw: function (chartInstance, easing) {
                // To only draw at the end of animation, check for easing === 1
                var ctx = chartInstance.chart.ctx;

                chartInstance.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgb(255, 255, 255)';

                            var fontSize = 12;
                            var fontStyle = 'bold';
                            var fontFamily = 'roboto';
                            ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            var dataString = dataset.data[index].toString();

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            var padding = 7;
                            var position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                        });
                    }
                });
            }
        });
*/

        this.http.get(url + "/statistics/mood_distribution", { "headers": headers }).map(res => res.json()).subscribe(res => {
            var moodChart = [0,0,0,0];


            for (var i = 0; i < res.mood_distribution.length; ++i) {
                if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 1) {
                    moodChart[0] = res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 1) {
                    moodChart[1] = res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 0) {
                    moodChart[2] = res.mood_distribution[i].count;
                } else {
                    moodChart[3] = res.mood_distribution[i].count;
                }
            };

    
           this.moodOccurenceHappy = moodChart[0];
           this.moodOccurenceChill = moodChart[1];
           this.moodOccurenceAngry = moodChart[2];
           this.moodOccurenceSad = moodChart[3];

           // console.log("moodChart")
           // console.log(moodChart)

            this.barChart = new Chart(this.barCanvas.nativeElement, {





                type: 'bar',
                data: {
                    labels: ["", "", "", ""],
                    datasets: [{
                        data: moodChart,
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
                    tooltips: { enabled: false },
                    hover: { mode: null },
                    legend: {
                        display: false
                    },
                    scales: {
                        ticks: {
                            beginAtZero: true
                        },
                        xAxes: [{
                            barPercentage: 1.2,
                            ticks: {
                                display: false,
                            },
                            gridLines: {
                                display: false,

                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,

                            },
                            gridLines: {
                                display: false,
                                color: "rgba(255,255,255,0)",
                                zeroLineColor: "rgba(255,255,255,1)",
                                drawBorder: false,
                            }
                        }]
                    }
                }

            });
        });
    }







    backButton() {
        this.navCtrl.push(MainPage);
    }

    MoodDiagrams() {
        this.navCtrl.push(MoodDiagramsPage);
    }
    MoodTable() {
        this.navCtrl.push(MoodTablePage);
    }
}
