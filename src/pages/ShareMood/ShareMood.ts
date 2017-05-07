import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-ShareMood',
  templateUrl: 'ShareMood.html'
})
export class ShareMoodPage {

  url = "https://www.pascalbudner.de:8080/v1";

  headers: Headers = new Headers();
  currentFriendList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }



  ionViewDidLoad() {

    this.http.get(this.url + "/friends", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      for (var i = 0; i < fri.friends.length; ++i) {
        this.currentFriendList.push(fri.friends[i].user)
       
      }
    }
    );
  }

  shareMood(addUser) {
    console.log(addUser)
    this.http.put(this.url + "/friends/" + addUser.id, {
      "share_mood": addUser.share_mood == true ? 1 : 0


    }, { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {

    });
  }
}
