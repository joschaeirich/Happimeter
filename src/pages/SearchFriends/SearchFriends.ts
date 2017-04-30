import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-SearchFriends',
  templateUrl: 'SearchFriends.html'
})
export class SearchFriendsPage {
  items: any = [];
  url: any = "http://www.pascalbudner.de:8080/v1";
  headers: Headers = new Headers();
  friendRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public auth: Auth, private alertCtrl: AlertController) {
    this.headers.append("Authorization", "Bearer " + this.auth.token);

  }


  initializeItems() {

  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    var val = ev.target.value;



    console.log(ev);

    if (val.length < 3) {
      return;
    }

    this.http.get(this.url + "/friends/search/" + ev.target.value, { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {

      this.items = [];

      for (var i = 0; i < fri.results.length; ++i) {
        this.items.push(fri.results[i].user);
      }
      //console.log(this.items);
    });

    
    
    // if the value is an empty string don't filter the items
    
    
    
    
    // gibt noch einen Fehler



    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

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
            this.http.post(this.url + "/friends/" + addUser.id, null, { "headers": this.headers }).map(fri => fri.json()).subscribe(fri => {

            });
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    

  }

}
