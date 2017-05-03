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
    meanBpm: any = 0;

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




    this.http.get(url + "/statistics/happiness/24hours", { "headers": headers }).map(hap => hap.json()).subscribe(hap => {


        this.http.get(url + "/statistics/activation/24hours", { "headers": headers }).map(act => act.json()).subscribe(act => {

            this.http.get(url + "/statistics/movement/24hours", { "headers": headers }).map(res => res.json()).subscribe(res => {
                var happiness_array = [];


                /*  
                    Calculate Mood
                    Takes happiness and activation data and calculates
                    the mood 
                 */

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
                // console.log(mood_array);

                /*  
                    Mood Timestamp
                    Timestamps of the mood from the last 24 hours
                 */
                var moodtimestamp_array = [];
                for (var i = 0; i < act.entries.length; ++i) {
                    moodtimestamp_array.push(moment.utc(act.entries[i].timestamp).local());
                };

                if (moment().isDST() == false) {
                    for (var i = 0; i < moodtimestamp_array.length; i++) {
                        moodtimestamp_array[i] = moodtimestamp_array[i].substract("hours", 1).format("HH");
                    }
                } else {
                    for (var i = 0; i < moodtimestamp_array.length; i++) {
                        moodtimestamp_array[i] = moodtimestamp_array[i].format("HH");
                    }
                }

                // console.log("timestamps mood");
                // console.log(moodtimestamp_array);

                /*  
                    moodData
                    Object with mood and timestamp
                */

                var moodData = [];
                for (var i = 0; i < moodtimestamp_array.length; ++i) {

                    var obj: any = {}
                    obj.timestamp = moodtimestamp_array[i];
                    obj.moodValue = mood_array[i];
                    moodData.push(obj);
                };



                /*  
                    Activity Data
                    Shows the activity vmc data
                 */
                var activity_array = [];

                for (var i = 0; i < res.entries.length; ++i) {
                    activity_array.push({
                        y: res.entries[i].vmc,
                        timestamp: moment.utc(res.entries[i].timestamp).local()

                    });


                };


                if (moment().isDST() == false) {
                    for (var i = 0; i < activity_array.length; i++) {
                        activity_array[i].timestamp = activity_array[i].timestamp.substract("hours", 1).format("HH");
                    }
                } else {
                    for (var i = 0; i < activity_array.length; i++) {
                        activity_array[i].timestamp = activity_array[i].timestamp.format("HH");
                    }
                }


                /*  
                    Time Labels
                    Shows the time labels for the x axis
                 */
                var xaxisTime_array = [];
                for (var i = 0; i < res.entries.length; ++i) {

                    xaxisTime_array[i] = activity_array[i].timestamp
                };



                var activity_array_1 = [];

                if (activity_array.length == 0) {
                    activity_array_1 = [1];
                } else {
                    for (var i = 0; i < activity_array.length; ++i) {
                        activity_array_1[i] = {
                            "y": activity_array[i].y + 20000,
                            "timestamp": activity_array[i].timestamp,

                        }

                    }
                }

                for (var i = 0; i < activity_array_1.length; ++i) {
                    for (var u = 0; u < moodData.length; ++u) {
                        if (activity_array_1[i].timestamp == moodData[u].timestamp) {
                            activity_array_1[i].moodValue = moodData[u].moodValue;
                            break;
                        } else {
                            activity_array_1[i].moodValue = 4;
                        }
                    }
                    if (activity_array_1[i].moodValue == 0) {
                        activity_array_1[i].marker = {
                            "symbol": 'url(assets/Statistics/Smiley30x30/smiley1_30x30.png)'
                        }
                    } else if (activity_array_1[i].moodValue == 1) {
                        activity_array_1[i].marker = {
                            "symbol": 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)'
                        }
                    } else if (activity_array_1[i].moodValue == 2) {
                        activity_array_1[i].marker = {
                            "symbol": 'url(assets/Statistics/Smiley30x30/smiley3_30x30.png)'
                        }
                    } else if (activity_array_1[i].moodValue == 3) {
                        activity_array_1[i].marker = {
                            "symbol": 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)'
                        }
                    }
                }



                /* 
                Maximum of the y Axis in the activity chart
                */
                var maxYaxis = 140000;

                /*
                Activity chart
                */

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
                        color: '#FFFFFF',
                        enableMouseTracking: false,
                        showInLegend: false,


                        marker: {
                            enabled: false,
                        },
                        // zoneAxis: 'x',
                        //  zones: zones,
                        data: activity_array
                    }, {
                        lineWidth: 0,

                        marker: {
                            radius: 0,
                            lineWidth: 0
                        },
                        enableMouseTracking: false,
                        showInLegend: false,

                        data: activity_array_1,

                    },

                    ],



                };





                this.http.get(url + "/statistics/raw_heartrate", { "headers": headers }).map(res => res.json()).subscribe(res => {



                    var bpm_array = [];

                    for (var i = 0; i < res.entries.length; ++i) {
                        bpm_array.push({
                            y: res.entries[i].heartrate,
                            timestamp: moment.utc(res.entries[i].timestamp).local()
                        });
                    };

                    if (moment().isDST() == false) {
                        for (var i = 0; i < bpm_array.length; i++) {
                            bpm_array[i].timestamp = bpm_array[i].timestamp.substract("hours", 1).format("HH");
                        }
                    } else {
                        for (var i = 0; i < bpm_array.length; i++) {
                            bpm_array[i].timestamp = bpm_array[i].timestamp.format("HH");
                        }
                    }


                    //console.log(bpm_array);
                    var bpm_array_1 = [];

                    if (bpm_array.length == 0) {
                        bpm_array_1 = [1];
                    } else {
                        for (var i = 0; i < bpm_array.length; ++i) {
                            bpm_array_1[i] = {
                                "y": bpm_array[i].y + 60,
                                "timestamp": bpm_array[i].timestamp
                            }
                        }
                    }


                    for (var i = 0; i < bpm_array_1.length; ++i) {
                        for (var u = 0; u < moodData.length; ++u) {
                            if (bpm_array_1[i].timestamp == moodData[u].timestamp) {
                                bpm_array_1[i].moodValue = moodData[u].moodValue;
                                moodData[u].moodValue = -1;
                                break;
                            } else {
                                bpm_array_1[i].moodValue = 4;
                            }
                        }
                        if (bpm_array_1[i].moodValue == 0) {
                            bpm_array_1[i].marker = {
                                "symbol": 'url(assets/Statistics/Smiley30x30/smiley1_30x30.png)'
                            }
                        } else if (bpm_array_1[i].moodValue == 1) {
                            bpm_array_1[i].marker = {
                                "symbol": 'url(assets/Statistics/Smiley30x30/smiley2_30x30.png)'
                            }
                        } else if (bpm_array_1[i].moodValue == 2) {
                            bpm_array_1[i].marker = {
                                "symbol": 'url(assets/Statistics/Smiley30x30/smiley3_30x30.png)'
                            }
                        } else if (bpm_array_1[i].moodValue == 3) {
                            bpm_array_1[i].marker = {
                                "symbol": 'url(assets/Statistics/Smiley30x30/smiley4_30x30.png)'
                            }
                        }
                    }

                    var counter = 0;
                    for (var i = 0; i < bpm_array.length; i++) {
                        if (bpm_array[i].y > 30) {

                            counter++
                            this.meanBpm += bpm_array[i].y

                        }
                    }
                    this.meanBpm = this.meanBpm / counter;

                    /*  
                    Time Labels
                    Shows the time labels for the x axis
                    */

                    var xaxis_bpm_Time_array = [];
                    for (var i = 0; i < res.entries.length; ++i) {

                        xaxis_bpm_Time_array.push(moment.utc(res.entries[i].timestamp).local());
                    };


                    if (moment().isDST() == false) {
                        for (var i = 0; i < xaxis_bpm_Time_array.length; i++) {
                            xaxis_bpm_Time_array[i] = xaxis_bpm_Time_array[i].substract("hours", 1).format("HH");
                        }
                    } else {
                        for (var i = 0; i < xaxis_bpm_Time_array.length; i++) {
                            xaxis_bpm_Time_array[i] = xaxis_bpm_Time_array[i].format("HH");
                        }
                    }



                    // console.log(xaxis_bpm_Time_array)

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
                            categories: xaxis_bpm_Time_array,
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
                            zones: moodData,
                            data: bpm_array
                        },
                        {
                            lineWidth: 0,

                            marker: {
                                radius: 0,
                                lineWidth: 0
                            },
                            enableMouseTracking: false,
                            showInLegend: false,

                            data: bpm_array_1,

                        },
                        ],

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
