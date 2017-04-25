import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Tree1Page} from '../Tree1/Tree1';
import { Tree2Page} from '../Tree2/Tree2';
import { Tree3Page} from '../Tree3/Tree3';
import { Tree4Page} from '../Tree4/Tree4';
import { MoodPage} from '../Mood/Mood';

var counter : number = 0;
function count () {
  if (counter == 3){
    counter = -1;
  }

  counter++;
  localStorage.setItem("treeCounter", counter.toString());
}

@Component({
  selector: 'page-MoodInput',
  templateUrl: 'MoodInput.html'
})
export class MoodInputPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var raw_counter = localStorage.getItem("treeCounter");
    if(raw_counter == null || raw_counter == "NaN"){
      counter = 0;
    } else {
      counter = Number.parseInt(raw_counter);
    }
  }
     

    TreePage(){
      
      switch(counter){
        case 0:
        this.navCtrl.push(Tree1Page);
        break;

        case 1:
        this.navCtrl.push(Tree2Page);
        break;

        case 2:
        this.navCtrl.push(Tree3Page);
        break;

        case 3:
        this.navCtrl.push(Tree4Page);
        break;


      }

      count();
  }

  backButton(){
     this.navCtrl.push(MoodPage);}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MoodInputPage');
  }


}
