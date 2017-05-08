import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Tree1Page } from '../Tree1/Tree1';
import { Tree2Page } from '../Tree2/Tree2';
import { Tree3Page } from '../Tree3/Tree3';
import { Tree4Page } from '../Tree4/Tree4';
import { Geolocation } from '@ionic-native/geolocation';

import { Auth } from '../../providers/auth';
import { Http, Headers } from '@angular/http';
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
  url = "https://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();

  pleasance: number = 1;
  activation: number = 1;

  contrast: number = 0;

  moodIcon: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public geolocation: Geolocation) {

    this.headers.append("Authorization", "Bearer " + this.auth.token);

    var raw_counter = localStorage.getItem("treeCounter");
    if (raw_counter == null || raw_counter == "NaN") {
      counter = 0;
    } else {
      counter = Number.parseInt(raw_counter);
    }
  }
  ionViewDidLoad(pleasance, activation) {
    this.moodIcon = 'assets/TransparentSmileys/transparent_mood5.svg'
  }

onChange(pleasance, activation){
 if (this.pleasance == 2 && this.activation == 2) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood1.svg'
    } else if (this.pleasance == 1 && this.activation == 2) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood2.svg'
    } else if (this.pleasance == 0 && this.activation == 2) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood3.svg'
    } else if (this.pleasance == 2 && this.activation == 1) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood4.svg'
    } else if (this.pleasance == 1 && this.activation == 1) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood5.svg'
    } else if (this.pleasance == 0 && this.activation == 1) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood6.svg'
    } else if (this.pleasance == 2 && this.activation == 0) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood7.svg'
    } else if (this.pleasance == 1 && this.activation == 0) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood8.svg'
    } else if (this.pleasance == 0 && this.activation == 0) {
      this.moodIcon = 'assets/TransparentSmileys/transparent_mood9.svg'
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
    var timeDifference = moment().utcOffset();
    timeDifference = timeDifference * 60;

    var moodData: any = {}
    moodData.pleasance = pleasance,
      moodData.activation = activation,
      moodData.timestamp = moment().utc().unix(),
      moodData.local_timestamp = moodData.timestamp + timeDifference,
      moodData.account_id = "Smartphone",
      moodData.device_id = "Smartphone";
    //console.log(moodData)
    this.http.post(this.url + "/moods", moodData, { "headers": this.headers }).map(res => res.json()).subscribe(res => { });

    this.TreePage();
  }

}
