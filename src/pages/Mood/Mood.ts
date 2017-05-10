import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MoodInputPage } from '../MoodInput/MoodInput';
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

    var url = "https://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

    this.http.get(url + "/classifier/prediction", { "headers": headers }).map(res => res.json()).subscribe(res => {
      if (res.length == 0) {
        this.errormsg = "No data yet =("
        return;
      }

      var pleasance = res.happiness;
      var activation = res.activation;;

      if (pleasance == 2 && activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood1.svg'
      } else if (pleasance == 1 && activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood2.svg'
      } else if (pleasance == 0 && activation == 2) {
        this.mood = 'assets/TransparentSmileys/transparent_mood3.svg'
      } else if (pleasance == 2 && activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood4.svg'
      } else if (pleasance == 1 && activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood5.svg'
      } else if (pleasance == 0 && activation == 1) {
        this.mood = 'assets/TransparentSmileys/transparent_mood6.svg'
      } else if (pleasance == 2 && activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood7.svg'
      } else if (pleasance == 1 && activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood8.svg'
      } else if (pleasance == 0 && activation == 0) {
        this.mood = 'assets/TransparentSmileys/transparent_mood9.svg'
      }
    });
  }

  nextPage() {
    this.navCtrl.push(MoodInputPage);
  }
}
