import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MoodPage } from '../Mood/Mood';
import { MoodmapPage } from '../Moodmap/Moodmap';
import { NetworkPage } from '../Network/Network';
import { SettingsPage } from '../Settings/Settings';
import { AchievementPage } from '../Achievement/Achievement';
import { StatisticsPage } from '../Statistics/Statistics';
import { FriendsPage } from '../Friends/Friends';
import { LoginPage } from '../Login/Login';
import { Auth } from '../../providers/auth';


import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {

  friendRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) { }

  moodPage() {
    this.navCtrl.push(MoodPage);
  }
  moodMapPage() {
    this.navCtrl.push(MoodmapPage);
  }
  networkPage() {
    this.navCtrl.push(NetworkPage);
  }

  settingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  statisticsPage() {
    this.navCtrl.push(StatisticsPage);
  }

  achievementPage() {
    this.navCtrl.push(AchievementPage);
  }
  friendsPage() {
    this.navCtrl.push(FriendsPage);
  }


  ionViewDidEnter() {
    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);


    this.http.get(url + "/friends/requests", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.friendRequest = 'assets/MenuIcons/AddFriendsIconOpenRequest.svg';
      }else{
        this.friendRequest = 'assets/MenuIcons/AddFriendsIcon.svg';
      }

    });  

  }

}