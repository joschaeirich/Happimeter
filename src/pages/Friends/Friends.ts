import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchFriendsPage } from '../SearchFriends/SearchFriends'
import { FriendRequestPage } from '../FriendRequest/FriendRequest'
import { ShareMoodPage } from '../ShareMood/ShareMood'
import { DeleteFriendPage } from '../DeleteFriend/DeleteFriend'
import { MainPage } from '../Main/Main'


import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables'
import { Http } from '@angular/http';


@Component({
  selector: 'page-Friends',
  templateUrl: 'Friends.html'
})
export class FriendsPage {

  headerText: any;

  currentFriendList: any = [];
  friendRequest: any = 'assets/Friends/Icons/friendRequests.svg';

  moodData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private api: GlobalVariables) {
  }

  ionViewDidEnter() {
    this.currentFriendList = [];
    this.moodData = [];
    this.api.getFriendsList().subscribe(fri => {

      for (var i = 0; i < fri.friends.length; ++i) {
        var obj = fri.friends[i].user;
        if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood1.png"
        } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood2.png"
        } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 2) {
          obj.icon = "assets/BoltSmilieys/transparent_mood3.png"
        } else if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood4.png"
        } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood5.png"
        } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 1) {
          obj.icon = "assets/BoltSmilieys/transparent_mood6.png"
        } else if (fri.friends[i].user.mood.pleasance == 2 && fri.friends[i].user.mood.activation == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood7.png"
        } else if (fri.friends[i].user.mood.pleasance == 1 && fri.friends[i].user.mood.activation == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood8.png"
        } else if (fri.friends[i].user.mood.pleasance == 0 && fri.friends[i].user.mood.activation == 0) {
          obj.icon = "assets/BoltSmilieys/transparent_mood9.png"
        } else {
          obj.icon = "assets/BoltSmilieys/questionmark.svg"
        }
        this.currentFriendList.push(obj);

      }
    }
    );

    this.api.getFriendRequest().subscribe(fri => {
      if (fri.friend_requests.length > 0) {
          this.headerText = "Open Request";
        this.friendRequest = 'assets/Friends/Icons/openFriendRequest.svg';
      } else {
            this.headerText = "No Requests";
        this.friendRequest =  'assets/Friends/Icons/friendRequests.svg';
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
    this.api.getFriendRequest().subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.navCtrl.push(FriendRequestPage);
      } else {
        return;
      }
    });
  }

  mainPage() {
    this.navCtrl.push(MainPage);
  }

}
