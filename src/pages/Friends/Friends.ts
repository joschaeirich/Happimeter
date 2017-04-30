import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchFriendsPage } from '../SearchFriends/SearchFriends'
import { FriendRequestPage } from '../FriendRequest/FriendRequest'

import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-Friends',
  templateUrl: 'Friends.html'
})
export class FriendsPage {
  friendRequest: any;
  headerText: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) { }

  ionViewDidLoad() {

    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);


    this.http.get(url + "/friends/requests", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.headerText = "Open Request";
        this.friendRequest = 'assets/Friends/Icons/openFriendRequest.svg';
      } else {
        this.headerText = "No Requests";
        this.friendRequest = 'assets/Friends/Icons/friendRequests.svg';
      }
      console.log(this.headerText)
    });

  }
  SearchFriends() {
    this.navCtrl.push(SearchFriendsPage);
  }
  FriendRequest() {
    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

    this.http.get(url + "/friends/requests", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.navCtrl.push(FriendRequestPage);
      } else {
        return;
      }

    });

  }

}
