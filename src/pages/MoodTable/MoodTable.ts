import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { Http, Headers } from '@angular/http';

import * as moment from 'moment';

@Component({
  selector: 'page-MoodTable',
  templateUrl: 'MoodTable.html'
})
export class MoodTablePage {
  url = "https://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();

  moodData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }

  ionViewDidLoad() {

    this.http.get(this.url + "/moods", { "headers": this.headers }).map(res => res.json()).subscribe(res => {
      var mood_array = [];
      for (var i = 0; i < res.moods.length; ++i) {
        if (res.moods[i].pleasance == 2 && res.moods[i].activation == 2) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood1.svg'
        } else if (res.moods[i].pleasance == 1 && res.moods[i].activation == 2) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood2.svg'
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 2) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood3.svg'
        } else if (res.moods[i].pleasance == 2 && res.moods[i].activation == 1) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood4.svg'
        } else if (res.moods[i].pleasance == 1 && res.moods[i].activation == 1) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood5.svg'
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 1) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood6.svg'
        } else if (res.moods[i].pleasance == 2 && res.moods[i].activation == 0) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood7.svg'
        } else if (res.moods[i].pleasance == 1 && res.moods[i].activation == 0) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood8.svg'
        } else if (res.moods[i].pleasance == 0 && res.moods[i].activation == 0) {
          mood_array[i] = 'assets/BoltSmilieys/transparent_mood9.svg'
        }
      }

      console.log(mood_array)



      var weather_array = [];
      for (var i = 0; i < res.moods.length; ++i) {
        if (res.moods[i].weather.name == null) {
          continue;
        } else if (res.moods[i].weather.name == "Rain") {
          weather_array[i] = 'assets/weather/rain.svg'
        }
      }

      var moodtimestamp_array = [];
      for (var i = 0; i < res.moods.length; ++i) {
        moodtimestamp_array.push(moment.utc(res.moods[i].timestamp).local());
      };

      if (moment().isDST() == false) {
        for (var i = 0; i < moodtimestamp_array.length; i++) {
          moodtimestamp_array[i] = moodtimestamp_array[i].substract("hours", 1).format("HH");
        }
      } else {
        for (var i = 0; i < moodtimestamp_array.length; i++) {
          moodtimestamp_array[i] = moodtimestamp_array[i].format("HH");
        }
      }

      for(var i = 0; i < res.moods.length; i++) {
        var obj: any = {}
        obj.mood = mood_array[i]
        obj.weather = weather_array[i]
        obj.timestamp = moodtimestamp_array[i];
        
        this.moodData.push(obj)
      }
    });


  }


}
