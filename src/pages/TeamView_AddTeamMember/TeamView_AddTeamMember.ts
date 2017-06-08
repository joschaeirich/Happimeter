import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';

@Component({
  selector: 'page-TeamView_AddTeamMember',
  templateUrl: 'TeamView_AddTeamMember.html'
})
export class TeamView_AddTeamMemberPage {
  items: any = [];
  memberList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables, private alertCtrl: AlertController) { }


  initializeItems() {

  }

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;

    if (val.length < 3) {
      return;
    }

    this.api.searchFriend(ev.target.value).subscribe(fri => {
      ;

      this.items = [];

      for (var i = 0; i < fri.results.length; ++i) {
        this.items.push(fri.results[i].user);
      }

    });

  }

  presentConfirm(addUser) {
            this.memberList.push(addUser)
  }

  removeName(user){
    var index = 0;
    for(var i = 0; i < this.memberList.length; i++) {
      if(this.memberList[i].id == user.id) {
        index = i;
        break;
      }
    }

    this.memberList.splice(i,1);
  }


}
