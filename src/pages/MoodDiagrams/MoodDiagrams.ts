import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { MainPage } from '../Main/Main';

import * as $ from 'jquery';
import * as moment from 'moment';
//import 'moment/locale/pt-br';

import { Http, Headers } from '@angular/http';


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


        var date = moment();
        var last24hours = [];

        for (var i = 1; i <= 24; i++) {
            last24hours[i - 1] = date.clone().subtract("hours", i).format('HH')
        }

        last24hours.reverse();

        console.log(last24hours)





        var opacity = 0.5;


        var url = "http://www.pascalbudner.de:8080/v1";

        var headers: Headers = new Headers();
        headers.append("Authorization", "Bearer " + this.auth.token);




        this.http.get(url + "/statistics/happiness/24hours", { "headers": headers }).map(hap => hap.json()).subscribe(hap => {


            this.http.get(url + "/statistics/activation/24hours", { "headers": headers }).map(act => act.json()).subscribe(act => {

                this.http.get(url + "/statistics/movement/24hours", { "headers": headers }).map(res => res.json()).subscribe(res => {
                    var happiness_array = [];

                    for (var i = 0; i < hap.entries.length; ++i) {
                        happiness_array.push(hap.entries[i].happiness);
                    };
                    //console.log("happiness array" + happiness_array);

                    var pleasance_array = [];

                    for (var i = 0; i < act.entries.length; ++i) {
                        pleasance_array.push(act.entries[i].activation);
                    };
                    //console.log("pleasance array" + pleasance_array);

                    var mood_array = [];

                    for (var i = 0; i < act.entries.length; ++i) {
                        if (happiness_array[i] == 1 && pleasance_array[i] == 1) {
                            mood_array[i] = 0;
                        } else if (happiness_array[i] == 1 && pleasance_array[i] == 0) {
                            mood_array[i] = 1;
                        } else if (happiness_array[i] == 0 && pleasance_array[i] == 1) {
                            mood_array[i] = 2;
                        } else {
                            mood_array[i] = 3;
                        }

                    }
                    // console.log("mood array");
                    //  console.log(mood_array);


                    var moodtimestamp_array = [];

                    for (var i = 0; i < act.entries.length; ++i) {

                        moodtimestamp_array.push(act.entries[i].timestamp.substring(11, 13));

                    };
                    // console.log("timestamps mood");
                    // console.log(moodtimestamp_array);

                    var zones = [];
                    for (var i = 0; i < moodtimestamp_array.length; ++i) {

                        var obj: any = {}
                        obj.value = moodtimestamp_array[i];
                        obj.moodValue = mood_array[i];

                        if (mood_array[i] == 0) {
                            //Happy = Rot
                            obj.color = '#6DEEFF';
                            obj.moodName = "happy";
                        } else if (mood_array[i] == 1) {
                            //Chill = Grun
                            obj.color = '#FFFFFF';
                            obj.moodName = "chill";
                        } else if (mood_array[i] == 2) {
                            //Angry = Blue
                            obj.color = '#00414A';
                            obj.moodName = "angry";
                        } else {
                            //Sad = Violett
                            obj.color = '#6B7273';
                            obj.moodName = "sad";
                        }

                        zones.push(obj);
                    };

                    //console.log("zones");
                    //console.log(zones);





                    var activity_array = [];

                    for (var i = 0; i < res.entries.length; ++i) {
                        activity_array.push({
                            y: res.entries[i].vmc,
                            color: '#00FF00',
                        });

                    };






                    var xaxisTime_array = [];
                    for (var i = 0; i < res.entries.length; ++i) {

                        xaxisTime_array.push(moment.utc(res.entries[i].timestamp).local());
                    };


                    if (moment().isDST() == false) {
                        for (var i = 0; i < xaxisTime_array.length; i++) {
                            xaxisTime_array[i] = xaxisTime_array[i].substract("hours", 1).format("HH");
                        }
                        }else{
                        for (var i = 0; i < xaxisTime_array.length; i++) {
                            xaxisTime_array[i] = xaxisTime_array[i].format("HH");
                        }
                    } 
                        
                    












                    var activity_array_1 = [];

                    if (activity_array.length == 0) {
                        activity_array_1 = [20, 10, 10, 5, 15, 20, 60, 70, 80, 40, 30, 60, 50, 80, 100, 120, 130, 110, 80, 70, 60, 40, 50, 30];
                    } else {
                        for (var i = 0; i < activity_array.length; ++i) {
                            activity_array_1[i] = activity_array[i] + 20000;

                        }
                    }
                    console.log(activity_array)
                    var maxYaxis = 140000;


                    this.chartOptions = {
                        plotAreaWidth: 300,
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
                            tickInterval: 1,

                            labels: {

                                style: {
                                    color: '#FFFFFF',
                                    width: '300px'
                                }
                            }
                        },
                        yAxis: {

                            max: maxYaxis,
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
                                to: 10000,
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
                                from: 10000,
                                to: 40000,
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
                                from: 40000,
                                to: 80000,
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
                                from: 80000,
                                to: maxYaxis - 20000,
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
                                value: 10000,
                            },
                            {
                                color: 'rgba(255, 255, 255, 0.5)',
                                width: 2,
                                dashStyle: 'ShortDot',
                                value: 40000,
                            },
                            {
                                color: 'rgba(255, 255, 255, 0.5)',
                                width: 2,
                                dashStyle: 'ShortDot',
                                value: 80000,
                            },
                            {
                                color: 'rgba(255, 255, 255, 0.5)',
                                width: 2,
                                dashStyle: 'ShortDot',
                                value: 120000
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
                                    radius: 2,
                                    lineWidth: 2,
                                    //enabled: false,

                                }
                            }
                        },
                        series: [{

                            enableMouseTracking: false,
                            showInLegend: false,

                            marker: {
                                enabled: false,
                            },
                            zoneAxis: 'x',
                            zones: zones,
                            data: activity_array
                        },


                        ],



                    };





                    this.http.get(url + "/statistics/raw_heartrate", { "headers": headers }).map(res => res.json()).subscribe(res => {


                        var bpm_array = [];

                        for (var i = 0; i < res.entries.length; ++i) {
                            bpm_array.push(res.entries[i].heartrate);
                        };

                        //console.log("bpm array " + bpm_array);
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

                            xaxisTime_array.push(res.entries[i].timestamp.substring(11, 13));

                        };
                        // console.log("BPM Timestamps")
                        // console.log(xaxisTime_array)

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
                                categories: last24hours,
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
                                zoneAxis: 'x',
                                zones: zones,
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

                });
            });
        });

    }







    backButton() {
        this.navCtrl.push(MainPage);
    }

}
