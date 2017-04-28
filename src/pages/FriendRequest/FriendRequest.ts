import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';


import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-FriendRequest',
  templateUrl: 'FriendRequest.html'
})
export class FriendRequestPage {
friendRequest: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth) {}

  ionViewDidLoad() {
     var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);


    this.http.get(url + "/friends/requests", { "headers": headers }).map(fri => fri.json()).subscribe(fri => {
      if (fri.friend_requests.length > 0) {
        this.friendRequest = 'assets/MenuIcons/AddFriendsIconOpenRequest.svg';
      }else{
        this.friendRequest = 'assets/MenuIcons/AddFriendsIcon.svg';
      }

    });  
  }

}
