import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';
import { TeamViewPage } from '../TeamView/TeamView';
import * as $ from 'jquery';

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

    text: any = "";

    saveInstance(chart) {
        chart.setSize(
            $(document).width(),
            $(document).height() / 3,
            false
        );
    }

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables) {
        this.team = this.navParams.get("team")
    }

    ionViewDidEnter() {
        console.log(this.team)

        if (this.team.is_admin == true) {
            this.text = "Delete Team"
        } else {
            this.text = "Leave Team"
        }

        this.pleasanceData = [];

        this.api.getTeamPredictions(this.team).subscribe(tea => {
            for (var i = 0; i < tea.predictions.length; i++) {
                this.pleasanceData.push(tea.predictions[i].happiness);
                this.activityData.push(tea.predictions[i].activation);

            }
            console.log(this.activityData)




            this.pleasanceChart = {

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

                    tickInterval: 1,

                    labels: {

                        style: {
                            color: '#FFFFFF',
                            width: '300px'
                        }
                    }
                },
                yAxis: {

                    max: 10,
                    title: {
                        text: null
                    },

                    labels: {
                        enabled: false
                    },

                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,



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

                    tickInterval: 1,

                    labels: {

                        style: {
                            color: '#FFFFFF',
                            width: '300px'
                        }
                    }
                },
                yAxis: {

                    max: 10,
                    title: {
                        text: null
                    },

                    labels: {
                        enabled: false
                    },

                    minorGridLineWidth: 0,
                    gridLineWidth: 0,
                    alternateGridColor: null,



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

        this.api.leaveTeam(this.team.id).subscribe(tea => { });
        this.navCtrl.push(TeamViewPage);
    }


}
