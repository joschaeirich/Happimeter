import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '../../providers/auth';


import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-FriendRequest',
  templateUrl: 'FriendRequest.html'
})
export class FriendRequestPage {
  friendRequest: any = [];
  headers: Headers = new Headers();
  url: any = "http://www.pascalbudner.de:8080/v1";

  decline: any = 'assets/confirm_notConfirm/cross.svg';
  text: any;
  confirm: any = 'assets/confirm_notConfirm/hacken.svg';


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);
  }

  changeToConfirm(addUser) {

    this.http.post(this.url + "/friends/" + addUser.id, null, { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {

    });
    this.decline = document.getElementById('decline').style.display = 'none';
    this.confirm = document.getElementById('confirm').style.display = 'none';
    this.text = document.getElementById('text').style.display = 'block';
    this.text = "Accepted";
  }



  changeToDecline() {
    this.decline = document.getElementById('decline').style.display = 'none';
    this.confirm = document.getElementById('confirm').style.display = 'none';
    this.text = document.getElementById('text').style.display = 'block';
    this.text = "Declined";
  }



  ionViewDidLoad() {
    this.text = document.getElementById('text').style.display = 'none';
    
    // Push friend request 
    this.friendRequest = [];
    this.http.get(this.url + "/friends/requests", { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
      for (var i = 0; i < fri.friend_requests.length; ++i) {
        this.friendRequest.push(fri.friend_requests[i].user.name);
      }
      //console.log(this.friendRequest)
    });

  }

}
