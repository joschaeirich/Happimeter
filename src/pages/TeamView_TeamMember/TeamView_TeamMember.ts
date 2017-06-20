import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';
import * as moment from 'moment';


@Component({
  selector: 'page-TeamView_teamMember',
  templateUrl: 'TeamView_teamMember.html'
})
export class TeamView_TeamMemberPage {
  team: any;
  public members: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables) {
    this.team = this.navParams.get("team")
  }


  // console.log(moodtimestamp_array);



  ionViewDidLoad() {

    this.api.getTeamMembers(this.team).subscribe(tea => {
      for (let member of tea.members) {
        member.last_sensor_input = moment.utc(member.last_sensor_input).local().format("MM/DD/YYYY [at] HH:mm")
        member.last_mood_input = moment.utc(member.last_mood_input).local().format("MM/DD/YYYY [at] HH:mm")
      }
      this.members = tea.members;

    });


  }

}















  /*
                var obj = tea.friends[i].user;
                if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 2) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood1.svg"
                } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 2) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood2.svg"
                } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 2) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood3.svg"
                } else if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 1) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood4.svg"
                } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 1) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood5.svg"
                } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 1) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood6.svg"
                } else if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 0) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood7.svg"
                } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 0) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood8.svg"
                } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 0) {
                  obj.icon = "assets/BoltSmilieys/transparent_mood9.svg"
                } else {
                  obj.icon = "assets/BoltSmilieys/questionmark.svg"
                }
                this.currentFriendList.push(obj);
        
        */