import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-DeleteFriend',
  templateUrl: 'DeleteFriend.html'
})
export class DeleteFriendPage {

  url = "http://www.pascalbudner.de:8080/v1";

  headers: Headers = new Headers();
  currentFriendList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController) {
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

  deleteFriend(addUser) {
    let alert = this.alertCtrl.create({
      title: 'Delete Friend',
      message: 'Do you want delete this contact?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
            this.http.delete(this.url + "/friends/" + addUser.id, { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {
                addUser.deleted = true;
            });
          }
        }
      ]
    });
    alert.present();
  }
}
