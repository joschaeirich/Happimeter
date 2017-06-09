import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';
import { TeamViewPage } from '../TeamView/TeamView';

@Component({
  selector: 'page-TeamView_AddTeamMember',
  templateUrl: 'TeamView_AddTeamMember.html'
})
export class TeamView_AddTeamMemberPage {
  items: any = [];
  memberList: any = [];
  member: any = { id: '' };
  team: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables, private alertCtrl: AlertController) {
    this.team = this.navParams.get("team")
    console.log(this.team)

  }



  initializeItems() {

  }

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;

    if (val.length < 3) {
      return;
    }

    this.api.searchFriend(ev.target.value).subscribe(fri => {

      this.items = [];

      for (var i = 0; i < fri.results.length; ++i) {
        this.items.push(fri.results[i].user);
      }

    });

  }

  presentConfirm(addUser) {
    this.memberList.push(addUser)
  }

  removeName(user) {
    var index = 0;
    for (var i = 0; i < this.memberList.length; i++) {
      if (this.memberList[i].id == user.id) {
        index = i;
        break;
      }
    }

    this.memberList.splice(i, 1);
  }




  inviteTeamMembers() {
    console.log(this.memberList)
    for (var i = 0; i < this.memberList.length; i++) {
      var text = "";
      if (this.memberList.length == 0) {
        text = "Don't you want to invite someone to your team?"
      } else if (this.memberList.length == 1) {
        text = "Do you want to add " + this.memberList[i].name + " to your team?"
      } else {
        text = "Do you want add these persons to your team?"
      }
    }

    let alert = this.alertCtrl.create({
      title: 'Add Team Members',

      message: text,
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
            for (var i = 0; i < this.memberList.length; i++) {
            this.api.inviteUserToTeam(this.memberList[i], this.team).subscribe(fri => {
            });
            }
            this.navCtrl.push(TeamViewPage);
          }
        }
      ]
    });
    alert.present();
  }

}
