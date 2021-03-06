import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { MoodPage } from '../Mood/Mood';
import { MoodmapPage } from '../Moodmap/Moodmap';
import { NetworkPage } from '../Network/Network';
import { SettingsPage } from '../Settings/Settings';
import { AchievementPage } from '../Achievement/Achievement';
import { StatisticsPage } from '../Statistics/Statistics';
import { FriendsPage } from '../Friends/Friends';
import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';
import { TeamViewPage } from '../TeamView/TeamView';


import { Http } from '@angular/http';


@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {

  friendRequest: any = 'assets/MenuIcons/AddFriendsIcon.svg';

  pageVisited: any = false; 


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public api:GlobalVariables
  ,private alertCtrl: AlertController) {
   }

   ionViewWillEnter() {
    this.pageVisited = this.api.pageVisited;
    this.api.pageVisited = true;

   }

  

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

  teamViewPage() {
    this.navCtrl.push(TeamViewPage);
  }

  ionViewDidEnter() {

    this.api.getFriendRequest().subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.friendRequest = 'assets/MenuIcons/AddFriendsIconOpenRequest.svg';
      } else {
        this.friendRequest = 'assets/MenuIcons/AddFriendsIcon.svg';
      }

    }, () => {
      let alert = this.alertCtrl.create({
      title: 'No internet connection',
      message: 'Please connect your phone to the internet to use all awesome happimeter features',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            return;
          }
        },    
      ]
    });
    alert.present();
    });

  }

}