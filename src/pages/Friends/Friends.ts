import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchFriendsPage } from '../SearchFriends/SearchFriends'
import { FriendRequestPage } from '../FriendRequest/FriendRequest'
import { ShareMoodPage } from '../ShareMood/ShareMood'
import { DeleteFriendPage } from '../DeleteFriend/DeleteFriend'
import { MainPage } from '../Main/Main'


import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-Friends',
  templateUrl: 'Friends.html'
})
export class FriendsPage {

  url = "https://www.pascalbudner.de:8080/v1";

  headerText: any;
  headers: Headers = new Headers();

  currentFriendList: any = [];
  friendRequest: any = 'assets/Friends/Icons/friendRequests.svg';

  moodData: any;
  errormsg: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }

  ionViewDidEnter() {
    this.currentFriendList = [];
    this.moodData = [];
    this.http.get(this.url + "/friends", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
       if (fri.friends.length == 0) {
        this.errormsg = "You have no friends"
        return;
      }
      for (var i = 0; i < fri.friends.length; ++i) {
        var obj = fri.friends[i].user;
        if(fri.friends[i].user.mood.pleasance==2 && fri.friends[i].user.mood.activation==2){
          obj.icon = "assets/BoltSmilieys/transparent_mood1.svg"
        }else if(fri.friends[i].user.mood.pleasance==1 && fri.friends[i].user.mood.activation==2){
          obj.icon = "assets/BoltSmilieys/transparent_mood2.svg"
        }else if(fri.friends[i].user.mood.pleasance==0 && fri.friends[i].user.mood.activation==2){
          obj.icon = "assets/BoltSmilieys/transparent_mood3.svg"
        }else if(fri.friends[i].user.mood.pleasance==2 && fri.friends[i].user.mood.activation==1){
          obj.icon = "assets/BoltSmilieys/transparent_mood4.svg"
        }else if(fri.friends[i].user.mood.pleasance==1 && fri.friends[i].user.mood.activation==1){
          obj.icon = "assets/BoltSmilieys/transparent_mood5.svg"
        }else if(fri.friends[i].user.mood.pleasance==0 && fri.friends[i].user.mood.activation==1){
          obj.icon = "assets/BoltSmilieys/transparent_mood6.svg"
        }else if(fri.friends[i].user.mood.pleasance==2 && fri.friends[i].user.mood.activation==0){
          obj.icon = "assets/BoltSmilieys/transparent_mood7.svg"
        }else if(fri.friends[i].user.mood.pleasance==1 && fri.friends[i].user.mood.activation==0){
          obj.icon = "assets/BoltSmilieys/transparent_mood8.svg"
        }else if(fri.friends[i].user.mood.pleasance==0 && fri.friends[i].user.mood.activation==0){
          obj.icon = "assets/BoltSmilieys/transparent_mood9.svg"
        }else{
          obj.icon = "assets/BoltSmilieys/questionmark.svg"
        }
        this.currentFriendList.push(obj);

      }
    }
    );
  
    this.http.get(this.url + "/friends/requests", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.headerText = "Open Request";
        this.friendRequest = 'assets/Friends/Icons/openFriendRequest.svg';
      } else {
        this.headerText = "No Requests";
        this.friendRequest = 'assets/Friends/Icons/friendRequests.svg';
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

  mainPage(){
    this.navCtrl.push(MainPage);
  }

}
