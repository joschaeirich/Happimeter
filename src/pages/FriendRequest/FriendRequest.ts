import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables'


import { Http,  } from '@angular/http';

@Component({
  selector: 'page-FriendRequest',
  templateUrl: 'FriendRequest.html'
})
export class FriendRequestPage {
  friendRequest: any = [];


  decline: any = 'assets/confirm_notConfirm/cross.svg';
  text: any;
  confirm: any = 'assets/confirm_notConfirm/hacken.svg';


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController,private api: GlobalVariables) {
  }

  changeToConfirm(addUser) {
    this.api.addFriend(addUser.id).subscribe(fri => {

    });
    addUser.accepted = true;
    this.text = "Accepted";
  }

  changeToDecline(addUser) {
    this.api.deleteFriend(addUser.id).subscribe(fri => {

    });
    addUser.accepted = true;
    this.text = "Declined";
  }



  ionViewDidLoad() {
console.log(this.friendRequest)
    // Push friend request 
    this.friendRequest = [];
    this.api.getFriendRequest().subscribe(fri => {
      for (var i = 0; i < fri.friend_requests.length; ++i) {
        var user = fri.friend_requests[i].user;
        user.accepted = false;
        this.friendRequest.push(user);
      }
      //console.log(this.friendRequest)
    });

  }

}
