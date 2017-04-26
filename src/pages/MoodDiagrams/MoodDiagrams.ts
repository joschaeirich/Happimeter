import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MainPage } from '../Main/Main';

import * as $ from 'jquery';

import { Http, Headers } from '@angular/http';

//var url: "http://www.pascalbudner.de:8080/v1";

@Component({
    selector: 'page-MoodDiagrams',
    templateUrl: 'MoodDiagrams.html'
})
export class MoodDiagramsPage {

    chartOptions: any;
    chartOptions1: any;

    saveInstance(chart) {
        chart.setSize(
            $(document).width(),
            $(document).height() / 2,
            false
        );
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) { }




    ionViewDidLoad() {
        var opacity = 0.5;
        var url = "http://www.pascalbudner.de:8080/v1";
        var headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + this.auth.token);

        this.http.get(url + "/statistics/movement/24hours", { "headers": headers }).map(res => res.json()).subscribe(res => {
            console.log(res);

            var activity_array = [];

            for (var i = 0; i < res.entries.length; ++i) {
                activity_array.push(res.entries[i].vmc);
            };

            var xaxisTime_array = [];

            for (var i = 0; i < res.entries.length; ++i) {
                
                xaxisTime_array.push(res.entries[i].timestamp.substring(11,13));
                
            };

            var activity_array_1 = [];

            if (activity_array.length == 0) {
                activity_array_1 = [20, 10, 10, 5, 15, 20, 60, 70, 80, 40, 30, 60, 50, 80, 100, 120, 130, 110, 80, 70, 60, 40, 50, 30];
            } else {
                for (var i = 0; i < activity_array.length; ++i) {
                    activity_array_1[i] = activity_array[i] + 2;
                }
            }



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
                    categories: xaxisTime_array,
                    labels: {

                        style: {
                            color: '#FFFFFF'
                        }
                    }
                },
                yAxis: {
                    //max: 12,
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
                    //data:  (activity_array == []) ? [1,2,3,4] : activity_array
                },


                {
                    lineWidth: 0,
                    enableMouseTracking: false,
                    showInLegend: false,


                    /*
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
                    */
                }],

            };

        });



        this.http.get(url + "/statistics/heartrate/24hours", { "headers": headers }).map(res => res.json()).subscribe(res => {


            var bpm_array = [];

            for (var i = 0; i < res.entries.length; ++i) {
                bpm_array.push(res.entries[i].heartrate);
            };


            var bpm_array_1 = [];

            if (bpm_array.length == 0) {
                bpm_array_1 = [20, 10, 10, 5, 15, 20, 60, 70, 80, 40, 30, 60, 50, 80, 100, 120, 130, 110, 80, 70, 60, 40, 50, 30];
            } else {
                for (var i = 0; i < bpm_array.length; ++i) {
                    bpm_array_1[i] = bpm_array_1[i] + 60;
                }
            }

             var xaxisTime_array = [];

            for (var i = 0; i < res.entries.length; ++i) {
                
                xaxisTime_array.push(res.entries[i].timestamp.substring(11,13));
                
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
                    categories: xaxisTime_array,
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


                    /*
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
                    */
                }],

            };



        });


        console.log('ionViewDidLoad MoodDiagramsPage');
    }







    backButton() {
        this.navCtrl.push(MainPage);
    }

}
