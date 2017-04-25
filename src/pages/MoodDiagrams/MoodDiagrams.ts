import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MainPage } from '../Main/Main';

import * as $ from 'jquery';



@Component({
    selector: 'page-MoodDiagrams',
    templateUrl: 'MoodDiagrams.html'
})
export class MoodDiagramsPage {




    // Background Color 00BCD4
    // Dark Color 005E6A

    chartOptions: any;
    chartOptions1: any;

    saveInstance(chart) {
        chart.setSize(
            $(document).width(),
            $(document).height() / 2,
            false
        );
    }

    constructor(public navCtrl: NavController, public navParams: NavParams) { }




    ionViewDidLoad() {


        // activity_array speichert alle aktivitätsdaten 
        var activity_array = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 3.0,
            4.0, 5.0, 4.0, 3.0, 7.0, 8.0, 3.0, 2.0, 2.0, 1.0, 1.0, 3.0, 2.0, 1.0];
        // activity_array_1 ist activity_array + 2 
        var activity_array_1 = [];

        for (var i = 0; i < activity_array.length; ++i) {
            activity_array_1[i] = activity_array[i] + 2;
        }

        // bpm_array speichert alle pulsdaten
        var bpm_array = [20, 10, 10, 5, 15, 20, 60, 70, 80, 40, 30, 60, 50, 80, 100, 120, 130, 110, 80, 70, 60, 40, 50, 30];
        // bpm_array_1 ist bpm_array + 2 
        var bpm_array_1 = [];

        for (var i = 0; i < bpm_array.length; ++i) {

            bpm_array_1[i] = bpm_array[i] + 60;
        }

        var opacity = 0.5;


        this.chartOptions = {

            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: 'transparent',

                style: {
                    fontFamily: 'roboto',
                },

                type: 'spline'
            },


            title: {
                text: null,
            },

            subtitle: {
                display: false,
            },
            xAxis: {
                categories: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'
                    , '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
                    , '20:00', '21:00', '22:00', '23:00', '24:00',],
                labels: {

                    style: {
                        color: '#FFFFFF'
                    }
                }
            },
            yAxis: {
                max: 12,
                title: {
                    text: null
                },

                labels: {
                    enabled: false//default is true            
                },

                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,


                plotBands: [{
                    from: 0,
                    to: 2,
                    color: 'transparent',
                    label: {
                        text: 'Low Acitvity',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 2.05,
                    to: 4,
                    color: 'transparent',
                    label: {
                        text: 'Moderate Acitvity',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 4.05,
                    to: 6,
                    color: 'transparent',
                    label: {
                        text: 'High Acitvity',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 6.05,
                    to: 8,
                    color: 'transparent',
                    label: {
                        text: 'Very high Acitvity',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }],
                plotLines: [{
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 2,
                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 4,
                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 6,
                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 8
                }]
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    lineWidth: 3,
                    marker: {
                        radius: 0,
                        lineWidth: 0,
                        //enabled: false,

                    }
                }
            },
            series: [{
                color: '#FFFFFF',
                enableMouseTracking: false,
                showInLegend: false,

                marker: {
                    enabled: false,
                },
                data: activity_array
            },


            {
                lineWidth: 0,
                enableMouseTracking: false,
                showInLegend: false,



                data: [activity_array_1[0], activity_array_1[1], activity_array_1[2], activity_array_1[3], activity_array_1[4], activity_array_1[5],
                activity_array_1[6], activity_array_1[7], activity_array_1[8],
                { y: activity_array_1[9], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)' } },
                activity_array_1[10], activity_array_1[11],
                { y: activity_array_1[12], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)' } },
                activity_array_1[13], activity_array_1[14],
                { y: activity_array_1[15], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)' } },
                activity_array_1[16], activity_array_1[17],
                { y: activity_array_1[18], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)' } },
                activity_array_1[19], activity_array_1[20],
                { y: activity_array_1[21], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley1_30x30.png)' } },
                activity_array_1[22], activity_array_1[23],
                { y: activity_array_1[24], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley3_30x30.png)' } },
                ]

            }],

        };





        this.chartOptions1 = {

            credits: {
                enabled: false
            },
            chart: {
                backgroundColor: 'transparent',

                style: {
                    fontFamily: 'roboto',
                },

                type: 'spline'
            },


            title: {

                text: null,

            },

            subtitle: {
                display: false,
            },
            xAxis: {
                categories: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'
                    , '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
                    , '20:00', '21:00', '22:00', '23:00', '24:00',],
                labels: {

                    style: {
                        color: '#FFFFFF'
                    }
                }
            },
            yAxis: {
                max: 180,
                title: {
                    text: null
                },

                labels: {
                    enabled: false//default is true            
                },

                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,


                plotBands: [{
                    from: 0,
                    to: 40,
                    color: 'transparent',
                    label: {
                        text: 'Heart rate: 40',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 41.5,
                    to: 80,
                    color: 'transparent',
                    label: {
                        text: 'Heart rate: 80',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 81.05,
                    to: 120,
                    color: 'transparent',
                    label: {
                        text: 'Heart rate: 120',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }, {
                    from: 121.05,
                    to: 160,
                    color: 'transparent',
                    label: {
                        text: 'Heart rate: 160',
                        style: {
                            color: '#FFFFFF',
                            fontSize: '11px',
                            opacity: opacity
                        }
                    }
                }],
                plotLines: [{
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 40,

                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 80
                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 120
                },
                {
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 2,
                    dashStyle: 'ShortDot',
                    value: 160
                }]
            },

            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    lineWidth: 3,
                    marker: {
                        radius: 0,
                        lineWidth: 0,
                        //enabled: false,

                    }
                }
            },
            series: [{
                color: '#FFFFFF',
                enableMouseTracking: false,
                showInLegend: false,

                marker: {
                    enabled: false,
                },
                data: bpm_array
            },


            {
                lineWidth: 0,
                enableMouseTracking: false,
                showInLegend: false,



                data: [bpm_array_1[0], bpm_array_1[1], bpm_array_1[2], bpm_array_1[3], bpm_array_1[4], bpm_array_1[5],
                bpm_array_1[6], bpm_array_1[7], bpm_array_1[8],
                { y: bpm_array_1[9], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)' } },
                bpm_array_1[10], bpm_array_1[11],
                { y: bpm_array_1[12], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)' } },
                bpm_array_1[13], bpm_array_1[14],
                { y: bpm_array_1[15], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)' } },
                bpm_array_1[16], bpm_array_1[17],
                { y: bpm_array_1[18], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)' } },
                bpm_array_1[19], bpm_array_1[20],
                { y: bpm_array_1[21], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley1_30x30.png)' } },
                bpm_array_1[22], bpm_array_1[23],
                { y: bpm_array_1[24], marker: { symbol: 'url(assets/Statistics/Smiley30x30/smiley3_30x30.png)' } },
                ]

            }],

        };






        console.log('ionViewDidLoad MoodDiagramsPage');
    }







    backButton() {
        this.navCtrl.push(MainPage);
    }

}
