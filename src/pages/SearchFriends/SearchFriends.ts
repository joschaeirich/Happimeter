import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';
import { Http } from '@angular/http';

import { FriendsPage } from '../Friends/Friends';

@Component({
  selector: 'page-SearchFriends',
  templateUrl: 'SearchFriends.html'
})
export class SearchFriendsPage {
  items: any = [];


  friendRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController,private api: GlobalVariables) {

  }


  initializeItems() {

  }

  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;

    if (val.length < 3) {
      return;
    }

this.api.searchFriend(ev.target.value).subscribe(fri => {
  
      this.items = [];

      for (var i = 0; i < fri.results.length; ++i) {
        this.items.push(fri.results[i].user);
      }

    });

  }

  presentConfirm(addUser) {
    let alert = this.alertCtrl.create({
      title: 'Send friend request',
      message: 'Do you want add this person?',
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
            this.api.postFriend(addUser.id).subscribe(fri => {
              this.navCtrl.push(FriendsPage);
            });
          }
        }
      ]
    });
    alert.present();
  }

}
