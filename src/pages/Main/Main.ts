import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MoodPage } from '../Mood/Mood';
import { MoodmapPage } from '../Moodmap/Moodmap';
import { NetworkPage } from '../Network/Network';
import { SettingsPage } from '../Settings/Settings';
import { AchievementPage } from '../Achievement/Achievement';
import { StatisticsPage } from '../Statistics/Statistics';
import { FriendsPage } from '../Friends/Friends';





/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Main',
  templateUrl: 'Main.html'
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}