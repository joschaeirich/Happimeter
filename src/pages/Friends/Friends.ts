import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchFriendsPage } from '../SearchFriends/SearchFriends'
import { FriendRequestPage } from '../FriendRequest/FriendRequest'
import { ShareMoodPage } from '../ShareMood/ShareMood'
import { DeleteFriendPage } from '../DeleteFriend/DeleteFriend'


import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-Friends',
  templateUrl: 'Friends.html'
})
export class FriendsPage {

  url = "http://www.pascalbudner.de:8080/v1";

  headerText: any;
  headers: Headers = new Headers();

  currentFriendList: any = [];
  friendRequest: any = 'assets/Friends/Icons/friendRequests.svg';

  moodIcon: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }

  ionViewDidEnter() {
    this.currentFriendList = [];
    this.http.get(this.url + "/friends", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      for (var i = 0; i < fri.friends.length; ++i) {
        this.currentFriendList.push(fri.friends[i].user)
      }
    }
    );

    /* 
Display Image for each mood if mood is shared
*/
    /*
    for (var i = 0; i < this.currentFriendList.length; ++i) {
      var obj:any = {}
      if (this.currentFriendList[i].user.share_mood == true) {
       
       obj.moodIcon[i] ='assets/TransparentSmileys/smiley1.png'

      }

    }
    console.log(this.currentFriendList)
    console.log(this.moodIcon)
*/
    this.http.get(this.url + "/friends/requests", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.headerText = "Open Request";
        this.friendRequest = 'assets/Friends/Icons/openFriendRequest.svg';
      } else {
        this.headerText = "No Requests";
      }

    });
  }










  SearchFriends() {
    this.navCtrl.push(SearchFriendsPage);
  }
  ShareMood() {
    this.navCtrl.push(ShareMoodPage);
  }
  DeleteFriend() {
    this.navCtrl.push(DeleteFriendPage);
  }
  FriendRequest() {
    this.http.get(this.url + "/friends/requests", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.navCtrl.push(FriendRequestPage);
      } else {
        return;
      }
    });
  }

}
