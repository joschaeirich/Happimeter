import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MoodDiagramsPage } from '../MoodDiagrams/MoodDiagrams';
import { MoodTablePage } from '../MoodTable/MoodTable';
import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';

import { Http } from '@angular/http';

import * as $ from 'jquery';

@Component({
    selector: 'page-Statistics',
    templateUrl: 'Statistics.html'
})




export class StatisticsPage {



    chartOptions: any;

    saveInstance(chart) {
        chart.setSize(
            $(document).width(),
            $(document).height() / 1.5,
            false
        );
    }

    barChartRealMood: any;
    moodOccurence1: any;
    moodOccurence2: any;
    moodOccurence3: any;
    moodOccurence4: any;
    moodOccurence5: any;
    moodOccurence6: any;
    moodOccurence7: any;
    moodOccurence8: any;
    moodOccurence9: any;


    barChartPrediction: any;
    predMoodOccurence1: any;
    predMoodOccurence2: any;
    predMoodOccurence3: any;
    predMoodOccurence4: any;
    predMoodOccurence5: any;
    predMoodOccurence6: any;
    predMoodOccurence7: any;
    predMoodOccurence8: any;
    predMoodOccurence9: any;

    errormsg: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth,private api: GlobalVariables) { }

    ionViewDidLoad() {

       
        this.api.getMoodDistribution().subscribe(res => {

            if (res.mood_distribution.length == 0) {
                this.errormsg = "We haven't received any sensor data yet =( In order to collect data you need to have a Pebble watch and download the happimeter app at the pebble appstore"
                return;
            }

            var moodChart = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            var totalCount = 0;

            for (var i = 0; i < res.mood_distribution.length; ++i) {

                if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 2) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 1) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 0) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 2) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 1) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 0) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 2) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 1) {
                    totalCount += res.mood_distribution[i].count;
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 0) {
                    totalCount += res.mood_distribution[i].count;
                }
            };

            for (var i = 0; i < res.mood_distribution.length; ++i) {

                if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 2) {
                    moodChart[0] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 1) {
                    moodChart[1] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 0) {
                    moodChart[2] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 2) {
                    moodChart[3] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 1) {
                    moodChart[4] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 0) {
                    moodChart[5] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 2) {
                    moodChart[6] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 1) {
                    moodChart[7] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 0) {
                    moodChart[8] = Math.round((res.mood_distribution[i].count / totalCount) * 100);
                }
            };

            this.moodOccurence1 = moodChart[0];
            this.moodOccurence2 = moodChart[1];
            this.moodOccurence3 = moodChart[2];
            this.moodOccurence4 = moodChart[3];
            this.moodOccurence5 = moodChart[4];
            this.moodOccurence6 = moodChart[5];
            this.moodOccurence7 = moodChart[6];
            this.moodOccurence8 = moodChart[7];
            this.moodOccurence9 = moodChart[8];

            if ((this.moodOccurence1 + this.moodOccurence2 + this.moodOccurence3 + this.moodOccurence4 + this.moodOccurence5
                + this.moodOccurence6 + this.moodOccurence7 + this.moodOccurence8 + this.moodOccurence9) < 100) {
                this.moodOccurence1 = this.moodOccurence1 + 1
            } else if ((this.moodOccurence1 + this.moodOccurence2 + this.moodOccurence3 + this.moodOccurence4 + this.moodOccurence5
                + this.moodOccurence6 + this.moodOccurence7 + this.moodOccurence8 + this.moodOccurence9) > 100) {
                this.moodOccurence1 = this.moodOccurence1 - 1
            }
            // console.log("moodChart")
            // console.log(moodChart)



            this.api.getPredictedMoodDistribution().subscribe(res => {
                var moodChartPrediction = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                var totalCountPrediction = 0;

                for (var i = 0; i < res.mood_distribution.length; ++i) {
                    totalCountPrediction += res.mood_distribution[i].count;
                }

                for (var i = 0; i < res.mood_distribution.length; ++i) {
                    if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 2) {
                        moodChartPrediction[0] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 1) {
                        moodChartPrediction[1] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 2 && res.mood_distribution[i].happiness == 0) {
                        moodChartPrediction[2] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 2) {
                        moodChartPrediction[3] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 1) {
                        moodChartPrediction[4] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 1 && res.mood_distribution[i].happiness == 0) {
                        moodChartPrediction[5] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 2) {
                        moodChartPrediction[6] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 1) {
                        moodChartPrediction[7] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    } else if (res.mood_distribution[i].activation == 0 && res.mood_distribution[i].happiness == 0) {
                        moodChartPrediction[8] = Math.round((res.mood_distribution[i].count / totalCountPrediction) * 100);
                    };
                }

                this.predMoodOccurence1 = moodChartPrediction[0];
                this.predMoodOccurence2 = moodChartPrediction[1];
                this.predMoodOccurence3 = moodChartPrediction[2];
                this.predMoodOccurence4 = moodChartPrediction[3];
                this.predMoodOccurence5 = moodChartPrediction[4];
                this.predMoodOccurence6 = moodChartPrediction[5];
                this.predMoodOccurence7 = moodChartPrediction[6];
                this.predMoodOccurence8 = moodChartPrediction[7];
                this.predMoodOccurence9 = moodChartPrediction[8];


                this.chartOptions = {
                    chart: {
                        backgroundColor: 'transparent',

                    },
                    title: {
                        text: null
                    },


                    xAxis: {
                        lineWidth: 0,
                        minorGridLineWidth: 0,
                        lineColor: 'transparent',
                        minorTickLength: 0,
                        tickLength: 0,
                        labels: {
                            enabled: false
                        },
                    },
                    yAxis: {
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        max: 120,
                        min: -10,
                        minorGridLineWidth: 0,
                        gridLineWidth: 0,
                        alternateGridColor: null,
                    },
                    tooltip: {
                        valueSuffix: ' barPercentage'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                color: 'white',
                                format: '{y} %'
                            },
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: -40,
                        floating: false,
                        color: "#FFFFFF",
                        borderWidth: 0,
                        itemStyle: {
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '11px'
                        }

                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        color: "#FFFFFF",
                        borderColor: '#FFFFFF',
                        name: "Your mood Inputs",
                        enableMouseTracking: false,
                        data: moodChart,
                        type: 'bar'
                    },
                    {
                        color: "#00BCD4",
                        borderColor: '#00BCD4',
                        name: "Our mood Predictions",
                        enableMouseTracking: false,
                        data: moodChartPrediction,
                        type: 'bar'
                    },
                    {

                        type: 'spline',
                        lineWidth: 0,
                        enableMouseTracking: false,
                        showInLegend: false,
                        data: [{
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood1.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood2.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood3.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood4.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood5.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood6.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood7.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood8.png)'
                            }
                        },
                        {
                            y: -10, marker: {
                                symbol: 'url(assets/StatisticBarChartSmiley/mood9.png)'
                            }
                        },
                        ],

                    },

                        /*
                        [ {y: 26.5,marker: {
                                        symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                                    }
                                }, 23.3, 18.3, 13.9, 9.6]
                        */

                    ],
                }
            });
        });



        /*
                        type: 'bar',
                        data: {
                            labels: ["", "", "", "", "", "", "", "", ""],
                            datasets: [{
                                data: moodChartPrediction,
                                backgroundColor:
                                [
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)',
                                    'rgba(255, 255, 255, 1)'
                                ],
                                borderColor: [
                                    'rgba(255,255,255,0)',
                                    'rgba(255, 255, 255, 0)',
                                    'rgba(255, 255, 255, 0)',
                                    'rgba(255, 255, 255, 0)',
                                    'rgba(255, 255, 255, 0)',
                                    'rgba(255, 255, 255, 0)',
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
        */



    }

    calculatChartData() {

    }

    MoodDiagrams() {
        this.navCtrl.push(MoodDiagramsPage);
    }
    MoodTable() {
        this.navCtrl.push(MoodTablePage);
    }
}
