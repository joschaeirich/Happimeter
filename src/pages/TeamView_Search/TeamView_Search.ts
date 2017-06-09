import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalVariables } from '../../providers/globalVariables';
import { TeamViewPage } from '../TeamView/TeamView';

@Component({
  selector: 'page-TeamView_Search',
  templateUrl: 'TeamView_Search.html'
})
export class TeamView_SearchPage {
  items: any = [];
  groupItem: any;
  page: any = "search";
  card: any = ""
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: GlobalVariables, private alertCtrl: AlertController) { }


  initializeItems() {

  }


  getItems(ev) {
    this.initializeItems();
    var val = ev.target.value;

    if (val.length < 3) {
      return;
    }

    this.api.searchTeam(ev.target.value).subscribe(tea => {


      this.items = [];

      for (var i = 0; i < tea.teams.length; i++) {
        this.items.push(tea.teams[i]);
      }
    });

  }

  presentConfirm(addGroup) {
    this.groupItem = addGroup;
    this.page = ""
    this.card = "active"
  }

  joinTeam(password) {

    this.api.joinTeam(this.groupItem.id, password).subscribe(tea => {

      if (tea.status == 500) {
        this.showAlert()
      } else {
        this.navCtrl.push(TeamViewPage);
      }
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wrong password',

      buttons: ['OK']
    });
    alert.present();
  }

}
