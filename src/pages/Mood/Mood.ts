import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MoodInputPage } from '../MoodInput/MoodInput';

import { Tree1Page } from '../Tree1/Tree1';
import { Tree2Page } from '../Tree2/Tree2';
import { Tree3Page } from '../Tree3/Tree3';
import { Tree4Page } from '../Tree4/Tree4';

import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';

import { GlobalVariables } from '../../providers/globalVariables'


var counter: number = 0;

function count() {
  if (counter == 3) {
    counter = -1;
  }

  counter++;
  localStorage.setItem("treeCounter", counter.toString());
}

@Component({
  selector: 'page-Mood',
  templateUrl: 'Mood.html'
})
export class MoodPage {

  mood: any;
  errormsg: any;

  pleasance: any = 1;
  activation: any = 1;

  card: any = ""
  page: any = "active"

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public geolocation: Geolocation, private api: GlobalVariables) {

  }

  ionViewDidLoad() {

    this.api.GetPrediction().subscribe(res => {
      if (res.status == 400) {
        this.errormsg = "We haven't received any sensor data yet =( In order to collect data you need to have a Pebble watch and download the happimeter app at the pebble appstore"
        return;
      }

      this.pleasance = res.happiness;
      this.activation = res.activation;;

      var path = "assets/MoodSmilies/"
      var format = ".png"

      if (this.pleasance == 2 && this.activation == 2) {
        this.mood = path + 'transparent_mood1' + format
      } else if (this.pleasance == 1 && this.activation == 2) {
        this.mood = path + 'transparent_mood2' + format
      } else if (this.pleasance == 0 && this.activation == 2) {
        this.mood = path + 'transparent_mood3' + format
      } else if (this.pleasance == 2 && this.activation == 1) {
        this.mood = path + 'transparent_mood4' + format
      } else if (this.pleasance == 1 && this.activation == 1) {
        this.mood = path + 'transparent_mood5' + format
      } else if (this.pleasance == 0 && this.activation == 1) {
        this.mood = path + 'transparent_mood6' + format
      } else if (this.pleasance == 2 && this.activation == 0) {
        this.mood = path + 'transparent_mood7' + format
      } else if (this.pleasance == 1 && this.activation == 0) {
        this.mood = path + 'transparent_mood8' + format
      } else if (this.pleasance == 0 && this.activation == 0) {
        this.mood = path + 'transparent_mood9' + format
      }
    });
  }

  confirm() {

    this.geolocation.getCurrentPosition().then((position) => {

      var timeDifference = moment().utcOffset();
      timeDifference = timeDifference * 60;

      var moodData: any = {}
      moodData.pleasance = this.pleasance,
        moodData.activation = this.activation,
        moodData.timestamp = moment().utc().unix(),
        moodData.local_timestamp = moodData.timestamp + timeDifference,
        moodData.account_id = "Smartphone",
        moodData.device_id = "Smartphone";
      moodData.position = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }

      this.api.postMood(moodData).subscribe(res => { });
    })

    this.treePage();
  }

  treePage() {
    switch (counter) {
      case 0:
        this.navCtrl.push(Tree1Page);
        break;

      case 1:
        this.navCtrl.push(Tree2Page);
        break;

      case 2:
        this.navCtrl.push(Tree3Page);
        break;

      case 3:
        this.navCtrl.push(Tree4Page);
        break;
    }
    count();
  }

  NOTconfirm() {
    this.navCtrl.push(MoodInputPage);
  }

  seeInsights() {
    //classifiers/insights
    this.card = "active"
    this.page = "not_active"
  }

  return() {
    this.card = "not_active"
    this.page = "active"
  }
}
