import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamView_CreateTeamPage } from '../TeamView_CreateTeam/TeamView_CreateTeam';
import { TeamView_SignInPage } from '../TeamView_SignIn/TeamView_SignIn';


@Component({
  selector: 'page-TeamView',
  templateUrl: 'TeamView.html'
})
export class TeamViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {

  }

  createTeam() {
    this.navCtrl.push(TeamView_CreateTeamPage);
  }

  signInToTeam() {
    this.navCtrl.push(TeamView_SignInPage);
  }


}
