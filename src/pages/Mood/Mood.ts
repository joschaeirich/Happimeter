import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MoodInputPage } from '../MoodInput/MoodInput';

import { Tree1Page } from '../Tree1/Tree1';
import { Tree2Page } from '../Tree2/Tree2';
import { Tree3Page } from '../Tree3/Tree3';
import { Tree4Page } from '../Tree4/Tree4';

import { Auth } from '../../providers/auth';
import { Http, Headers } from '@angular/http';
import * as moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';


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
  url: any = "https://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();
  pleasance: any = 1;
  activation:any = 1; 


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, public geolocation: Geolocation) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }

  ionViewDidLoad() {




    this.http.get(this.url + "/classifier/prediction", { "headers": this.headers }).map(res => res.json()).subscribe(res => {
      if (res.length == 0) {
        this.errormsg = "No data yet =("
        return;
      }

      this.pleasance = res.happiness;
      this.activation = res.activation;;

      if (this.pleasance == 2 && this.activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood1.svg'
      } else if (this.pleasance == 1 && this.activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood2.svg'
      } else if (this.pleasance == 0 && this.activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood3.svg'
      } else if (this.pleasance == 2 && this.activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood4.svg'
      } else if (this.pleasance == 1 && this.activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood5.svg'
      } else if (this.pleasance == 0 && this.activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood6.svg'
      } else if (this.pleasance == 2 && this.activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood7.svg'
      } else if (this.pleasance == 1 && this.activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood8.svg'
      } else if (this.pleasance == 0 && this.activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood9.svg'
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

      this.http.post(this.url + "/moods", moodData, { "headers": this.headers }).map(res => res.json()).subscribe(res => { });
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
}
