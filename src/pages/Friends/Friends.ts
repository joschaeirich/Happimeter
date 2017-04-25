import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SearchFriendsPage} from '../SearchFriends/SearchFriends'
import {FriendRequestPage} from '../FriendRequest/FriendRequest'


@Component({
  selector: 'page-Friends',
  templateUrl: 'Friends.html'
})
export class FriendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }
     SearchFriends(){
      this.navCtrl.push(SearchFriendsPage);
  }
   FriendRequest(){
      this.navCtrl.push(FriendRequestPage);
  }

}
