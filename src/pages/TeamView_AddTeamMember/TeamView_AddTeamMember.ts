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
    if(this.memberList[0].name==""){
      var name = this.memberList[0].mail
    }else{
      name = this.memberList[0].name
    }
      var text = "";
      var title = "";
      var confirm_yes = ""; 
      var confirm_no = ""; 
      if (this.memberList.length == 0) {
        confirm_yes= "No"
        confirm_no = "Yes"
        title = "Create Team"
        text = "Don't you want to invite someone to your team?"
      } else if (this.memberList.length == 1) {
        confirm_yes= "Yes"
        confirm_no = "No"
        title = "Invite Team Member"
        text = "Do you want to add " + name + " to your team?"
      } else {
        confirm_yes= "Yes"
        confirm_no = "No"
        title = "Invite Team Members"
        text = "Do you want add these persons to your team?"
      }
    

    let alert = this.alertCtrl.create({

      title: title,

      message: text,
      buttons: [
        {
          text: confirm_no,
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: confirm_yes,
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
