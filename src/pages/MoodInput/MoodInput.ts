import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Tree1Page } from '../Tree1/Tree1';
import { Tree2Page } from '../Tree2/Tree2';
import { Tree3Page } from '../Tree3/Tree3';
import { Tree4Page } from '../Tree4/Tree4';
import { Geolocation } from '@ionic-native/geolocation';

import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';
import { Http } from '@angular/http';
import * as moment from 'moment';

var counter: number = 0;
function count() {
  if (counter == 3) {
    counter = -1;
  }

  counter++;
  localStorage.setItem("treeCounter", counter.toString());
}

@Component({
  selector: 'page-MoodInput',
  templateUrl: 'MoodInput.html'
})
export class MoodInputPage {

  pleasance: number = 1;
  activation: number = 1;

  contrast: number = 0;

  moodIcon: any;
  lat: any;
  long: any;

  path: any = "assets/MoodSmilies/";
  format: any = ".png";
  geolocationerror: any = "false";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public geolocation: Geolocation, private api: GlobalVariables, private alertCtrl: AlertController) {


    var raw_counter = localStorage.getItem("treeCounter");
    if (raw_counter == null || raw_counter == "NaN") {
      counter = 0;
    } else {
      counter = Number.parseInt(raw_counter);
    }

  }
  ionViewDidLoad(pleasance, activation) {

    this.geolocation.getCurrentPosition().then(() => { }, (err) => {
      this.geolocationerror = "true";
      let alert = this.alertCtrl.create({
        title: 'Geolocation disabled',
        subTitle: 'Please activate your location services to send mood data',
        buttons: ['Dismiss']

      });
      alert.present();

    });


    this.moodIcon = this.path + 'transparent_mood5' + this.format
  }

  onChange(pleasance, activation) {

    if (this.pleasance == 2 && this.activation == 2) {
      this.moodIcon = this.path + 'transparent_mood1' + this.format
    } else if (this.pleasance == 1 && this.activation == 2) {
      this.moodIcon = this.path + 'transparent_mood2' + this.format
    } else if (this.pleasance == 0 && this.activation == 2) {
      this.moodIcon = this.path + 'transparent_mood3' + this.format
    } else if (this.pleasance == 2 && this.activation == 1) {
      this.moodIcon = this.path + 'transparent_mood4' + this.format
    } else if (this.pleasance == 1 && this.activation == 1) {
      this.moodIcon = this.path + 'transparent_mood5' + this.format
    } else if (this.pleasance == 0 && this.activation == 1) {
      this.moodIcon = this.path + 'transparent_mood6' + this.format
    } else if (this.pleasance == 2 && this.activation == 0) {
      this.moodIcon = this.path + 'transparent_mood7' + this.format
    } else if (this.pleasance == 1 && this.activation == 0) {
      this.moodIcon = this.path + 'transparent_mood8' + this.format
    } else if (this.pleasance == 0 && this.activation == 0) {
      this.moodIcon = this.path + 'transparent_mood9' + this.format
    }

  }
  TreePage() {
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

  MoodUpload(pleasance, activation) {
    if (this.geolocationerror = "true") {
      let alert = this.alertCtrl.create({
        title: 'Geolocation disabled',
        subTitle: 'You cannot send data while geolocation services are disabled',
        buttons: ['Ok']

      });
      alert.present();
      return;
    } else {



      this.geolocation.getCurrentPosition().then((position) => {

        var timeDifference = moment().utcOffset();
        timeDifference = timeDifference * 60;

        var moodData: any = {}
        moodData.pleasance = pleasance,
          moodData.activation = activation,
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

      this.TreePage();
    }
  }



}
