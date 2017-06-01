import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import { Http } from '@angular/http';
import { GlobalVariables } from '../../providers/globalVariables'


@Component({
  selector: 'page-DeleteFriend',
  templateUrl: 'DeleteFriend.html'
})
export class DeleteFriendPage {

  currentFriendList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController,private api: GlobalVariables) {
  }



  ionViewDidLoad() {

    this.api.getFriendsList().subscribe(fri => {
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
            this.api.deleteFriend(addUser.id).subscribe(fri => {
                addUser.deleted = true;
            });
          }
        }
      ]
    });
    alert.present();
  }
}
