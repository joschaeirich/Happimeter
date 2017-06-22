import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';

import { Http } from '@angular/http';


@Component({
  selector: 'page-ShareMood',
  templateUrl: 'ShareMood.html'
})
export class ShareMoodPage {


  currentFriendList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth,private api: GlobalVariables) {

  }



  ionViewDidLoad() {

    this.api.getFriendsList().subscribe(fri => {
      for (var i = 0; i < fri.friends.length; ++i) {
        this.currentFriendList.push(fri.friends[i].user)
       
      }
    }
    );
  }

  shareMood(addUser) {
    this.api.shareMood(addUser).subscribe(fri => {
    });
  }
}
