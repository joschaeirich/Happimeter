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
import { SpeechPage } from '../Speech/Speech';


import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {

  friendRequest: any = 'assets/MenuIcons/AddFriendsIcon.svg';

  pageVisited: any = false; 


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public global:GlobalVariables
  ,private alertCtrl: AlertController) {
   }

   ionViewWillEnter() {
    this.pageVisited = this.global.pageVisited;
    this.global.pageVisited = true;

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

  speechPage() {
    this.navCtrl.push(SpeechPage);
  }

  ionViewDidEnter() {
    var url = "https://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);


    this.http.get(url + "/friends/requests", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {
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