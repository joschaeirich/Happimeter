import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TeamView_AddTeamMemberPage } from '../TeamView_AddTeamMember/TeamView_AddTeamMember';

import { GlobalVariables } from '../../providers/globalVariables';

@Component({
  selector: 'page-TeamView_CreateTeam',
  templateUrl: 'TeamView_CreateTeam.html'
})


export class TeamView_CreateTeamPage {
  team: any = { name: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private api: GlobalVariables) { }

  ionViewDidLoad() {

  }


  createTeam() {
    console.log(this.team)
    if (this.team.name == "") {
      this.showError("Your group needs a name")
      return;
    }
    if (this.team.password == "") {
      this.showError("Without a password there can't be a groupd")
      return;
    }
    this.api.createTeam(this.team).subscribe(res => { });

  this.navCtrl.push(TeamView_AddTeamMemberPage, {
      "team": this.team

    });
  }


  showError(text) {

    let alert = this.alertCtrl.create({
      title: 'Error 125130932',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
