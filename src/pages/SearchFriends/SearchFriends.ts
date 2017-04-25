import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Searchfriends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-SearchFriends',
  templateUrl: 'SearchFriends.html'
})
export class SearchFriendsPage {
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }
  
  initializeItems() {

    this.items = [
      'Pascal',
      'Peter',
      'Joscha'
    ];
  }

   getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
     


    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
}

ionViewDidLoad() {

    console.log('ionViewDidLoad SearchFriendsPage');
    
  }

}
