import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';
import { TeamViewPage } from '../TeamView/TeamView';
import { TeamView_TeamMemberPage } from '../TeamView_TeamMember/TeamView_TeamMember';
import { TeamView_AddTeamMemberPage } from '../TeamView_AddTeamMember/TeamView_AddTeamMember';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
    selector: 'page-TeamView_TeamChart',
    templateUrl: 'TeamView_TeamChart.html'
})
export class TeamView_TeamChartPage {
    team: any;
    pleasanceChart: any;
    activationChart: any;

    pleasanceData: any = [];
    activityData: any = [];
    mean_heartRate: any = 0;

    text: any = "";

    meanPleasance: any = "";
    meanActivation: any = "";

    admin: any = "false";

    saveInstance(chart) {
        chart.setSize(
            $(document).width() / 1.1,
            $(document).height() / 3,
            false
        );
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables, private alertCtrl: AlertController) {
        this.team = this.navParams.get("team")
    }

    ionViewDidEnter() {


        if (this.team.is_admin == true) {
            this.text = "Delete Team"
            this.admin = "true";
        } else {
            this.text = "Leave Team"
        }




        this.api.getTeamHeartrate(this.team).subscribe(her => {
            this.mean_heartRate = her.avg_bpm
        });

        this.pleasanceData = [];
        this.activityData = [];
        var moodtimestamp_array = [];

        this.api.getTeamPredictions(this.team).subscribe(tea => {



            for (var i = 0; i < tea.predictions.length; i++) {
                this.pleasanceData.push(tea.predictions[i].happiness);
                this.activityData.push(tea.predictions[i].activation);
                moodtimestamp_array.push(moment.utc(tea.predictions[i].timestamp, "YYYY/MM/DD HH:mm").local());

            }

            if (moment().isDST() == false) {
                for (var i = 0; i < moodtimestamp_array.length; i++) {
                    moodtimestamp_array[i] = moodtimestamp_array[i].substract("hours", 1).format("HH:mm - MM/DD");
                }
            } else {
                for (var i = 0; i < moodtimestamp_array.length; i++) {
                    moodtimestamp_array[i] = moodtimestamp_array[i].format("HH:mm - MM/DD");
                }
            }

            // console.log(moodtimestamp_array);



            if (this.team.active == 2 && this.team.happy == 2) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_1.png";
            } else if (this.team.active == 2 && this.team.happy == 1) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_2.png";
            } else if (this.team.active == 2 && this.team.happy == 0) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_3.png";
            } else if (this.team.active == 1 && this.team.happy == 2) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_4.png";
            } else if (this.team.active == 1 && this.team.happy == 1) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_5.png";
            } else if (this.team.active == 1 && this.team.happy == 0) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_6.png";
            } else if (this.team.active == 0 && this.team.happy == 2) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_7.png";
            } else if (this.team.active == 0 && this.team.happy == 1) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_8.png";
            } else if (this.team.active == 0 && this.team.happy == 0) {
                this.team.icon_chart = "assets/TransparentMoodThin/TransparentMood_9.png";
            }

            var counterPleasance = 0;
            var meanPleasanceNumber = 0;
            for (var i = 0; i < this.pleasanceData.length; i++) {
                counterPleasance++
                meanPleasanceNumber += this.pleasanceData[i]
            }
            meanPleasanceNumber = Math.round(meanPleasanceNumber / counterPleasance);
            if (meanPleasanceNumber <= 2 && meanPleasanceNumber > 1.3) {
                this.meanPleasance = "High"
            } else if (meanPleasanceNumber <= 1.3 && meanPleasanceNumber > 0.7) {
                this.meanPleasance = "Medium"
            } else if (meanPleasanceNumber <= 0.7 && meanPleasanceNumber >= 0) {
                this.meanPleasance = "Low"
            }

            var counterActivity = 0;
            var meanActivityNumber = 0;
            for (var i = 0; i < this.activityData.length; i++) {
                counterActivity++
                meanActivityNumber += this.activityData[i]
            }
            meanActivityNumber = Math.round(meanActivityNumber / counterActivity);
            if (meanActivityNumber <= 2 && meanActivityNumber > 1.3) {
                this.meanActivation = "High"
            } else if (meanActivityNumber <= 1.3 && meanActivityNumber > 0.7) {
                this.meanActivation = "Medium"
            } else if (meanActivityNumber <= 0.7 && meanActivityNumber >= 0) {
                this.meanActivation = "Low"
            }

            var opacity = 0.5;
            this.pleasanceChart = {

                type: 'line',
                credits: {
                    enabled: false
                },
                chart: {
                    backgroundColor: 'transparent',

                    style: {
                        fontFamily: 'roboto',
                    },


                },


                title: {
                    text: null,
                },

                subtitle: {
                    display: false,
                },
                xAxis: {

                    categories: moodtimestamp_array,
                    labels: {
                        style: {
                            color: '#FFFFFF'
                        }
                    },


                },
                yAxis: {

                    minRange: 2,
                    min: 0,
                    title: {
                        text: null
                    },

                    labels: {
                        enabled: false
                    },

                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,


                    plotBands: [{
                        from: 0,
                        to: 0.7,
                        color: 'transparent',
                        label: {
                            text: 'Low',
                            style: {
                                color: '#FFFFFF',
                                fontSize: '11px',
                                opacity: opacity
                            }
                        }
                    }, {
                        from: 0.71,
                        to: 1.3,
                        color: 'transparent',
                        label: {
                            text: 'Medium',
                            style: {
                                color: '#FFFFFF',
                                fontSize: '11px',
                                opacity: opacity
                            }
                        }
                    }, {
                        from: 1.31,
                        to: 2,
                        color: 'transparent',
                        label: {
                            text: 'High',
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
                        value: 0.7,
                    },
                    {
                        color: 'rgba(255, 255, 255, 0.5)',
                        width: 2,
                        dashStyle: 'ShortDot',
                        value: 1.3,
                    },
                    {
                        color: 'rgba(255, 255, 255, 0.5)',
                        width: 2,
                        dashStyle: 'ShortDot',
                        value: 2,
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
                    data: this.pleasanceData
                }
                ],



            };

            this.activationChart = {
                type: 'line',
                plotAreaWidth: 300,
                credits: {
                    enabled: false
                },
                chart: {
                    backgroundColor: 'transparent',

                    style: {
                        fontFamily: 'roboto',
                    },


                },


                title: {
                    text: null,
                },

                subtitle: {
                    display: false,
                },
                xAxis: {

                    categories: moodtimestamp_array,

                    labels: {

                        style: {
                            color: '#FFFFFF',
                            width: '300px'
                        }
                    }
                },
                yAxis: {

                    minRange: 2,
                    min: 0,
                    title: {
                        text: null
                    },

                    labels: {
                        enabled: false
                    },

                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,


                    plotBands: [{
                        from: 0,
                        to: 0.7,
                        color: 'transparent',
                        label: {
                            text: 'Low',
                            style: {
                                color: '#FFFFFF',
                                fontSize: '11px',
                                opacity: opacity
                            }
                        }
                    }, {
                        from: 0.71,
                        to: 1.3,
                        color: 'transparent',
                        label: {
                            text: 'Medium',
                            style: {
                                color: '#FFFFFF',
                                fontSize: '11px',
                                opacity: opacity
                            }
                        }
                    }, {
                        from: 1.31,
                        to: 2,
                        color: 'transparent',
                        label: {
                            text: 'High',
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
                        value: 0.7,
                    },
                    {
                        color: 'rgba(255, 255, 255, 0.5)',
                        width: 2,
                        dashStyle: 'ShortDot',
                        value: 1.3,
                    },
                    {
                        color: 'rgba(255, 255, 255, 0.5)',
                        width: 2,
                        dashStyle: 'ShortDot',
                        value: 2,
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
                    data: this.activityData
                }
                ],



            };
        })

    }

    delete_leaveGroup() {
        var text = "";
        if (this.team.is_admin == true) {
            text = "Do you want to delete the team " + this.team.name + "?"
        } else {
            text = "Do you want to leave the team " + this.team.name + "?"
        }
        let alert = this.alertCtrl.create({
            title: text,
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                        return;
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.api.leaveTeam(this.team.id).subscribe(tea => { });
                        this.navCtrl.push(TeamViewPage);
                    }
                }
            ]
        });
        alert.present();
    }

    inviteMembers() {
        this.navCtrl.push(TeamView_AddTeamMemberPage, {
            "team": this.team
        })

    }

    reviewMembers() {
        this.navCtrl.push(TeamView_TeamMemberPage, {
            "team": this.team
        })
    }
}