import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MoodInputPage } from '../MoodInput/MoodInput';
import { MainPage } from '../Main/Main';
import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-Mood',
  templateUrl: 'Mood.html'
})
export class MoodPage {



  mood: any;
  errormsg: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) { }
  ionViewDidLoad() {



    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

    this.http.get(url + "/moods", { "headers": headers }).map(res => res.json()).subscribe(res => {
      if (res.moods.length == 0) {
        this.errormsg = "No data yet =("
        return;
      }


      var pleasance = res.moods[0].pleasance;
      var activation = res.moods[0].activation;;
      //  console.log(activation);
      //  console.log(pleasance);

      if (pleasance == 1 && activation == 1) {
        this.mood = 'assets/ActualMoodState/mood1.svg'
      } else if (pleasance == 1 && activation == 0) {
        this.mood = 'assets/ActualMoodState/mood2.svg'
      } else if (pleasance == 0 && activation == 1) {
        this.mood = 'assets/ActualMoodState/mood3.svg'
      } else if (pleasance == 0 && activation == 0) {
        this.mood = 'assets/ActualMoodState/mood4.svg'
      } else {

      }
      // console.log(this.mood);

    });

  }

  nextPage() {
    this.navCtrl.push(MoodInputPage);
  }
  backButton() {
    this.navCtrl.push(MainPage);
  }
}
