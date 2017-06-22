import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamView_CreateTeamPage } from '../TeamView_CreateTeam/TeamView_CreateTeam';
import { TeamView_SearchPage } from '../TeamView_Search/TeamView_Search';
import { TeamView_TeamChartPage } from '../TeamView_TeamChart/TeamView_TeamChart';
import { MainPage } from '../Main/Main'

import { GlobalVariables } from '../../providers/globalVariables'

@Component({
  selector: 'page-TeamView',
  templateUrl: 'TeamView.html'
})
export class TeamViewPage {
  currentTeams: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables) { }

  ionViewDidEnter() {


    this.currentTeams = [];


    this.api.getTeams().subscribe(tea => {

      for (var i = 0; i < tea.teams.length; ++i) {
        var obj = tea.teams[i];
        var hap = tea.teams[i].mood.happiness;
        var act = tea.teams[i].mood.activation;

        if (hap <= 2 && hap > 1.44) {
          obj.happy = 2;
        } else if (hap <= 1.44 && hap > 0.68) {
          obj.happy = 1;
        } else if (hap <= 0.68) {
          obj.happy = 0;
        }

        if (act <= 2 && act > 1.44) {
          obj.active = 2;
        } else if (act <= 1.44 && act > 0.68) {
          obj.active = 1;
        } else if (act <= 0.68) {
          obj.active = 0;
        }

        if (obj.happy == 2 && obj.active == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood1.png";
        } else if (obj.happy == 1 && obj.active == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood2.png";
        } else if (obj.happy == 0 && obj.active == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood3.png";
        } else if (obj.happy == 2 && obj.active == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood4.png";
        } else if (obj.happy == 1 && obj.active == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood5.png";
        } else if (obj.happy == 0 && obj.active == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood6.png";
        } else if (obj.happy == 2 && obj.active == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood7.png";
        } else if (obj.happy == 1 && obj.active == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood8.png";
        } else if (obj.happy == 0 && obj.active == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood9.png";
        }


      



        this.currentTeams.push(obj);


      }

      console.log(this.createTeam)
    });

  }

  createTeam() {
    this.navCtrl.push(TeamView_CreateTeamPage);
  }

  signInToTeam() {
    this.navCtrl.push(TeamView_SearchPage);
  }

  goToTeamChart(team) {

    this.navCtrl.push(TeamView_TeamChartPage, {
      "team": team

    });

  }
   mainPage() {
    this.navCtrl.push(MainPage);
  }

}
