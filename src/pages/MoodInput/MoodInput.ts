import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Tree1Page } from '../Tree1/Tree1';
import { Tree2Page } from '../Tree2/Tree2';
import { Tree3Page } from '../Tree3/Tree3';
import { Tree4Page } from '../Tree4/Tree4';
import { MoodPage } from '../Mood/Mood';

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

  mood1: any = 'assets/MoodInput/mood1.svg'
  mood2: any = 'assets/MoodInput/mood2.svg'
  mood3: any = 'assets/MoodInput/mood3.svg'
  mood4: any = 'assets/MoodInput/mood4.svg'
  
  contrast: number = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {

    this.headers.append("Authorization", "Bearer " + this.auth.token);

    var raw_counter = localStorage.getItem("treeCounter");
    if (raw_counter == null || raw_counter == "NaN") {
      counter = 0;
    } else {
      counter = Number.parseInt(raw_counter);
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

  MoodUpload(activation, happiness) {
    var timeDifference = moment().utcOffset();
    timeDifference = timeDifference * 60;

    var moodData: any = {}
    moodData.pleasance = happiness,
      moodData.activation = activation,
      moodData.timestamp = moment().utc().unix(),
      moodData.local_timestamp = moodData.timestamp + timeDifference,
      moodData.account_id = "Smartphone",
      moodData.device_id = "Smartphone";
    //console.log(moodData)
    this.http.post(this.url + "/moods", moodData, { "headers": this.headers }).map(res => res.json()).subscribe(res => { });

    this.TreePage();
  }




  backButton() {
    this.navCtrl.push(MoodPage);
  }


  ionViewDidLoad() {

  }


}
