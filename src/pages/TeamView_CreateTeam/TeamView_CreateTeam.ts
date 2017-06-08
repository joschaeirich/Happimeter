import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamView_AddTeamMemberPage } from '../TeamView_AddTeamMember/TeamView_AddTeamMember';


@Component({
  selector: 'page-TeamView_CreateTeam',
  templateUrl: 'TeamView_CreateTeam.html'
})
export class TeamView_CreateTeamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    
  }

    addTeamMember() {
    this.navCtrl.push(TeamView_AddTeamMemberPage);
  }

}
